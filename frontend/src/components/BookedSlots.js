import React from 'react';
import './BookedSlots.css';

export default function BookedSlots({ bookedSlots, onCancel }) {
    if (bookedSlots.length === 0) {
        return (
            <div className="empty-booked-state">
                <div className="page-header">
                    <div>
                        <h1 className="page-title">Booked Slots</h1>
                        <p className="page-subtitle">All confirmed slot bookings</p>
                    </div>
                </div>
                <div className="empty-icon">📭</div>
                <h3>No bookings yet.</h3>
                <p>Slots are available to book!</p>
                <button className="book-shortcut-btn">➕ Go Book a Slot</button>
            </div>
        );
    }

    return (
        <div className="booked-slots-page">
            <div className="page-header">
                <div>
                    <h1 className="page-title">Booked Slots</h1>
                    <p className="page-subtitle">All confirmed slot bookings</p>
                </div>
            </div>
            <div className="booked-summary">
                Total bookings: <strong>{bookedSlots.length}</strong>
            </div>

            <div className="booked-note">
                ℹ️ Cancelling a booking will make the slot available again.
            </div>

            <div className="table-wrap">
                <table>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Slot Time</th>
                            <th>Booked By</th>
                            <th>Booked At</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {bookedSlots.map((row, index) => (
                            <tr key={row.id}>
                                <td>{index + 1}</td>
                                <td className="slot-time-cell">{row.slot_time}</td>
                                <td className="booked-by-cell">👤 {row.booked_by}</td>
                                <td className="booked-at-cell">
                                    {row.booked_at ? new Date(row.booked_at).toLocaleString('en-IN') : '-'}
                                </td>
                                <td>
                                    <button
                                        className="cancel-booking-btn"
                                        onClick={() => onCancel(row)}
                                    >
                                        ❌ Cancel Booking
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
