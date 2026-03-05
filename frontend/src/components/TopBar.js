import React from 'react';
import './TopBar.css';

export default function TopBar() {
    return (
        <div className="topbar">
            <div className="topbar-right">
                <span className="current-date">
                    {new Date().toLocaleDateString("en-IN", {
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric"
                    })}
                </span>
            </div>
        </div>
    );
}
