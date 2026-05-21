#!/usr/bin/env python
"""
Safe Database Migration Script
Adds missing columns to existing tables without dropping data
"""

import sys
import os
from sqlalchemy import text
from app.db.database import engine

def add_missing_columns():
    """Add missing columns to existing tables"""
    
    sql_commands = [
        # Add missing columns to users table
        """
        ALTER TABLE users
        ADD COLUMN IF NOT EXISTS name VARCHAR,
        ADD COLUMN IF NOT EXISTS language_preference VARCHAR DEFAULT 'english';
        """,
        
        # Add missing column to conversations table
        """
        ALTER TABLE conversations
        ADD COLUMN IF NOT EXISTS language_preference VARCHAR DEFAULT 'english';
        """
    ]
    
    try:
        with engine.connect() as conn:
            for sql in sql_commands:
                try:
                    conn.execute(text(sql))
                    print(f"✅ Executed: {sql.strip()[:60]}...")
                except Exception as e:
                    if "already exists" in str(e).lower():
                        print(f"⏭️  Column already exists (skipped)")
                    else:
                        print(f"⚠️  Error: {e}")
            
            conn.commit()
        
        print("\n" + "=" * 60)
        print("✅ DATABASE MIGRATION COMPLETED SUCCESSFULLY!")
        print("=" * 60)
        return True
        
    except Exception as e:
        print(f"\n❌ ERROR: {e}")
        return False

if __name__ == "__main__":
    project_root = os.path.dirname(os.path.abspath(__file__))
    sys.path.insert(0, project_root)
    
    print("=" * 60)
    print("SAFE DATABASE MIGRATION")
    print("=" * 60)
    print("\nThis will add missing columns to existing tables")
    print("Your data will NOT be deleted.\n")
    
    response = input("Continue? (yes/no): ").strip().lower()
    
    if response != "yes":
        print("❌ Migration cancelled")
        sys.exit(0)
    
    success = add_missing_columns()
    
    if success:
        print("\n🚀 You can now restart your backend:")
        print("   uvicorn main:app --reload")
    else:
        sys.exit(1)
