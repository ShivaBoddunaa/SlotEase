from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import sqlite_patch
import mysql.connector
import os
from dotenv import load_dotenv
from routes import router

load_dotenv()

app = FastAPI(
    title="SlotEase API",
    description="Full Slot Booking System with CRUD",
    version="1.0.0",
    docs_url="/docs",
    redoc_url="/redoc"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(router)

@app.on_event("startup")
def startup_event():
    try:
        conn = mysql.connector.connect(
            host=os.getenv("DB_HOST", "localhost"),
            user=os.getenv("DB_USER", "root"),
            password=os.getenv("DB_PASSWORD", "")
        )
        cursor = conn.cursor()
        cursor.execute("CREATE DATABASE IF NOT EXISTS slotease_db")
        conn.commit()
        conn.close()

        conn = mysql.connector.connect(
            host=os.getenv("DB_HOST", "localhost"),
            user=os.getenv("DB_USER", "root"),
            password=os.getenv("DB_PASSWORD", ""),
            database=os.getenv("DB_NAME", "slotease_db")
        )
        cursor = conn.cursor()
        cursor.execute("""
            CREATE TABLE IF NOT EXISTS slots (
                id INT AUTO_INCREMENT PRIMARY KEY,
                slot_time VARCHAR(50) NOT NULL,
                is_booked TINYINT(1) DEFAULT 0,
                booked_by VARCHAR(100) DEFAULT NULL,
                booked_at DATETIME DEFAULT NULL
            )
        """)
        cursor.execute("SELECT COUNT(*) as count FROM slots")
        count = cursor.fetchone()[0]
        
        if count == 0:
            slots = [
                "9:00 AM - 10:00 AM",
                "10:00 AM - 11:00 AM",
                "11:00 AM - 12:00 PM",
                "12:00 PM - 1:00 PM",
                "2:00 PM - 3:00 PM",
                "3:00 PM - 4:00 PM",
                "4:00 PM - 5:00 PM",
                "5:00 PM - 6:00 PM"
            ]
            for slot in slots:
                cursor.execute(
                    "INSERT INTO slots (slot_time) VALUES (%s)",
                    (slot,)
                )

        conn.commit()
        conn.close()
        print("Database ready")
    except Exception as e:
        print(f"Startup error: {e}")
        raise e

@app.get("/")
def get_root():
    return {
        "message": "SlotEase API is running!",
        "status": "ok",
        "docs": "Visit /docs for Swagger UI"
    }
