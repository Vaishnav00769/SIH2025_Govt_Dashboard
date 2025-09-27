from fastapi import APIRouter, Depends, HTTPException, Query
from models import ServiceCreate
from utils import get_current_user
from database import db
from datetime import datetime
from bson import ObjectId
from typing import Optional

router = APIRouter(prefix="/services", tags=["Services"])

@router.get("")
async def get_services(
    skip: int = Query(0, ge=0),
    limit: int = Query(100, ge=1, le=100),
    category: Optional[str] = None,
    department_id: Optional[str] = None,
    current_user: dict = Depends(get_current_user)
):
    filter_dict = {"status": "active"}
    if category:
        filter_dict["category"] = category
    if department_id:
        filter_dict["department_id"] = department_id
    
    services = await db.services.find(filter_dict).skip(skip).limit(limit).to_list(limit)
    return [{"id": str(svc["_id"]), **{k: v for k, v in svc.items() if k != "_id"}} for svc in services]

@router.post("")
async def create_service(
    service: ServiceCreate,
    current_user: dict = Depends(get_current_user)
):
    if current_user["role"] not in ["admin", "department_head"]:
        raise HTTPException(status_code=403, detail="Insufficient permissions")
    
    department = await db.departments.find_one({"_id": ObjectId(service.department_id)})
    if not department:
        raise HTTPException(status_code=404, detail="Department not found")
    
    service_dict = service.dict()
    service_dict["department_name"] = department["name"]
    service_dict["created_at"] = datetime.utcnow()
    service_dict["updated_at"] = datetime.utcnow()
    
    result = await db.services.insert_one(service_dict)
    return {"message": "Service created successfully", "service_id": str(result.inserted_id)}