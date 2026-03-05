import React from 'react';
import './SlotCard.css';

export default function SlotCard({ slot, onBook }) {
    if (slot.is_booked) {
        return (
            <div className="slot-card booked">
                <h3>{slot.slot_time}</h3>
                <span className="badge booked-badge">● Booked</span>
                <p className="booked-by">👤 {slot.booked_by}</p>
            </div>
        );
    }

    return (
        <div className="slot-card available">
            <h3>{slot.slot_time}</h3>
            <span className="badge available-badge">● Available</span>
            <button className="book-btn" onClick={() => onBook(slot)}>
                Book Now
            </button>
        </div>
    );
}
