from pydantic import BaseModel

class BookingRequest(BaseModel):
    name: str

class SlotCreate(BaseModel):
    slot_time: str

class SlotUpdate(BaseModel):
    slot_time: str
