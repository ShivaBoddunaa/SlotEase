import React, { useEffect } from 'react';
import './ConfirmModal.css';

export default function ConfirmModal({
    isOpen,
    title,
    message,
    type,
    confirmText,
    onConfirm,
    onCancel
}) {
    useEffect(() => {
        const fn = (e) => {
            if (e.key === "Escape") onCancel();
        };
        if (isOpen) {
            window.addEventListener("keydown", fn);
        }
        return () => window.removeEventListener("keydown", fn);
    }, [isOpen, onCancel]);

    if (!isOpen) return null;

    return (
        <div className="confirm-overlay">
            <div className="confirm-modal">
                <div className={`confirm-icon ${type}`}>
                    {type === "danger" ? "🗑" : type === "warning" ? "⚠" : "?"}
                </div>
                <h3 className="confirm-title">{title}</h3>
                <p className="confirm-message">{message}</p>
                <div className="confirm-actions">
                    <button className="confirm-no" onClick={onCancel}>
                        Cancel
                    </button>
                    <button className={`confirm-yes ${type}`} onClick={onConfirm}>
                        {confirmText || "Confirm"}
                    </button>
                </div>
            </div>
        </div>
    );
}
