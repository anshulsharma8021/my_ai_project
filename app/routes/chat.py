from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.db.database import get_db
from app.services.chat_service import save_message, get_history
from app.services.ai_service import get_ai_reply
from app.schemas.chat import ChatRequest, ChatResponse
from app.models.chat import Conversation
from auth import get_current_user
import uuid

router = APIRouter()

@router.post("/", response_model=ChatResponse)
def chat(request: ChatRequest, db: Session = Depends(get_db), user_id: str = Depends(get_current_user)):
    if request.conversation_id and request.conversation_id != "string":
        conv_id = request.conversation_id
    else:
        conv_id = str(uuid.uuid4())
        conv = Conversation(id=conv_id, user_id=user_id, title=request.message[:30])
        db.add(conv)
        db.commit()

    save_message(db, conv_id, "user", request.message)
    history = get_history(db, conv_id)
    ai_reply = get_ai_reply(history)
    save_message(db, conv_id, "assistant", ai_reply)

    return {"conversation_id": conv_id, "reply": ai_reply}
