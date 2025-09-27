from pydantic import BaseModel, EmailStr, Field, ConfigDict
from pydantic import GetJsonSchemaHandler
from pydantic.json_schema import JsonSchemaValue
from pydantic_core import core_schema
from typing import List, Optional, Dict, Any
from datetime import datetime, timezone
from enum import Enum
from bson import ObjectId

class PyObjectId(ObjectId):
    @classmethod
    def __get_pydantic_core_schema__(
        cls, source_type: Any, handler: Any
    ) -> core_schema.CoreSchema:
        return core_schema.json_or_python_schema(
            json_schema=core_schema.str_schema(),
            python_schema=core_schema.union_schema([
                core_schema.is_instance_schema(ObjectId),
                core_schema.chain_schema([
                    core_schema.str_schema(),
                    core_schema.no_info_plain_validator_function(cls.validate),
                ])
            ]),
            serialization=core_schema.plain_serializer_function_ser_schema(
                lambda x: str(x)
            ),
        )

    @classmethod
    def validate(cls, v):
        if not ObjectId.is_valid(v):
            raise ValueError("Invalid ObjectId")
        return ObjectId(v)

    @classmethod
    def __get_pydantic_json_schema__(
        cls, schema: core_schema.CoreSchema, handler: GetJsonSchemaHandler
    ) -> JsonSchemaValue:
        json_schema = handler(core_schema.str_schema())
        json_schema.update(type="string", format="objectid")
        return json_schema

class MongoBaseModel(BaseModel):
    model_config = ConfigDict(
        populate_by_name=True,
        arbitrary_types_allowed=True,
        json_encoders={ObjectId: str}
    )
    
    id: PyObjectId = Field(default_factory=PyObjectId, alias="_id")

class UserRole(str, Enum):
    admin = "admin"
    department_head = "department_head"
    officer = "officer"
    citizen = "citizen"
    mobile_user = "mobile_user"

class ProjectStatus(str, Enum):
    planned = "planned"
    in_progress = "in_progress"
    completed = "completed"
    on_hold = "on_hold"
    cancelled = "cancelled"

class IssueStatus(str, Enum):
    open = "open"
    in_progress = "in_progress"
    resolved = "resolved"
    closed = "closed"

class IssuePriority(str, Enum):
    low = "low"
    medium = "medium"
    high = "high"
    critical = "critical"

class UserCreate(BaseModel):
    email: EmailStr
    password: str
    full_name: str
    role: UserRole
    department: Optional[str] = None
    phone: Optional[str] = None
    district: Optional[str] = None
    state: Optional[str] = None

class UserLogin(BaseModel):
    email: EmailStr
    password: str

class User(MongoBaseModel):
    email: str
    password_hash: str
    full_name: str
    role: UserRole
    department: Optional[str] = None
    phone: Optional[str] = None
    district: Optional[str] = None
    state: Optional[str] = None
    is_active: bool = True
    profile_image: Optional[str] = None
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
    updated_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class UserResponse(BaseModel):
    id: str
    email: str
    full_name: str
    role: str
    department: Optional[str] = None
    phone: Optional[str] = None
    district: Optional[str] = None
    state: Optional[str] = None
    is_active: bool
    profile_image: Optional[str] = None
    created_at: datetime

class Department(MongoBaseModel):
    name: str
    description: Optional[str] = None
    head_user_id: Optional[str] = None
    head_name: Optional[str] = None
    budget_allocated: float = 0
    budget_used: float = 0
    contact_email: Optional[str] = None
    contact_phone: Optional[str] = None
    address: Optional[str] = None
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
    updated_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class DepartmentCreate(BaseModel):
    name: str
    description: Optional[str] = None
    head_user_id: Optional[str] = None
    budget_allocated: float = 0
    contact_email: Optional[str] = None
    contact_phone: Optional[str] = None
    address: Optional[str] = None

class Project(MongoBaseModel):
    title: str
    description: Optional[str] = None
    department_id: str
    department_name: Optional[str] = None
    budget_allocated: float
    budget_used: float = 0
    status: ProjectStatus
    progress_percentage: float = 0
    start_date: Optional[datetime] = None
    end_date: Optional[datetime] = None
    assigned_officers: List[str] = []
    milestones: List[Dict[str, Any]] = []
    documents: List[Dict[str, str]] = []
    created_by: str
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
    updated_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class ProjectCreate(BaseModel):
    title: str
    description: Optional[str] = None
    department_id: str
    budget_allocated: float
    status: ProjectStatus = ProjectStatus.planned
    start_date: Optional[datetime] = None
    end_date: Optional[datetime] = None
    assigned_officers: List[str] = []

class Issue(MongoBaseModel):
    title: str
    description: str
    category: str
    sub_category: Optional[str] = None
    status: IssueStatus = IssueStatus.open
    priority: IssuePriority = IssuePriority.medium
    location: Optional[Dict[str, float]] = None
    address: Optional[str] = None
    district: Optional[str] = None
    state: Optional[str] = None
    reported_by: str
    reporter_name: str
    reporter_email: Optional[str] = None
    reporter_phone: Optional[str] = None
    assigned_to: Optional[str] = None
    assigned_department: Optional[str] = None
    images: List[str] = []
    comments: List[Dict[str, Any]] = []
    resolution_details: Optional[str] = None
    resolved_at: Optional[datetime] = None
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
    updated_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class IssueCreate(BaseModel):
    title: str
    description: str
    category: str
    sub_category: Optional[str] = None
    priority: IssuePriority = IssuePriority.medium
    location: Optional[Dict[str, float]] = None
    address: Optional[str] = None
    district: Optional[str] = None
    state: Optional[str] = None
    reporter_phone: Optional[str] = None

class IssueUpdate(BaseModel):
    status: Optional[IssueStatus] = None
    priority: Optional[IssuePriority] = None
    assigned_to: Optional[str] = None
    assigned_department: Optional[str] = None
    resolution_details: Optional[str] = None

class Service(MongoBaseModel):
    service_name: str
    description: Optional[str] = None
    department_id: str
    department_name: Optional[str] = None
    category: str
    subcategory: Optional[str] = None
    status: str = "active"
    required_documents: List[str] = []
    processing_time: Optional[str] = None
    fees: Optional[float] = 0
    online_available: bool = True
    applications_count: int = 0
    success_rate: float = 0
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
    updated_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class ServiceCreate(BaseModel):
    service_name: str
    description: Optional[str] = None
    department_id: str
    category: str
    subcategory: Optional[str] = None
    required_documents: List[str] = []
    processing_time: Optional[str] = None
    fees: Optional[float] = 0
    online_available: bool = True

class AnalyticsMetric(MongoBaseModel):
    metric_name: str
    metric_value: float
    metric_type: str
    department_id: Optional[str] = None
    category: Optional[str] = None
    date_recorded: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
    metadata: Optional[Dict[str, Any]] = {}