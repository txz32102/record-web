# record_controller.py
from sqlalchemy.orm import Session
from app.models.record_model import Record, SessionLocal
from datetime import datetime

def create_record(data: str) -> dict:
    try:
        current_time = datetime.now().strftime('%Y-%m-%d %H:%M:%S')
        new_record = Record(data=data, time=current_time)
        session = SessionLocal()
        session.add(new_record)
        session.commit()
        session.close()
        return {"success": True, "message": "Data and time stored successfully!"}
    except Exception as e:
        return {"success": False, "message": f"An error occurred: {str(e)}"}

def get_last_ten_records() -> list:
    try:
        session = SessionLocal()
        records = session.query(Record).order_by(Record.id.desc()).limit(10).all()
        session.close()
        records_list = [{"id": record.id, "data": record.data, "time": record.time} for record in records]
        return records_list
    except Exception as e:
        return {"success": False, "message": f"An error occurred: {str(e)}"}
