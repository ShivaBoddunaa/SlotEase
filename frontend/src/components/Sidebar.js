import React from 'react';
import './Sidebar.css';

export default function Sidebar({ activePage, onNavigate }) {
    return (
        <div className="sidebar">
            <div className="sidebar-logo">
                <div className="logo-icon-box">S</div>
                <span className="logo-text">SlotEase</span>
            </div>

            <div className="sidebar-nav">
                <div className="nav-section-title">MAIN MENU</div>
                <div
                    className={`nav-item ${activePage === "dashboard" ? "active" : ""}`}
                    onClick={() => onNavigate("dashboard")}
                >
                    <span className="nav-icon">⊞</span>
                    <span className="nav-label">Dashboard</span>
                </div>

                <div className="nav-section-title">SLOT ACTIONS</div>
                <div
                    className={`nav-item ${activePage === "book" ? "active" : ""}`}
                    onClick={() => onNavigate("book")}
                >
                    <span className="nav-icon">+</span>
                    <span className="nav-label">Book Slot</span>
                </div>
                <div
                    className={`nav-item ${activePage === "view" ? "active" : ""}`}
                    onClick={() => onNavigate("view")}
                >
                    <span className="nav-icon">○</span>
                    <span className="nav-label">View Slots</span>
                </div>
                <div
                    className={`nav-item ${activePage === "manage" ? "active" : ""}`}
                    onClick={() => onNavigate("manage")}
                >
                    <span className="nav-icon">◈</span>
                    <span className="nav-label">Manage Slots</span>
                </div>
                <div
                    className={`nav-item ${activePage === "booked" ? "active" : ""}`}
                    onClick={() => onNavigate("booked")}
                >
                    <span className="nav-icon">☰</span>
                    <span className="nav-label">Booked Slots</span>
                </div>
            </div>

            <div className="sidebar-footer">
                <div className="user-info">
                    <div className="user-avatar">SE</div>
                    <div>
                        <p className="user-name">SlotEase</p>
                        <p className="user-role">Admin</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
