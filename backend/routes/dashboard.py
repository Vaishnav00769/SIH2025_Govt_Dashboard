from fastapi import APIRouter, Depends
from utils import get_current_user
from database import db

router = APIRouter(prefix="/dashboard-overview", tags=["Dashboard"])

@router.get("")
async def get_dashboard_overview(current_user: dict = Depends(get_current_user)):
    total_departments = await db.departments.count_documents({})
    total_projects = await db.projects.count_documents({})
    total_issues = await db.issues.count_documents({})
    total_services = await db.services.count_documents({})
    total_users = await db.users.count_documents({})
    
    open_issues = await db.issues.count_documents({"status": "open"})
    resolved_issues = await db.issues.count_documents({"status": "resolved"})
    
    active_projects = await db.projects.count_documents({"status": {"$in": ["planned", "in_progress"]}})
    completed_projects = await db.projects.count_documents({"status": "completed"})
    
    budget_pipeline = [
        {
            "$group": {
                "_id": None,
                "total_allocated": {"$sum": "$budget_allocated"},
                "total_used": {"$sum": "$budget_used"}
            }
        }
    ]
    budget_result = await db.projects.aggregate(budget_pipeline).to_list(1)
    budget_data = budget_result[0] if budget_result else {"total_allocated": 0, "total_used": 0}
    
    return {
        "totals": {
            "departments": total_departments,
            "projects": total_projects,
            "issues": total_issues,
            "services": total_services,
            "users": total_users
        },
        "issues": {
            "open": open_issues,
            "resolved": resolved_issues,
            "resolution_rate": (resolved_issues / (open_issues + resolved_issues) * 100) if (open_issues + resolved_issues) > 0 else 0
        },
        "projects": {
            "active": active_projects,
            "completed": completed_projects,
            "completion_rate": (completed_projects / total_projects * 100) if total_projects > 0 else 0
        },
        "budget": {
            "allocated": budget_data["total_allocated"],
            "used": budget_data["total_used"],
            "utilization_rate": (budget_data["total_used"] / budget_data["total_allocated"] * 100) if budget_data["total_allocated"] > 0 else 0
        }
    }