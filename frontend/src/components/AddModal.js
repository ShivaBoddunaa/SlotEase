import React, { useState, useEffect } from 'react';
import api from '../api/axiosConfig';
import './EditModal.css';

export default function AddModal({ onClose, onSuccess }) {
    const [slotTime, setSlotTime] = useState('');
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
            await api.post(`/slots`, { slot_time: slotTime.trim() });
            onSuccess();
        } catch (error) {
            setApiError(error.response?.data?.detail || 'Add failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="overlay">
            <div className="modal-box">
                <h2>Add New Slot</h2>
                <p className="modal-desc">Create a new time slot.</p>

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
                        {loading ? 'Adding...' : 'Add Slot'}
                    </button>
                </div>
            </div>
        </div>
    );
}
