from fastapi import FastAPI, HTTPException
from fastapi.cors import CORSMiddleware
from pydantic import BaseModel
import os
from dotenv import load_dotenv
import uvicorn

# Load environment variables
load_dotenv()

# Initialize FastAPI app
app = FastAPI(
    title="Community API",
    description="API for Community class booking platform",
    version="1.0.0"
)

# Enable CORS for all routes
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configuration
DEBUG = os.getenv('FLASK_DEBUG', True)
ENV = os.getenv('FLASK_ENV', 'development')


# Pydantic models for request bodies
class LoginRequest(BaseModel):
    email: str
    password: str


class SignupRequest(BaseModel):
    name: str
    email: str
    password: str


# Health check route
@app.get('/health')
async def health():
    """Health check endpoint"""
    return {'status': 'healthy', 'message': 'Server is running'}


# Default route
@app.get('/')
async def index():
    """Default route"""
    return {'message': 'Welcome to Community API'}


# Get all classes
@app.get('/api/classes')
async def get_classes():
    """Get all classes - placeholder endpoint"""
    return {
        'status': 'success',
        'message': 'Classes endpoint',
        'data': []
    }


# Login endpoint
@app.post('/api/login')
async def login(request: LoginRequest):
    """Login endpoint - placeholder"""
    if not request.email or not request.password:
        raise HTTPException(
            status_code=400,
            detail='Missing email or password'
        )
    
    # TODO: Add actual authentication logic
    return {
        'status': 'success',
        'message': 'Login endpoint',
        'user': {'email': request.email}
    }


# Signup endpoint
@app.post('/api/signup')
async def signup(request: SignupRequest):
    """Signup endpoint - placeholder"""
    if not request.email or not request.password or not request.name:
        raise HTTPException(
            status_code=400,
            detail='Missing required fields'
        )
    
    # TODO: Add actual user registration logic
    return {
        'status': 'success',
        'message': 'Signup endpoint',
        'user': {'email': request.email, 'name': request.name}
    }


# Error handler for undefined routes
@app.exception_handler(404)
async def not_found_handler(request, exc):
    """Handle 404 errors"""
    return {'status': 'error', 'message': 'Endpoint not found'}


if __name__ == '__main__':
    port = int(os.getenv('PORT', 5000))
    uvicorn.run(
        'app:app',
        host='0.0.0.0',
        port=port,
        reload=True if DEBUG else False
    )
