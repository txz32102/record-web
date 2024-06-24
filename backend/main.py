from fastapi import FastAPI, Request, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from sqlalchemy import create_engine, Column, Integer, String
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from pydantic import BaseModel
import os
from datetime import datetime
import markdown

app = FastAPI()

# CORS setup
origins = ["http://localhost:3000", "*"]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Database setup
basedir = os.path.abspath(os.path.dirname(__file__))
DATABASE_URL = 'sqlite:///' + os.path.join(basedir, 'data.sqlite')

engine = create_engine(DATABASE_URL, connect_args={"check_same_thread": False})
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

# Model definition
class Record(Base):
    __tablename__ = 'record'
    id = Column(Integer, primary_key=True, index=True)
    data = Column(String, nullable=False)
    time = Column(String, nullable=False)

# Create tables
Base.metadata.create_all(bind=engine)

# Directory containing Markdown files
MD_DIR = "md"

class FileResponse(BaseModel):
    content: str

@app.get("/files", response_model=dict)
def list_files():
    try:
        files = [f for f in os.listdir(MD_DIR) if f.endswith(".md")]
        return {"files": files}  # Return the list of files wrapped in a dictionary
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/files/{filename}", response_model=FileResponse)
def read_file(filename: str):
    file_path = os.path.join(MD_DIR, filename)
    if not os.path.exists(file_path):
        raise HTTPException(status_code=404, detail="File not found")

    try:
        with open(file_path, "r", encoding="utf-8") as file:
            content = file.read()
        html_content = markdown.markdown(content)
        return FileResponse(content=html_content)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/server")
async def handle_data(request: Request):
    try:
        data = await request.json()
        print(data)
        # Get the current server time in the specified format
        current_time = datetime.now().strftime('%Y-%m-%d %H:%M:%S')
        # Create a new record with the provided data and the current server time
        new_record = Record(data=data['data'], time=current_time)
        session = SessionLocal()
        session.add(new_record)
        session.commit()
        session.close()
        return {"success": True, "message": "Data and time stored successfully!"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"An error occurred: {str(e)}")

@app.get("/records")
async def get_records():
    try:
        session = SessionLocal()
        # Fetch the last ten records from the database, ordered by id in descending order
        records = session.query(Record).order_by(Record.id.desc()).limit(10).all()
        print(records)
        session.close()
        # Transform the records into a JSON-serializable format
        records_list = [{"id": record.id, "data": record.data, "time": record.time} for record in records]
        return records_list
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"An error occurred: {str(e)}")

if __name__ == '__main__':
    import uvicorn
    uvicorn.run(app, host='0.0.0.0', port=32102)
