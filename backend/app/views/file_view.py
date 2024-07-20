from fastapi import APIRouter, Query
from app.controllers.file_controller import FileController
from pydantic import BaseModel
from typing import List

router = APIRouter()

class Item(BaseModel):
    name: str
    type: str

class ItemList(BaseModel):
    items: List[Item]

@router.get("/file/list-files", response_model=ItemList)
def list_files(folder_path: str = Query(..., description="Path of the folder to list files from"), limit: int = Query(1000, description="Maximum number of files to list")):
    items = FileController.list_files(folder_path, limit)
    return {"items": items}

@router.get("/file/list-all-files-and-folders", response_model=ItemList)
def list_all_files_and_folders(folder_path: str = Query(..., description="Path of the folder to list all files and folders from"), limit: int = Query(1000, description="Maximum number of files and folders to list")):
    items = FileController.list_all_files_and_folders(folder_path, limit)
    return {"items": items}

@router.get("/file/read-file")
def read_file(file_path: str = Query(..., description="Path of the file to read")):
    content, views = FileController.read_file(file_path)
    return {"content": content, "views": views}

@router.get("/file/list-files-and-folders", response_model=ItemList)
def list_files_and_folders(folder_path: str = Query(..., description="Path of the folder to list files and folders from"), limit: int = Query(1000, description="Maximum number of files and folders to list")):
    items = FileController.list_files_and_folders(folder_path, limit)
    return {"items": items}