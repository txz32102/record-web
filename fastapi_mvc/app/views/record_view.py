# record_view.py
from fastapi import APIRouter
from app.controllers.record_controller import create_record, get_last_ten_records
from pydantic import BaseModel
from datetime import datetime

router = APIRouter()

class RecordInput(BaseModel):
    data: str

@router.post("/record/records")
def add_record(record: RecordInput):
    result = create_record(record.data)
    return result

@router.get("/record/records")
def fetch_records():
    records = get_last_ten_records()
    return records

@router.post("/record/server")
def add_record(record: RecordInput):
    current_time = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    data = f"{record.data}"
    result = create_record(data)
    return result
