from pydantic import BaseModel, Field
from typing import Optional


class ProgramBase(BaseModel):
    name: str = Field(..., description="Name of the program")
    description: Optional[str] = None
    website: Optional[str] = None
    image_url: Optional[str] = None


class ProgramCreate(ProgramBase):
    id: str


class ProgramResponse(ProgramBase):
    id: str

    class Config:
        from_attributes = True
