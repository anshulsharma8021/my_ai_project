# app/routes/auth.py
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.db.database import get_db
from app.models.user import User
from app.schemas.user import UserRegister, UserLogin, TokenResponse, UserResponse, LanguagePreferenceRequest
from app.services.auth_service import hash_password, verify_password, create_token
from auth import get_current_user

router = APIRouter()

@router.post("/register", response_model=TokenResponse)
def register(data: UserRegister, db: Session = Depends(get_db)):
    existing = db.query(User).filter(User.email == data.email).first()
    if existing:
        raise HTTPException(status_code=400, detail="Email already registered")
    user = User(email=data.email, hashed_password=hash_password(data.password), name=data.name)
    db.add(user)
    db.commit()
    token = create_token({"sub": str(user.id)})
    return {"access_token": token, "user": user}

@router.post("/login", response_model=TokenResponse)
def login(data: UserLogin, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.email == data.email).first()
    if not user or not verify_password(data.password, user.hashed_password):
        raise HTTPException(status_code=401, detail="Wrong email or password")
    token = create_token({"sub": str(user.id)})
    return {"access_token": token, "user": user}

@router.get("/me", response_model=UserResponse)
def get_current_user_info(db: Session = Depends(get_db), user_id: str = Depends(get_current_user)):
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return user

@router.put("/language", response_model=UserResponse)
def update_language_preference(body: LanguagePreferenceRequest, db: Session = Depends(get_db), user_id: str = Depends(get_current_user)):
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    user.language_preference = body.language
    db.commit()
    db.refresh(user)
    return user