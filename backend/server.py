from fastapi import FastAPI, HTTPException
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import os
import markdown

app = FastAPI()

# Directory containing Markdown files
MD_DIR = "md"

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class FileResponse(BaseModel):
    content: str

@app.get("/files", response_model=dict)
def list_files():
    try:
        files = [f for f in os.listdir(MD_DIR)]
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

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=9001)