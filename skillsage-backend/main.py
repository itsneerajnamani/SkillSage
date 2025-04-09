from fastapi import FastAPI
from app.routers import test, resume_upload

app = FastAPI()

@app.get("/")
async def root():
    return {"message": "Welcome to SkillSage API!"}

app.include_router(test.router)
app.include_router(resume_upload.router)