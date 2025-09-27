from fastapi import APIRouter, Depends, Query
from utils import get_current_user
from database import db
from datetime import datetime, timedelta

router = APIRouter(prefix="/analytics", tags=["Analytics"])

@router.get("/department-wise")
async def get_department_analytics(current_user: dict = Depends(get_current_user)):
    pipeline = [
        {
            "$lookup": {
                "from": "projects",
                "localField": "_id",
                "foreignField": "department_id",
                "as": "projects"
            }
        },
        {
            "$lookup": {
                "from": "issues",
                "localField": "name",
                "foreignField": "assigned_department",
                "as": "issues"
            }
        },
        {
            "$project": {
                "name": 1,
                "budget_allocated": 1,
                "budget_used": 1,
                "project_count": {"$size": "$projects"},
                "issue_count": {"$size": "$issues"},
                "resolved_issues": {
                    "$size": {
                        "$filter": {
                            "input": "$issues",
                            "cond": {"$eq": ["$$this.status", "resolved"]}
                        }
                    }
                }
            }
        }
    ]
    
    result = await db.departments.aggregate(pipeline).to_list(100)
    return result

@router.get("/timeline")
async def get_timeline_analytics(
    days: int = Query(30, ge=1, le=365),
    current_user: dict = Depends(get_current_user)
):
    from_date = datetime.utcnow() - timedelta(days=days)
    
    issues_pipeline = [
        {"$match": {"created_at": {"$gte": from_date}}},
        {
            "$group": {
                "_id": {"$dateToString": {"format": "%Y-%m-%d", "date": "$created_at"}},
                "count": {"$sum": 1}
            }
        },
        {"$sort": {"_id": 1}}
    ]
    
    issues_timeline = await db.issues.aggregate(issues_pipeline).to_list(days)
    
    projects_pipeline = [
        {"$match": {"created_at": {"$gte": from_date}}},
        {
            "$group": {
                "_id": {"$dateToString": {"format": "%Y-%m-%d", "date": "$created_at"}},
                "count": {"$sum": 1}
            }
        },
        {"$sort": {"_id": 1}}
    ]
    
    projects_timeline = await db.projects.aggregate(projects_pipeline).to_list(days)
    
    return {
        "issues": issues_timeline,
        "projects": projects_timeline
    }