"""MongoDB database connection and session management."""

from typing import Optional
from motor.motor_asyncio import AsyncClient, AsyncDatabase
from app.config import settings


class Database:
    """MongoDB database manager."""
    
    client: Optional[AsyncClient] = None
    db: Optional[AsyncDatabase] = None


database = Database()


async def connect_db() -> None:
    """Connect to MongoDB."""
    database.client = AsyncClient(settings.MONGO_URL)
    database.db = database.client[settings.MONGO_DATABASE]
    print("Connected to MongoDB")


async def disconnect_db() -> None:
    """Disconnect from MongoDB."""
    if database.client:
        database.client.close()
    print("Disconnected from MongoDB")


def get_db() -> AsyncDatabase:
    """Get database instance."""
    if database.db is None:
        raise RuntimeError("Database not connected")
    return database.db
