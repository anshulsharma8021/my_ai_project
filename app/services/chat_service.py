# app/services/chat_service.py
from sqlalchemy.orm import Session
from app.models.chat import Message, Conversation
import uuid

def save_message(db: Session, conversation_id: str, role: str, content: str):
    message = Message(
        id=uuid.uuid4(),
        conversation_id=conversation_id,
        role=role,
        content=content
    )
    db.add(message)
    db.commit()
    return message

def get_history(db: Session, conversation_id: str):
    messages = db.query(Message).filter(
        Message.conversation_id == conversation_id
    ).order_by(Message.created_at).all()
    
    return [{"role": m.role, "content": m.content} for m in messages]