from fastapi import APIRouter, HTTPException
from database import get_connection
from models import BookingRequest, SlotCreate, SlotUpdate

router = APIRouter()

@router.get("/slots", tags=["Slots"])
def get_slots():
    conn = None
    try:
        conn = get_connection()
        cursor = conn.cursor(dictionary=True)
        cursor.execute("SELECT * FROM slots ORDER BY id ASC")
        rows = cursor.fetchall()
        for row in rows:
            row['is_booked'] = bool(row['is_booked'])
            if row['booked_at'] is not None:
                row['booked_at'] = str(row['booked_at'])
        return rows
    except Exception as e:
        print(f"Error: {e}")
        raise HTTPException(500, "Database error")
    finally:
        if conn:
            conn.close()

@router.get("/slots/{slot_id}", tags=["Slots"])
def get_slot(slot_id: int):
    conn = None
    try:
        conn = get_connection()
        cursor = conn.cursor(dictionary=True)
        cursor.execute("SELECT * FROM slots WHERE id = %s", (slot_id,))
        row = cursor.fetchone()
        if not row:
            raise HTTPException(404, "Slot not found")
        row['is_booked'] = bool(row['is_booked'])
        if row['booked_at'] is not None:
            row['booked_at'] = str(row['booked_at'])
        return row
    except HTTPException:
        raise
    except Exception as e:
        print(f"Error: {e}")
        raise HTTPException(500, "Database error")
    finally:
        if conn:
            conn.close()

@router.post("/slots", tags=["Slots"])
def create_slot(body: SlotCreate):
    conn = None
    try:
        if not body.slot_time.strip():
            raise HTTPException(400, "Slot time cannot be empty")
        conn = get_connection()
        cursor = conn.cursor(dictionary=True)
        cursor.execute(
            "INSERT INTO slots (slot_time) VALUES (%s)",
            (body.slot_time.strip(),)
        )
        conn.commit()
        return {"message": "Slot created", "slot_time": body.slot_time}
    except HTTPException:
        raise
    except Exception as e:
        print(f"Error: {e}")
        raise HTTPException(500, "Database error")
    finally:
        if conn:
            conn.close()

@router.put("/slots/{slot_id}", tags=["Slots"])
def update_slot(slot_id: int, body: SlotUpdate):
    conn = None
    try:
        if not body.slot_time.strip():
            raise HTTPException(400, "Slot time cannot be empty")
        conn = get_connection()
        cursor = conn.cursor(dictionary=True)
        cursor.execute("SELECT * FROM slots WHERE id = %s", (slot_id,))
        slot = cursor.fetchone()
        if not slot:
            raise HTTPException(404, "Slot not found")
        if slot['is_booked'] == 1:
            raise HTTPException(400, "Cannot edit a booked slot")
        cursor.execute(
            "UPDATE slots SET slot_time=%s WHERE id=%s",
            (body.slot_time.strip(), slot_id)
        )
        conn.commit()
        return {"message": "Slot updated successfully"}
    except HTTPException:
        raise
    except Exception as e:
        print(f"Error: {e}")
        raise HTTPException(500, "Database error")
    finally:
        if conn:
            conn.close()

@router.delete("/slots/{slot_id}", tags=["Slots"])
def delete_slot(slot_id: int):
    conn = None
    try:
        conn = get_connection()
        cursor = conn.cursor(dictionary=True)
        cursor.execute("SELECT * FROM slots WHERE id = %s", (slot_id,))
        slot = cursor.fetchone()
        if not slot:
            raise HTTPException(404, "Slot not found")
        if slot['is_booked'] == 1:
            raise HTTPException(400, "Cannot delete a booked slot")
        cursor.execute("DELETE FROM slots WHERE id=%s", (slot_id,))
        conn.commit()
        return {"message": "Slot deleted successfully"}
    except HTTPException:
        raise
    except Exception as e:
        print(f"Error: {e}")
        raise HTTPException(500, "Database error")
    finally:
        if conn:
            conn.close()

@router.post("/book/{slot_id}", tags=["Bookings"])
def book_slot(slot_id: int, body: BookingRequest):
    conn = None
    try:
        if not body.name.strip():
            raise HTTPException(400, "Name cannot be empty")
        conn = get_connection()
        cursor = conn.cursor(dictionary=True)
        cursor.execute("SELECT * FROM slots WHERE id = %s", (slot_id,))
        slot = cursor.fetchone()
        if not slot:
            raise HTTPException(404, "Slot not found")
        if slot['is_booked'] == 1:
            raise HTTPException(400, "Slot already booked")
        cursor.execute(
            "UPDATE slots SET is_booked=1, booked_by=%s, booked_at=NOW() WHERE id=%s",
            (body.name.strip(), slot_id)
        )
        conn.commit()
        return {"message": "Slot booked successfully", "slot_id": slot_id}
    except HTTPException:
        raise
    except Exception as e:
        print(f"Error: {e}")
        raise HTTPException(500, "Database error")
    finally:
        if conn:
            conn.close()

@router.get("/booked", tags=["Bookings"])
def get_booked_slots():
    conn = None
    try:
        conn = get_connection()
        cursor = conn.cursor(dictionary=True)
        cursor.execute("SELECT * FROM slots WHERE is_booked = 1")
        rows = cursor.fetchall()
        for row in rows:
            row['is_booked'] = bool(row['is_booked'])
            if row['booked_at'] is not None:
                row['booked_at'] = str(row['booked_at'])
        return rows
    except Exception as e:
        print(f"Error: {e}")
        raise HTTPException(500, "Database error")
    finally:
        if conn:
            conn.close()

@router.delete("/cancel/{slot_id}", tags=["Bookings"])
def cancel_booking(slot_id: int):
    conn = None
    try:
        conn = get_connection()
        cursor = conn.cursor(dictionary=True)
        cursor.execute("SELECT * FROM slots WHERE id = %s", (slot_id,))
        slot = cursor.fetchone()
        if not slot:
            raise HTTPException(404, "Slot not found")
        if slot['is_booked'] == 0:
            raise HTTPException(400, "Slot is not booked")
        cursor.execute(
            "UPDATE slots SET is_booked=0, booked_by=NULL, booked_at=NULL WHERE id=%s",
            (slot_id,)
        )
        conn.commit()
        return {"message": "Booking cancelled successfully"}
    except HTTPException:
        raise
    except Exception as e:
        print(f"Error: {e}")
        raise HTTPException(500, "Database error")
    finally:
        if conn:
            conn.close()
