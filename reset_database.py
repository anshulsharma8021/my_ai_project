#!/usr/bin/env python
"""
Database Migration Script
This script will drop existing tables and recreate them with the new schema.
Run this once to fix the 500 error when registering users.
"""

import os
import sys
from sqlalchemy import text
from app.db.database import engine, Base
from app.models.user import User
from app.models.chat import Conversation, Message
from app.utils.seed_demo import seed_demo_user
from app.db.database import SessionLocal

def drop_all_tables():
    """Drop all existing tables"""
    print("🔄 Dropping existing tables...")
    Base.metadata.drop_all(bind=engine)
    print("✅ Tables dropped successfully")

def create_all_tables():
    """Create all tables with new schema"""
    print("🔄 Creating tables with new schema...")
    Base.metadata.create_all(bind=engine)
    print("✅ Tables created successfully")

def seed_database():
    """Seed demo data"""
    print("🔄 Seeding demo user...")
    try:
        db = SessionLocal()
        seed_demo_user(db)
        db.close()
        print("✅ Demo user created")
    except Exception as e:
        print(f"⚠️ Error seeding demo user: {e}")

def main():
    print("=" * 60)
    print("DATABASE MIGRATION SCRIPT")
    print("=" * 60)
    
    print("\n⚠️  WARNING: This will drop all existing tables and data!")
    print("Make sure you have a backup if you have important data.\n")
    
    response = input("Continue? (yes/no): ").strip().lower()
    
    if response != "yes":
        print("❌ Migration cancelled")
        return
    
    try:
        drop_all_tables()
        create_all_tables()
        seed_database()
        
        print("\n" + "=" * 60)
        print("✅ DATABASE MIGRATION COMPLETED SUCCESSFULLY!")
        print("=" * 60)
        print("\nYou can now:")
        print("1. Restart your backend server")
        print("2. Try registering a user again")
        print("\nDemo credentials:")
        print("- Email: demo@example.com")
        print("- Password: demo123")
        
    except Exception as e:
        print(f"\n❌ ERROR: {e}")
        sys.exit(1)

if __name__ == "__main__":
    # Add the project root to path
    project_root = os.path.dirname(os.path.abspath(__file__))
    sys.path.insert(0, project_root)
    
    main()
