import React from 'react';
import './BookedTable.css';

export default function BookedTable({ bookedSlots }) {
    if (bookedSlots.length === 0) {
        return <div className="no-bookings">📭 No bookings yet</div>;
    }

    return (
        <div className="table-wrap">
            <table>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Slot Time</th>
                        <th>Booked By</th>
                        <th>Booked At</th>
                    </tr>
                </thead>
                <tbody>
                    {bookedSlots.map((row, index) => (
                        <tr key={row.id}>
                            <td>{index + 1}</td>
                            <td>{row.slot_time}</td>
                            <td>{row.booked_by}</td>
                            <td>
                                {row.booked_at
                                    ? new Date(row.booked_at).toLocaleString('en-IN')
                                    : '-'}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
