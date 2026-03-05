import React, { useState, useEffect } from 'react';
import api from '../api/axiosConfig';
import './EditModal.css';

export default function EditModal({ slot, onClose, onSuccess }) {
    const [slotTime, setSlotTime] = useState(slot.slot_time);
    const [apiError, setApiError] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const handleKey = (e) => {
            if (e.key === 'Escape') onClose();
        };
        window.addEventListener('keydown', handleKey);
        return () => window.removeEventListener('keydown', handleKey);
    }, [onClose]);

    const handleConfirm = async () => {
        if (slotTime.trim() === '') return;
        setLoading(true);
        setApiError('');
        try {
            await api.put(`/slots/${slot.id}`, { slot_time: slotTime.trim() });
            onSuccess();
        } catch (error) {
            setApiError(error.response?.data?.detail || 'Edit failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="overlay">
            <div className="modal-box">
                <h2>Edit Slot Time</h2>
                <p className="modal-desc">Change the time for this specific slot.</p>

                <label>Slot Time</label>
                <input
                    type="text"
                    placeholder="e.g. 9:00 AM - 10:00 AM"
                    value={slotTime}
                    onChange={(e) => {
                        setSlotTime(e.target.value);
                    }}
                />

                {apiError && <div className="api-error-box">{apiError}</div>}

                <div className="modal-actions">
                    <button className="cancel-btn" onClick={onClose}>
                        Cancel
                    </button>
                    <button
                        className="confirm-btn edit-confirm"
                        onClick={handleConfirm}
                        disabled={loading || slotTime.trim() === ''}
                    >
                        {loading ? 'Saving...' : 'Save Changes'}
                    </button>
                </div>
            </div>
        </div>
    );
}
