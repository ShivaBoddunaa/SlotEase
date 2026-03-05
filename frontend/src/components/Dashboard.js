import React from 'react';
import './Dashboard.css';

export default function Dashboard({ slots, bookedSlots, loading, onNavigate }) {
    const availableCount = slots.filter(s => !s.is_booked).length;
    const occupancyRate = slots.length > 0
        ? Math.round((bookedSlots.length / slots.length) * 100) + "%"
        : "0%";

    const recentBookings = [...bookedSlots].reverse().slice(0, 3);

    return (
        <div className="dashboard">
            <div className="page-header">
                <div>
                    <h1 className="page-title">Dashboard Overview</h1>
                    <p className="page-subtitle">Welcome back! Here's your slot overview</p>
                </div>
            </div>
            <div className="stats-grid">
                <div className="stat-card">
                    <div className="stat-icon" style={{ background: '#e6f7f1', color: '#10b981' }}>
                        <span className="stat-icon-symbol">#</span>
                    </div>
                    <div>
                        <div className="stat-value">{slots.length}</div>
                        <div className="stat-label">Total Slots</div>
                    </div>
                </div>

                <div className="stat-card">
                    <div className="stat-icon" style={{ background: '#e6f7f1', color: '#10b981' }}>
                        <span className="stat-icon-symbol">✓</span>
                    </div>
                    <div>
                        <div className="stat-value">{availableCount}</div>
                        <div className="stat-label">Available</div>
                    </div>
                </div>

                <div className="stat-card">
                    <div className="stat-icon" style={{ background: '#fce8e6', color: '#ea4335' }}>
                        <span className="stat-icon-symbol">●</span>
                    </div>
                    <div>
                        <div className="stat-value">{bookedSlots.length}</div>
                        <div className="stat-label">Booked</div>
                    </div>
                </div>

                <div className="stat-card">
                    <div className="stat-icon" style={{ background: '#fef3e2', color: '#f57c00' }}>
                        <span className="stat-icon-symbol">%</span>
                    </div>
                    <div>
                        <div className="stat-value">{occupancyRate}</div>
                        <div className="stat-label">Occupancy Rate</div>
                    </div>
                </div>
            </div>

            <div className="dashboard-bottom">
                <div className="section-card">
                    <h3>Recent Bookings</h3>
                    {recentBookings.length === 0 ? (
                        <p style={{ color: '#888', fontSize: '13px' }}>No recent bookings.</p>
                    ) : (
                        <div className="recent-bookings-list">
                            {recentBookings.map(b => (
                                <div key={b.id} className="recent-booking-item">
                                    <div>
                                        <div className="booking-slot-time">{b.slot_time}</div>
                                        <div className="booking-name">👤 {b.booked_by}</div>
                                    </div>
                                    <div className="booking-time-ago">
                                        {b.booked_at ? new Date(b.booked_at).toLocaleDateString('en-IN') : '-'}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                <div className="section-card">
                    <h3>Quick Actions</h3>
                    <div className="quick-actions-grid">
                        <button className="quick-action-btn" onClick={() => onNavigate("book")}>
                            <span className="qa-icon-box blue">+</span>
                            <span>Book a Slot</span>
                        </button>
                        <button className="quick-action-btn" onClick={() => onNavigate("view")}>
                            <span className="qa-icon-box green">◉</span>
                            <span>View All Slots</span>
                        </button>
                        <button className="quick-action-btn" onClick={() => onNavigate("manage")}>
                            <span className="qa-icon-box orange">✎</span>
                            <span>Manage Slots</span>
                        </button>
                        <button className="quick-action-btn" onClick={() => onNavigate("booked")}>
                            <span className="qa-icon-box red">≡</span>
                            <span>Booked Slots</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
