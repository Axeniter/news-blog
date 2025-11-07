from pydantic import BaseModel
from typing import Optional
from datetime import datetime
from enum import Enum

class ArticleCategory(Enum):
    programming = "Programming"
    mathematics = "Mathematics"
    graphics = "Graphics"
    other = "Other"

class UserCreate(BaseModel):
    username : str
    email: str
    password : str

class UserResponse(BaseModel):
    id : int
    username : str
    email : str

    class Config:
        from_attributes = True

class ArticleCreate(BaseModel):
    title: str
    content: str
    category: ArticleCategory

class ArticleUpdate(BaseModel):
    title: Optional[str] = None
    content: Optional[str] = None
    category: Optional[ArticleCategory] = None

class ArticleResponse(BaseModel):
    id: int
    title: str
    content: str
    category: ArticleCategory
    created_at: datetime
    author_id: int

    class Config:
        from_attributes = True

class CommentCreate(BaseModel):
    content: str
    article_id: int

class CommentUpdate(BaseModel):
    content: Optional[str] = None

class CommentResponse(BaseModel):
    id: int
    content: str
    created_at: datetime
    author_id: int
    article_id: int

    class Config:
        from_attributes = True

class Token(BaseModel):
    access_token: str
    refresh_token: str
    token_type: str

class TokenData(BaseModel):
    user_id: Optional[str] = None
    username: Optional[str] = None