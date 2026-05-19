# main.py
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.db.database import Base, engine, SessionLocal
from app.routes import chat, auth
from app.utils.seed_demo import seed_demo_user
from config import APP_NAME

Base.metadata.create_all(bind=engine)

# Create demo user on startup
try:
    db = SessionLocal()
    seed_demo_user(db)
    db.close()
except Exception as e:
    print(f"⚠️ Error creating demo user: {e}")

app = FastAPI(title=APP_NAME)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://localhost:5173",
        "http://127.0.0.1:3000",
        "http://127.0.0.1:5173",
        "http://192.168.0.100:3000",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
app.include_router(auth.router, prefix="/auth", tags=["Auth"])
app.include_router(chat.router, prefix="/chat", tags=["Chat"])

@app.get("/")
def home():
    return {"message": f"{APP_NAME} chal rahi hai!"}