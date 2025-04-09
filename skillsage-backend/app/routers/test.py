from fastapi import APIRouter

router = APIRouter()

@router.get("/health")
async def health_check():
    return {"message": "API is up and running"}
