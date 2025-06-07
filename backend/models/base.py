from pydantic import BaseModel

class GameEntityBase(BaseModel):
    id: str
    name: str
    unlocked_by_tier: int
