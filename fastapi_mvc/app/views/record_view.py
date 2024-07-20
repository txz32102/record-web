# record_view.py
from fastapi import APIRouter
from app.controllers.record_controller import create_record, get_last_ten_records
from pydantic import BaseModel

router = APIRouter()

class RecordInput(BaseModel):
    data: str

@router.post("/records")
def add_record(record: RecordInput):
    result = create_record(record.data)
    return result

@router.get("/records")
def fetch_records():
    records = get_last_ten_records()
    return records
