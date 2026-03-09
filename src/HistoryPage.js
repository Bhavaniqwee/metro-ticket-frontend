import axios from "axios";
import { useEffect, useState } from "react";
import Navbar from "./Navbar";
import BottomBar from "./BottomBar";

function HistoryPage() {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const loadHistory = async () => {
      const token = localStorage.getItem("accessToken");

      const res = await axios.get(
        "http://127.0.0.1:8000/api/tickets/history/",
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setHistory(res.data);
    };

    loadHistory();
  }, []);

  return (
    <>
      <Navbar title="Booking History" />

      <div className="card">
        <h2>Your Bookings</h2>

        {history.map((b) => (
          <div
            key={b.booking_id}
            style={{
              padding: "15px",
              background: "#f5f0ff",
              borderRadius: "15px",
              marginBottom: "20px",
            }}
          >
            <p><b>{b.date}</b></p>
            <p>{b.from} → {b.to}</p>
            <p>Passengers: {b.passengers}</p>
            <p>Total Fare: ₹{b.fare}</p>

            <h4 style={{ marginTop: "10px" }}>Tickets:</h4>

            {b.tickets.map((t) => (
              <div key={t.ticket_id} style={{ marginBottom: "12px" }}>
                <p><b>{t.type} #{t.ticket_id}</b> — {t.status}</p>
                <img
                  src={`http://127.0.0.1:8000${t.qr}`}
                  width="150"
                  style={{ opacity: t.status === "CANCELLED" ? 0.4 : 1 }}
                />
              </div>
            ))}
          </div>
        ))}
      </div>

      <BottomBar active="history" />
    </>
  );
}

export default HistoryPage;