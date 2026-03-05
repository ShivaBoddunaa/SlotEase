import React, { useState, useEffect } from 'react';
import api from '../api/axiosConfig';
import './BookingModal.css';

export default function BookingModal({ slot, onClose, onSuccess }) {
    const [name, setName] = useState('');
    const [fieldError, setFieldError] = useState('');
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
        if (name.trim() === '') {
            setFieldError('Name is required');
            return;
        }

        setLoading(true);
        setApiError('');
        try {
            await api.post(`/book/${slot.id}`, { name: name.trim() });
            onSuccess();
            onClose();
        } catch (error) {
            setApiError(error.response?.data?.detail || 'Booking failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="overlay">
            <div className="modal-box">
                <h2>Book Your Slot</h2>
                <p className="modal-slot-time">🕐 {slot.slot_time}</p>
                <label>Your Full Name</label>
                <input
                    type="text"
                    placeholder="Enter your full name"
                    value={name}
                    onChange={(e) => {
                        setName(e.target.value);
                        setFieldError('');
                    }}
                />
                {fieldError && <p className="field-error">{fieldError}</p>}
                {apiError && <div className="api-error-box">{apiError}</div>}
                <div className="modal-actions">
                    <button className="cancel-btn" onClick={onClose}>
                        Cancel
                    </button>
                    <button
                        className="confirm-btn"
                        onClick={handleConfirm}
                        disabled={loading}
                    >
                        {loading ? 'Booking...' : 'Confirm Booking'}
                    </button>
                </div>
            </div>
        </div>
    );
}
