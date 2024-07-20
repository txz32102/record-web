from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.views import file_view, record_view

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
app.include_router(file_view.router)
app.include_router(record_view.router)
