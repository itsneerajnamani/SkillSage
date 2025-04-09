from fastapi import APIRouter, File, UploadFile
import PyPDF2
import io

router = APIRouter()

@router.post("/upload-resume/")
async def upload_resume(file: UploadFile = File(...)):
    if not file.filename.endswith(".pdf"):
        return {"error": "Only PDF files are supported"}

    contents = await file.read()
    reader = PyPDF2.PdfReader(io.BytesIO(contents))

    full_text = ""
    for page in reader.pages:
        full_text += page.extract_text()

    return {"text": full_text[:10000]}  # Return a sample preview
