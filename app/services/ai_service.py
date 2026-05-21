# app/services/ai_service.py
from groq import Groq
from config import GROQ_API_KEY

client = Groq(api_key=GROQ_API_KEY)

def get_ai_reply(messages: list, language: str = "english", username: str = None) -> str:
    # System prompt based on language
    if language.lower() == "hindi":
        system_content = "Tum ek helpful AI assistant ho. Hindi mein jawab do."
    else:
        system_content = "You are a helpful AI assistant. Reply in English."
    
    # Add greeting with username if provided
    if username:
        system_content += f" User ka naam {username} hai. Jab naya conversation ho to welcome greeting do."
    
    system = {"role": "system", "content": system_content}
    response = client.chat.completions.create(
        model="llama-3.3-70b-versatile",
        messages=[system] + messages
    )
    return response.choices[0].message.content