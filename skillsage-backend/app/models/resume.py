from sqlalchemy import Column, Integer, String, Text
from app.database.db import Base

class Resume(Base):
    __tablename__ = "resumes"

    id = Column(Integer, primary_key=True, index=True)
    filename = Column(String)
    text = Column(Text)
    skills = Column(Text)  # Store as comma-separated list
