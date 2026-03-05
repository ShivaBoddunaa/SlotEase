import React from 'react';
import './Toast.css';

export default function Toast({ message, type, onClose }) {
    return (
        <div className={`toast toast-${type}`}>
            <span className="toast-icon">
                {type === "success" ? "✓" : type === "error" ? "✕" : "⚠"}
            </span>
            <span className="toast-message">{message}</span>
            <button className="toast-close" onClick={onClose}>✕</button>
        </div>
    );
}
