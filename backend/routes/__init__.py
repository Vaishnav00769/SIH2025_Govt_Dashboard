from .auth import router as auth_router
from .dashboard import router as dashboard_router
from .departments import router as departments_router
from .projects import router as projects_router
from .issues import router as issues_router
from .services import router as services_router
from .mobile import router as mobile_router
from .analytics import router as analytics_router
from .files import router as files_router
from .health import router as health_router

__all__ = [
    "auth_router",
    "dashboard_router",
    "departments_router",
    "projects_router",
    "issues_router",
    "services_router",
    "mobile_router",
    "analytics_router",
    "files_router",
    "health_router"
]