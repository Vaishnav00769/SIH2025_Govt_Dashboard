from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
from pathlib import Path
import os
import logging
from routes import auth, dashboard, departments, projects, issues, services, mobile, analytics,files, health  

from database import client  

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / ".env")

app = FastAPI(
    title="Government Dashboard API",
    description="Backend API for SIH2025 Government Dashboard - Web & Mobile",
    version="1.0.0"
)

app.include_router(auth.router)
app.include_router(dashboard.router)
app.include_router(departments.router)
app.include_router(projects.router)
app.include_router(issues.router)
app.include_router(services.router)
app.include_router(mobile.router)
app.include_router(analytics.router)
app.include_router(files.router)
app.include_router(health.router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get("CORS_ORIGINS", "*").split(","),
    allow_methods=["*"],
    allow_headers=["*"],
)

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s - %(name)s - %(levelname)s - %(message)s"
)
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
