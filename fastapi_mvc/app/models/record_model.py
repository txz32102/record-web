# record_model.py
import os
from sqlalchemy import create_engine, Column, Integer, String
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

basedir = os.path.abspath(os.path.dirname(__file__))
DATABASE_URL = 'sqlite:///' + os.path.join(basedir, '../../record.db')

engine = create_engine(DATABASE_URL, connect_args={"check_same_thread": False})
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

class Record(Base):
    __tablename__ = 'record'
    id = Column(Integer, primary_key=True, index=True)
    data = Column(String, nullable=False)
    time = Column(String, nullable=False)

# Create tables
Base.metadata.create_all(bind=engine)
