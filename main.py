from fastapi import FastAPI 
from dotenv import load_dotenv
from app.routes import chat 
import os 

load_dotenv()


app = FastAPI()
app_name = os.getenv("APP_NAME") 

app.include_router(chat.router, prefix="/chat")

@app.get("/")
def home():
    return {"message": f"{app_name} chal rahi hai!"}

