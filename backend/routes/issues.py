from fastapi import APIRouter, Depends, HTTPException, Query
from models import IssueCreate, IssueUpdate, IssueStatus, IssuePriority
from utils import get_current_user
from database import db
from datetime import datetime
from bson import ObjectId
from typing import Optional

router = APIRouter(prefix="/issues", tags=["Issues"])

@router.get("")
async def get_issues(
    skip: int = Query(0, ge=0),
    limit: int = Query(100, ge=1, le=100),
    status: Optional[IssueStatus] = None,
    category: Optional[str] = None,
    priority: Optional[IssuePriority] = None,
    district: Optional[str] = None,
    current_user: dict = Depends(get_current_user)
):
    filter_dict = {}
    if status:
        filter_dict["status"] = status
    if category:
        filter_dict["category"] = category
    if priority:
        filter_dict["priority"] = priority
    if district:
        filter_dict["district"] = district
    
    if current_user["role"] in ["citizen", "mobile_user"]:
        filter_dict["reported_by"] = str(current_user["_id"])
    
    issues = await db.issues.find(filter_dict).skip(skip).limit(limit).sort("created_at", -1).to_list(limit)
    return [{"id": str(issue["_id"]), **{k: v for k, v in issue.items() if k != "_id"}} for issue in issues]

@router.post("")
async def create_issue(
    issue: IssueCreate,
    current_user: dict = Depends(get_current_user)
):
    issue_dict = issue.dict()
    issue_dict["reported_by"] = str(current_user["_id"])
    issue_dict["reporter_name"] = current_user["full_name"]
    issue_dict["reporter_email"] = current_user.get("email")
    issue_dict["created_at"] = datetime.utcnow()
    issue_dict["updated_at"] = datetime.utcnow()
    
    result = await db.issues.insert_one(issue_dict)
    return {"message": "Issue reported successfully", "issue_id": str(result.inserted_id)}

@router.put("/{issue_id}")
async def update_issue(
    issue_id: str,
    issue_update: IssueUpdate,
    current_user: dict = Depends(get_current_user)
):
    if current_user["role"] not in ["admin", "department_head", "officer"]:
        raise HTTPException(status_code=403, detail="Insufficient permissions")
    
    update_dict = {k: v for k, v in issue_update.dict().items() if v is not None}
    update_dict["updated_at"] = datetime.utcnow()
    
    if issue_update.status == IssueStatus.resolved:
        update_dict["resolved_at"] = datetime.utcnow()
    
    result = await db.issues.update_one(
        {"_id": ObjectId(issue_id)},
        {"$set": update_dict}
    )
    
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Issue not found")
    
    return {"message": "Issue updated successfully"}