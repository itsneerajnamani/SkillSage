from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routers import test, resume_upload

app = FastAPI()

# ✅ CORS Middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # For development, allow all
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def root():
    return {"message": "Welcome to API"}

app.include_router(test.router)
app.include_router(resume_upload.router)
