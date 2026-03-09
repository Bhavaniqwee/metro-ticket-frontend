import { useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import BottomBar from "./BottomBar";
import axios from "axios";

function QRPage() {
  const { state } = useLocation();

  if (!state || !state.tickets) {
    return (
      <div className="card">
        <h2>No Tickets Found</h2>
        <p>Please book a ticket first.</p>
      </div>
    );
  }

  // 🔥 Cancel Ticket API
  const cancelTicket = async (id) => {
    try {
      const token = localStorage.getItem("accessToken");

      await axios.post(
        `http://127.0.0.1:8000/api/tickets/cancel/${id}/`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );

      alert("Ticket Cancelled!");
      window.location.reload(); // refresh UI
    } catch (err) {
      alert("Failed to cancel ticket");
    }
  };

  return (
    <>
      <Navbar title="Your Tickets" />

      <div className="card">
        <h2>Metro Tickets</h2>

        {state.tickets.map((t) => (
          <div
            key={t.ticket_id}
            style={{
              marginBottom: "25px",
              padding: "15px",
              borderRadius: "20px",
              background: "#f5f0ff",
            }}
          >
            <p style={{ fontSize: "18px", marginBottom: "10px" }}>
              <b>{t.type} Ticket #{t.ticket_id}</b>
            </p>

            <img
              src={`http://127.0.0.1:8000${t.qr}`}
              width="220"
              style={{
                borderRadius: "15px",
                boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
              }}
              alt="QR Code"
            />

            {/* CANCEL BUTTON INSIDE SAME DIV */}
            <button
              onClick={() => cancelTicket(t.ticket_id)}
              style={{
                background: "red",
                color: "white",
                padding: "10px",
                borderRadius: "10px",
                marginTop: "15px",
                width: "100%",
              }}
            >
              Cancel Ticket
            </button>
          </div>
        ))}
      </div>

      <BottomBar active="home" />
    </>
  );
}

export default QRPage;