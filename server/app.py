from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List
from pathlib import Path
import json
import uvicorn
from database import SAMPLE_CLASSES

app = FastAPI(title="Community API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

BASE_DIR = Path(__file__).resolve().parent
CLASSES_FILE = BASE_DIR / "classes_db.json"
USERS_FILE = BASE_DIR / "users_db.json"

def load_classes():
    if CLASSES_FILE.exists():
        try:
            with open(CLASSES_FILE, "r", encoding="utf-8") as f:
                return json.load(f)
        except Exception:
            return SAMPLE_CLASSES.copy()
    return SAMPLE_CLASSES.copy()

def save_classes(classes):
    with open(CLASSES_FILE, "w", encoding="utf-8") as f:
        json.dump(classes, f, indent=2)

def load_users():
    if USERS_FILE.exists():
        try:
            with open(USERS_FILE, "r", encoding="utf-8") as f:
                return json.load(f)
        except Exception:
            return {"users": {}}
    return {"users": {}}

def save_users(data):
    with open(USERS_FILE, "w", encoding="utf-8") as f:
        json.dump(data, f, indent=2)

class CreateClassRequest(BaseModel):
    title: str
    description: str
    price: float
    date: str
    time: str
    capacity: int
    location: str
    tags: List[str]
    host: str = "Community Partner"
    category: str = "General"
    photos: List[str] = []

class UserRequest(BaseModel):
    userId: str
    name: str
    email: str
    interests: List[str] = []

class RecommendationRequest(BaseModel):
    userId: str

@app.get("/health")
async def health():
    return {"status": "healthy"}

@app.get("/api/classes")
async def get_classes():
    classes = load_classes()
    return {"status": "success", "data": classes}

@app.get("/api/classes/{class_id}")
async def get_class_by_id(class_id: int):
    classes = load_classes()
    class_item = next((item for item in classes if item["id"] == class_id), None)

    if not class_item:
        raise HTTPException(status_code=404, detail="Class not found")

    return {"status": "success", "data": class_item}

@app.post("/api/classes")
async def create_class(request: CreateClassRequest):
    classes = load_classes()

    next_id = max([item["id"] for item in classes], default=0) + 1

    new_class = {
        "id": next_id,
        "title": request.title,
        "description": request.description,
        "price": request.price,
        "date": request.date,
        "time": request.time,
        "capacity": request.capacity,
        "location": request.location,
        "tags": request.tags,
        "host": request.host,
        "category": request.category,
        "photos": request.photos,
    }

    classes.append(new_class)
    save_classes(classes)

    return {
        "status": "success",
        "message": "Class created successfully",
        "data": new_class
    }

@app.get("/api/users")
async def list_users():
    db = load_users()
    return {"status": "success", "data": list(db["users"].values())}

@app.post("/api/users")
async def save_user(request: UserRequest):
    db = load_users()
    db["users"][request.userId] = {
        "userId": request.userId,
        "name": request.name,
        "email": request.email,
        "interests": request.interests
    }
    save_users(db)
    return {"status": "success", "message": "User saved", "data": db["users"][request.userId]}

@app.get("/api/users/{user_id}")
async def get_user(user_id: str):
    db = load_users()
    user = db["users"].get(user_id)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return {"status": "success", "data": user}

@app.delete("/api/users/{user_id}")
async def delete_user(user_id: str):
    db = load_users()
    if user_id not in db["users"]:
        raise HTTPException(status_code=404, detail="User not found")
    del db["users"][user_id]
    save_users(db)
    return {"status": "success", "message": "User deleted"}

@app.post("/api/recommendations")
async def get_recommendations(request: RecommendationRequest):
    db = load_users()
    user = db["users"].get(request.userId)

    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    user_interests = [x.lower() for x in user.get("interests", [])]

    classes = load_classes()
    scored = []

    for item in classes:
        score = 0
        tags = [t.lower() for t in item.get("tags", [])]
        category = item.get("category", "").lower()
        title = item.get("title", "").lower()

        for interest in user_interests:
            if interest in tags or interest in category or interest in title:
                score += 1

        scored.append((score, item))

    scored.sort(key=lambda x: x[0], reverse=True)
    recommendations = [item for score, item in scored if score > 0]

    if not recommendations:
        recommendations = classes

    return {"status": "success", "data": recommendations}

if __name__ == "__main__":
    uvicorn.run("app:app", host="0.0.0.0", port=5001, reload=True)