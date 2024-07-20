import os
from fastapi import HTTPException
from app.models.file_model import FileModel

class FileController:

    @staticmethod
    def list_files(folder_path: str, limit: int = 1000):
        if os.path.isfile(folder_path):
            raise HTTPException(status_code=400, detail="Path provided is a file, not a directory")
        if not os.path.isdir(folder_path):
            raise HTTPException(status_code=400, detail="Invalid folder path")
        
        items = os.listdir(folder_path)
        items = FileController.if_limited_file_numbers(items, limit)
        files_and_folders = [{"name": item, "type": "folder" if os.path.isdir(os.path.join(folder_path, item)) else "file"} for item in items]
        return files_and_folders

    @staticmethod
    def list_all_files_and_folders(folder_path: str, limit: int = 1000):
        if not os.path.isdir(folder_path):
            raise HTTPException(status_code=400, detail="Invalid folder path")
        
        all_files_and_folders = []
        for root, dirs, files in os.walk(folder_path):
            for name in files:
                all_files_and_folders.append({"name": os.path.join(root, name), "type": "file"})
                if len(all_files_and_folders) >= limit:
                    return FileController.if_limited_file_numbers(all_files_and_folders, limit)
            for name in dirs:
                all_files_and_folders.append({"name": os.path.join(root, name), "type": "folder"})
                if len(all_files_and_folders) >= limit:
                    return FileController.if_limited_file_numbers(all_files_and_folders, limit)
        
        return FileController.if_limited_file_numbers(all_files_and_folders, limit)

    @staticmethod
    def read_file(file_path: str):
        if not os.path.isfile(file_path):
            raise HTTPException(status_code=400, detail="File does not exist")
        with open(file_path, 'r') as file:
            content = file.read()
        views = FileModel.increment_view_count(file_path)
        return content, views

    @staticmethod
    def if_limited_file_numbers(items, limit: int):
        if len(items) > limit:
            return items[:limit]
        return items
