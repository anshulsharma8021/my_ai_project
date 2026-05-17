from fastapi import APIRouter
from app.ai_service import get_ai_reply

router = APIRouter()

@router.post("/")
def chat(message: str):
    reply = get_ai_reply(message)
    return {
        "you_said": message,
        "ai_reply": reply
    }