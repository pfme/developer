from pydantic_settings import BaseSettings
from functools import lru_cache

class Settings(BaseSettings):
    PROJECT_NAME: str = "EcoArmario Live Dashboard"
    VERSION: str = "1.0.0"
    API_V1_STR: str = "/api"
    
    GOOGLE_SHEET_ID: str
    GOOGLE_SHEETS_CREDENTIALS_JSON: str = "" # Optional if public
    
    JWT_SECRET_KEY: str
    JWT_ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 1440 # 24 hours
    
    CORS_ORIGINS: list[str] = ["*"]

    class Config:
        env_file = ".env"

@lru_cache()
def get_settings():
    return Settings()
