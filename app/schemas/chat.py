# app/schemas/chat.py
from pydantic import BaseModel
from typing import Optional

class ChatRequest(BaseModel):
    message: str
    conversation_id: Optional[str] = None
    language: str = "english"

class ChatResponse(BaseModel):
    conversation_id: str
    reply: str

class ConversationResponse(BaseModel):
    id: str
    title: str
    language_preference: str
    created_at: str
    
    class Config:
        from_attributes = True