from fastapi import APIRouter, Depends, HTTPException, status
from models import UserCreate, UserLogin, UserResponse
from utils import hash_password, create_access_token, get_current_user
from database import db
from datetime import datetime

router = APIRouter(prefix="/auth", tags=["Authentication"])

@router.post("/register")
async def register(user: UserCreate):
    existing_user = await db.users.find_one({"email": user.email})
    if existing_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    
    password_hash = hash_password(user.password)
    user_dict = user.dict()
    user_dict.pop("password")
    user_dict["password_hash"] = password_hash
    user_dict["created_at"] = datetime.utcnow()
    user_dict["updated_at"] = datetime.utcnow()
    
    result = await db.users.insert_one(user_dict)
    
    return {"message": "User registered successfully", "user_id": str(result.inserted_id)}

@router.post("/login")
async def login(user_credentials: UserLogin):
    user = await db.users.find_one({"email": user_credentials.email})
    
    if not user or not hash_password(user_credentials.password) == user["password_hash"]:
        raise HTTPException(status_code=401, detail="Invalid email or password")
    
    if not user.get("is_active", True):
        raise HTTPException(status_code=401, detail="Account is inactive")
    
    access_token = create_access_token(data={"sub": user["email"]})
    
    return {
        "access_token": access_token,
        "token_type": "bearer",
        "user": UserResponse(**{
            "id": str(user["_id"]),
            "email": user["email"],
            "full_name": user["full_name"],
            "role": user["role"],
            "department": user.get("department"),
            "phone": user.get("phone"),
            "district": user.get("district"),
            "state": user.get("state"),
            "is_active": user.get("is_active"),
            "profile_image": user.get("profile_image"),
            "created_at": user["created_at"]
        })
    }

@router.get("/me")
async def get_current_user_info(current_user: dict = Depends(get_current_user)):
    return UserResponse(**{
        "id": str(current_user["_id"]),
        "email": current_user["email"],
        "full_name": current_user["full_name"],
        "role": current_user["role"],
        "department": current_user.get("department"),
        "phone": current_user.get("phone"),
        "district": current_user.get("district"),
        "state": current_user.get("state"),
        "is_active": current_user.get("is_active"),
        "profile_image": current_user.get("profile_image"),
        "created_at": current_user["created_at"]
    })