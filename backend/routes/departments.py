from fastapi import APIRouter, Depends, HTTPException, Query
from models import DepartmentCreate
from utils import get_current_user
from database import db
from datetime import datetime
from bson import ObjectId

router = APIRouter(prefix="/departments", tags=["Departments"])

@router.get("")
async def get_departments(
    skip: int = Query(0, ge=0),
    limit: int = Query(100, ge=1, le=100),
    current_user: dict = Depends(get_current_user)
):
    departments = await db.departments.find().skip(skip).limit(limit).to_list(limit)
    return [{"id": str(dept["_id"]), **{k: v for k, v in dept.items() if k != "_id"}} for dept in departments]

@router.post("")
async def create_department(
    department: DepartmentCreate,
    current_user: dict = Depends(get_current_user)
):
    if current_user["role"] not in ["admin", "department_head"]:
        raise HTTPException(status_code=403, detail="Insufficient permissions")
    
    department_dict = department.dict()
    department_dict["created_at"] = datetime.utcnow()
    department_dict["updated_at"] = datetime.utcnow()
    
    if department_dict.get("head_user_id"):
        head_user = await db.users.find_one({"_id": ObjectId(department_dict["head_user_id"])})
        if head_user:
            department_dict["head_name"] = head_user["full_name"]
    
    result = await db.departments.insert_one(department_dict)
    return {"message": "Department created successfully", "department_id": str(result.inserted_id)}