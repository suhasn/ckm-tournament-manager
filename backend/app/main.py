"""FastAPI application main entry point."""

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse

from app.config import settings
from app.db.database import connect_db, disconnect_db
from app.api.v1 import api_router


# Create FastAPI app
app = FastAPI(
    title=settings.APP_NAME,
    version=settings.APP_VERSION,
    description="Chess Tournament Management System using Swiss Rules",
    docs_url="/docs",
    redoc_url="/redoc",
)

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.BACKEND_CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Event handlers
@app.on_event("startup")
async def startup_event():
    """Startup event handler."""
    await connect_db()
    print("Application startup complete")


@app.on_event("shutdown")
async def shutdown_event():
    """Shutdown event handler."""
    await disconnect_db()
    print("Application shutdown complete")


# Include routers
app.include_router(
    api_router,
    prefix=settings.API_V1_STR,
)


# Health check endpoint
@app.get("/health")
async def health_check():
    """Health check endpoint."""
    return JSONResponse({"status": "ok"})


# Root endpoint
@app.get("/")
async def root():
    """Root endpoint."""
    return {
        "message": "CK Mysuru Tournament Manager API",
        "version": settings.APP_VERSION,
        "docs": "/docs",
    }


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(
        "app.main:app",
        host=settings.BACKEND_HOST if hasattr(settings, 'BACKEND_HOST') else "0.0.0.0",
        port=settings.BACKEND_PORT if hasattr(settings, 'BACKEND_PORT') else 8000,
        reload=settings.DEBUG,
    )
