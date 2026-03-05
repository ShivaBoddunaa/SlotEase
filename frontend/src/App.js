import { useState, useEffect } from "react";
import api from "./api/axiosConfig";
import Sidebar from "./components/Sidebar";
import TopBar from "./components/TopBar";
import Dashboard from "./components/Dashboard";
import BookSlot from "./components/BookSlot";
import ViewSlots from "./components/ViewSlots";
import ManageSlots from "./components/ManageSlots";
import BookedSlots from "./components/BookedSlots";
import BookingModal from "./components/BookingModal";
import EditModal from "./components/EditModal";
import ConfirmModal from "./components/ConfirmModal";
import Toast from "./components/Toast";
import "./App.css";

export default function App() {
  const [activePage, setActivePage] = useState("dashboard");
  const [slots, setSlots] = useState([]);
  const [bookedSlots, setBookedSlots] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [selectedEditSlot, setSelectedEditSlot] = useState(null);
  const [confirm, setConfirm] = useState({
    isOpen: false,
    title: "",
    message: "",
    type: "danger",
    confirmText: "",
    onConfirm: null
  });
  const [toast, setToast] = useState({
    show: false,
    message: "",
    type: "success"
  });

  const showConfirm = (title, message, type, confirmText, onConfirm) => {
    setConfirm({ isOpen: true, title, message, type, confirmText, onConfirm });
  };

  const closeConfirm = () => {
    setConfirm(prev => ({ ...prev, isOpen: false }));
  };

  const showToast = (message, type = "success") => {
    setToast({ show: true, message, type });
    setTimeout(() => {
      setToast(prev => ({ ...prev, show: false }));
    }, 3000);
  };

  const fetchSlots = async () => {
    try {
      const res = await api.get("/slots");
      setSlots(res.data);
    } catch {
      setSlots([]);
    }
  };

  const fetchBooked = async () => {
    try {
      const res = await api.get("/booked");
      setBookedSlots(res.data);
    } catch {
      setBookedSlots([]);
    }
  };

  const fetchAll = async () => {
    setLoading(true);
    try {
      await fetchSlots();
      await fetchBooked();
    } catch (err) {
      showToast("Failed to load data", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleBook = (slot) => setSelectedSlot(slot);
  const handleEdit = (slot) => setSelectedEditSlot(slot);

  const handleDelete = (slot) => {
    showConfirm(
      "Delete Slot",
      `Delete "${slot.slot_time}"? This cannot be undone.`,
      "danger",
      "Yes, Delete",
      async () => {
        closeConfirm();
        try {
          await api.delete(`/slots/${slot.id}`);
          showToast("Slot deleted successfully", "success");
          fetchAll();
        } catch (err) {
          showToast(err.response?.data?.detail || "Delete failed", "error");
        }
      }
    );
  };

  const handleCancelBooking = (row) => {
    showConfirm(
      "Cancel Booking",
      `Cancel "${row.slot_time}" booked by ${row.booked_by}?`,
      "warning",
      "Yes, Cancel Booking",
      async () => {
        closeConfirm();
        try {
          await api.delete(`/cancel/${row.id}`);
          showToast("Booking cancelled successfully", "success");
          fetchAll();
        } catch (err) {
          showToast(err.response?.data?.detail || "Cancel failed", "error");
        }
      }
    );
  };

  const handleBookingSuccess = () => {
    showToast("Slot booked successfully! 🎉", "success");
    fetchAll();
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    fetchAll();
  }, []);

  return (
    <div className="app-layout">
      <Sidebar activePage={activePage} onNavigate={setActivePage} />
      <div className="main-area">
        <TopBar activePage={activePage} />
        <div className="page-content">
          {activePage === "dashboard" && (
            <Dashboard slots={slots} bookedSlots={bookedSlots} loading={loading} onNavigate={setActivePage} />
          )}
          {activePage === "book" && (
            <BookSlot slots={slots} onBook={handleBook} />
          )}
          {activePage === "view" && (
            <ViewSlots slots={slots} onBook={handleBook} />
          )}
          {activePage === "manage" && (
            <ManageSlots slots={slots} onEdit={handleEdit} onDelete={handleDelete} />
          )}
          {activePage === "booked" && (
            <BookedSlots bookedSlots={bookedSlots} onCancel={handleCancelBooking} />
          )}
        </div>
      </div>
      {selectedSlot && (
        <BookingModal slot={selectedSlot} onClose={() => setSelectedSlot(null)} onSuccess={handleBookingSuccess} />
      )}
      {selectedEditSlot && (
        <EditModal
          slot={selectedEditSlot}
          onClose={() => setSelectedEditSlot(null)}
          onSuccess={() => { showToast("Slot edited successfully", "success"); fetchAll(); setSelectedEditSlot(null); }}
        />
      )}
      <ConfirmModal
        isOpen={confirm.isOpen}
        title={confirm.title}
        message={confirm.message}
        type={confirm.type}
        confirmText={confirm.confirmText}
        onConfirm={confirm.onConfirm}
        onCancel={closeConfirm}
      />
      {toast.show && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(prev => ({ ...prev, show: false }))}
        />
      )}
    </div>
  );
}
