import React from 'react';
import './ManageSlots.css';

export default function ManageSlots({ slots, onEdit, onDelete }) {
    return (
        <div className="manage-slots-page">
            <div className="page-header">
                <div>
                    <h1 className="page-title">Manage Slots</h1>
                    <p className="page-subtitle">Edit or delete your time slots</p>
                </div>
            </div>
            <div className="manage-note">
                ⚠️ <strong>Note:</strong> Booked slots cannot be deleted. Cancel the booking first.
            </div>

            <div className="table-wrap">
                <table>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Slot Time</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {slots.map((slot, index) => (
                            <tr key={slot.id}>
                                <td>{index + 1}</td>
                                <td className="slot-time-cell">{slot.slot_time}</td>
                                <td>
                                    {slot.is_booked ? (
                                        <span className="status-pill booked">Booked</span>
                                    ) : (
                                        <span className="status-pill available">Available</span>
                                    )}
                                </td>
                                <td>
                                    <div className="action-buttons">
                                        <button
                                            className="edit-btn"
                                            onClick={() => onEdit(slot)}
                                        >
                                            ✏️ Edit
                                        </button>
                                        <button
                                            className="delete-btn"
                                            onClick={() => onDelete(slot)}
                                            disabled={slot.is_booked}
                                            title={slot.is_booked ? "Cannot delete a booked slot" : "Delete slot"}
                                        >
                                            🗑️ Delete
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                        {slots.length === 0 && (
                            <tr>
                                <td colSpan="4" className="empty-table-row">No slots found.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
