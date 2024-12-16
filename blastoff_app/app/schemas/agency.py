from pydantic import BaseModel


class AgencyBase(BaseModel):
    name: str
    country: str
    description: str
    website: str
    image_url: str


class AgencyCreate(AgencyBase):
    id: str


class AgencyResponse(AgencyBase):
    id: str

    class Config:
        from_attributes = True
