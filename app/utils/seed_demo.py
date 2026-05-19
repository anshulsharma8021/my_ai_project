# app/utils/seed_demo.py
from sqlalchemy.orm import Session
from app.models.user import User
from app.services.auth_service import hash_password

def seed_demo_user(db: Session):
    """Create demo user if it doesn't exist"""
    demo_email = "demo@example.com"
    demo_password = "demo123"
    
    # Check if demo user already exists
    existing_user = db.query(User).filter(User.email == demo_email).first()
    
    if not existing_user:
        # Create demo user
        demo_user = User(
            email=demo_email,
            hashed_password=hash_password(demo_password)
        )
        db.add(demo_user)
        db.commit()
        db.refresh(demo_user)
        print(f"✅ Demo user created: {demo_email} / {demo_password}")
    else:
        print(f"✅ Demo user already exists: {demo_email}")
