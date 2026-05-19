# app/services/ai_service.py
from groq import Groq
from config import GROQ_API_KEY

client = Groq(api_key=GROQ_API_KEY)

def get_ai_reply(messages: list) -> str:
    system = {"role": "system", "content": "Tum ek helpful AI assistant ho."}
    response = client.chat.completions.create(
        model="llama-3.3-70b-versatile",
        messages=[system] + messages
    )
    return response.choices[0].message.content