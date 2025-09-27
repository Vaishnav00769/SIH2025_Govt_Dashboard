from motor.motor_asyncio import AsyncIOMotorClient
import os

MONGODB_URL = os.environ.get('MONGODB_URL', 'mongodb://localhost:27017')
DATABASE_NAME = os.environ.get('DATABASE_NAME', 'govt_dashboard')

client = AsyncIOMotorClient(MONGODB_URL)
db = client[DATABASE_NAME]

def get_database():
    return db