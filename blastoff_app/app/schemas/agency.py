from pydantic import BaseModel


class AgencyBase(BaseModel):
    name: str
    country: str
    description: str
    website: str


class AgencyCreate(AgencyBase):
    pass


class AgencyResponse(AgencyBase):
    id: int

    class Config:
        from_attributes = True
