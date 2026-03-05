import React, { useState } from 'react';
import SlotCard from './SlotCard';
import './ViewSlots.css';

export default function ViewSlots({ slots, onBook }) {
    const [filter, setFilter] = useState('all');

    const displayedSlots = slots.filter(slot => {
        if (filter === 'available') return !slot.is_booked;
        if (filter === 'booked') return slot.is_booked;
        return true;
    });

    return (
        <div className="view-slots-page">
            <div className="page-header">
                <div>
                    <h1 className="page-title">View All Slots</h1>
                    <p className="page-subtitle">All slots and their current status</p>
                </div>
            </div>
            <div className="filter-bar">
                <div className="filter-buttons">
                    <button
                        className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
                        onClick={() => setFilter('all')}
                    >
                        All
                    </button>
                    <button
                        className={`filter-btn ${filter === 'available' ? 'active' : ''}`}
                        onClick={() => setFilter('available')}
                    >
                        Available
                    </button>
                    <button
                        className={`filter-btn ${filter === 'booked' ? 'active' : ''}`}
                        onClick={() => setFilter('booked')}
                    >
                        Booked
                    </button>
                </div>
                <div className="summary-text">
                    Showing {displayedSlots.length} of {slots.length} slots
                </div>
            </div>

            <div className="slots-grid">
                {displayedSlots.map(slot => (
                    <SlotCard key={slot.id} slot={slot} onBook={onBook} />
                ))}
                {displayedSlots.length === 0 && (
                    <div className="no-matches">
                        No slots match the selected filter.
                    </div>
                )}
            </div>
        </div>
    );
}
