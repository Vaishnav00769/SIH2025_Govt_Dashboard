from fastapi import APIRouter, Depends, HTTPException, Query
from models import ProjectCreate, ProjectStatus
from utils import get_current_user
from database import db
from datetime import datetime
from bson import ObjectId
from typing import Optional

router = APIRouter(prefix="/projects", tags=["Projects"])

@router.get("")
async def get_projects(
    skip: int = Query(0, ge=0),
    limit: int = Query(100, ge=1, le=100),
    status: Optional[ProjectStatus] = None,
    department_id: Optional[str] = None,
    current_user: dict = Depends(get_current_user)
):
    filter_dict = {}
    if status:
        filter_dict["status"] = status
    if department_id:
        filter_dict["department_id"] = department_id
    
    projects = await db.projects.find(filter_dict).skip(skip).limit(limit).to_list(limit)
    return [{"id": str(proj["_id"]), **{k: v for k, v in proj.items() if k != "_id"}} for proj in projects]

@router.post("")
async def create_project(
    project: ProjectCreate,
    current_user: dict = Depends(get_current_user)
):
    if current_user["role"] not in ["admin", "department_head", "officer"]:
        raise HTTPException(status_code=403, detail="Insufficient permissions")
    
    department = await db.departments.find_one({"_id": ObjectId(project.department_id)})
    if not department:
        raise HTTPException(status_code=404, detail="Department not found")
    
    project_dict = project.dict()
    project_dict["department_name"] = department["name"]
    project_dict["created_by"] = str(current_user["_id"])
    project_dict["created_at"] = datetime.utcnow()
    project_dict["updated_at"] = datetime.utcnow()
    
    result = await db.projects.insert_one(project_dict)
    return {"message": "Project created successfully", "project_id": str(result.inserted_id)}