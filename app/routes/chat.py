from fastapi import APIRouter, Depends, HTTPException, UploadFile, File
from sqlalchemy.orm import Session
from app.db.database import get_db
from app.services.chat_service import save_message, get_history
from app.services.ai_service import get_ai_reply
from app.schemas.chat import ChatRequest, ChatResponse
from app.models.conversation import Conversation  # ✅ FIXED - was: app.models.chat
from app.models.user import User
from auth import get_current_user
import uuid
import os

router = APIRouter()

@router.post("/", response_model=ChatResponse)
def chat(request: ChatRequest, db: Session = Depends(get_db), user_id: str = Depends(get_current_user)):
    user = db.query(User).filter(User.id == user_id).first()

    if request.conversation_id and request.conversation_id != "string":
        conv_id = request.conversation_id
        conv = db.query(Conversation).filter(Conversation.id == conv_id).first()
        if not conv:
            raise HTTPException(status_code=404, detail="Conversation not found")
    else:
        conv_id = str(uuid.uuid4())
        conv = Conversation(
            id=conv_id,
            user_id=user_id,
            title=request.message[:30],
            language_preference=request.language
        )
        db.add(conv)
        db.commit()

    save_message(db, conv_id, "user", request.message)
    history = get_history(db, conv_id)
    ai_reply = get_ai_reply(history, request.language, user.name if user else None)
    save_message(db, conv_id, "assistant", ai_reply)

    return {"conversation_id": conv_id, "reply": ai_reply}


@router.get("/conversations")
def get_conversations(db: Session = Depends(get_db), user_id: str = Depends(get_current_user)):
    conversations = (
        db.query(Conversation)
        .filter(Conversation.user_id == user_id)
        .order_by(Conversation.created_at.desc())
        .all()
    )
    return [
        {
            "id": str(c.id),
            "title": c.title,
            "language": c.language_preference,
            "created_at": c.created_at.isoformat(),
        }
        for c in conversations
    ]


@router.post("/upload")
async def upload_file(
    file: UploadFile = File(...),
    db: Session = Depends(get_db),
    user_id: str = Depends(get_current_user),
):
    upload_dir = "uploads"
    os.makedirs(upload_dir, exist_ok=True)

    file_path = os.path.join(upload_dir, f"{user_id}_{file.filename}")
    with open(file_path, "wb") as f:
        contents = await file.read()
        f.write(contents)

    return {"filename": file.filename, "path": file_path, "message": "File uploaded successfully"}