import React from 'react';
import SlotCard from './SlotCard';
import './BookSlot.css';

export default function BookSlot({ slots, onBook }) {
    const availableSlots = slots.filter(s => !s.is_booked);

    if (availableSlots.length === 0) {
        return (
            <div className="empty-state">
                <div className="page-header">
                    <div>
                        <h1 className="page-title">Book a Slot</h1>
                        <p className="page-subtitle">Select an available slot to book</p>
                    </div>
                </div>
                <div className="empty-icon">🎉</div>
                <h3>All slots are booked!</h3>
                <p>Check back later for new availability.</p>
            </div>
        );
    }

    return (
        <div className="book-slot-page">
            <div className="page-header">
                <div>
                    <h1 className="page-title">Book a Slot</h1>
                    <p className="page-subtitle">Select an available slot to book</p>
                </div>
            </div>
            <p className="page-desc">Click Book Now on any available slot below</p>
            <div className="slots-grid">
                {availableSlots.map(slot => (
                    <SlotCard key={slot.id} slot={slot} onBook={onBook} />
                ))}
            </div>
        </div>
    );
}
