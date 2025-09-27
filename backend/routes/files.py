from fastapi import APIRouter, Depends, HTTPException, UploadFile, File
from utils import get_current_user
from pathlib import Path
import uuid

router = APIRouter(prefix="/files", tags=["Files"])

@router.post("")
async def upload_file(
    file: UploadFile = File(...),
    current_user: dict = Depends(get_current_user)
):
    if file.size > 10 * 1024 * 1024:  # 10MB limit
        raise HTTPException(status_code=413, detail="File too large")
    
    upload_dir = Path("uploads")
    upload_dir.mkdir(exist_ok=True)
    
    file_extension = Path(file.filename).suffix
    unique_filename = f"{uuid.uuid4()}{file_extension}"
    file_path = upload_dir / unique_filename
    
    with open(file_path, "wb") as buffer:
        content = await file.read()
        buffer.write(content)
    
    file_url = f"/uploads/{unique_filename}"
    return {"file_url": file_url, "filename": unique_filename}