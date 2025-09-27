from fastapi import APIRouter, Depends
from utils import get_current_user
from database import db

router = APIRouter(prefix="/mobile", tags=["Mobile"])

@router.get("/categories")
async def get_issue_categories():
    categories = [
        {"id": "infrastructure", "name": "Infrastructure", "icon": "🏗️"},
        {"id": "utilities", "name": "Utilities", "icon": "⚡"},
        {"id": "transportation", "name": "Transportation", "icon": "🚌"},
        {"id": "health", "name": "Health & Sanitation", "icon": "🏥"},
        {"id": "education", "name": "Education", "icon": "🎓"},
        {"id": "environment", "name": "Environment", "icon": "🌱"},
        {"id": "safety", "name": "Public Safety", "icon": "👮"},
        {"id": "other", "name": "Other", "icon": "📝"}
    ]
    return categories

@router.get("/nearby-issues")
async def get_nearby_issues(
    lat: float,
    lng: float,
    radius: float = 10.0,
    current_user: dict = Depends(get_current_user)
):
    issues = await db.issues.find({
        "location": {"$exists": True},
        "status": {"$in": ["open", "in_progress"]}
    }).limit(50).to_list(50)
    
    return [{"id": str(issue["_id"]), **{k: v for k, v in issue.items() if k != "_id"}} for issue in issues]