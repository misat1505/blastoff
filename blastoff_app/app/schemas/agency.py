from pydantic import BaseModel


class AgencyBase(BaseModel):
    name: str
    country: str
    description: str
    website: str
    image_url: str


class AgencyCreate(AgencyBase):
    id: int


class AgencyResponse(AgencyBase):
    id: int

    class Config:
        from_attributes = True
