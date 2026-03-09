import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "./Navbar";


function FarePage() {

  const { state } = useLocation();
  const navigate = useNavigate();

  const [fare, setFare] = useState(0);
  const [msg, setMsg] = useState("");

  useEffect(() => {

    const fetchFare = async () => {

      try {

        const token = localStorage.getItem("accessToken");

        const res = await axios.post(
           "https://metro-ticket-booking-system.onrender.com/api/metro/calculate-fare/",
          {
            source_id: state.sourceId,
            destination_id: state.destinationId,
          },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        setFare(res.data.fare * state.passengers);
        setMsg("");

      } catch (err) {

        const backendError = err.response?.data?.error;
        setMsg(backendError || "Error calculating fare");
        setFare(0);

      }

    };

    fetchFare();

  }, [state]);

  return (
    <>

      <Navbar title="Fare Details" />

      <div className="card" style={{ padding: "25px" }}>

        <h2 style={{ marginBottom: "15px" }}>Fare Details</h2>

        <div style={{ fontSize: "18px", marginBottom: "10px" }}>
          <p><b>From:</b> {state.sourceName}</p>
          <p><b>To:</b> {state.destinationName}</p>
          <p><b>Passengers:</b> {state.passengers}</p>
        </div>

        <div style={{ marginTop: "15px" }}>
          <h3>
            One-Way Fare: 
            <span style={{ color: "#000" }}> ₹{fare}</span>
          </h3>

          <h3 style={{ color: "#6a0dad", marginTop: "10px" }}>
            Return Fare: ₹{fare * 2}
          </h3>
        </div>

        {/* ERROR MESSAGE */}
        {msg && (
          <p style={{ color: "red", marginTop: "15px", fontWeight: "bold" }}>
            {msg}
          </p>
        )}

      </div>


      {/* BUY ONE WAY BUTTON */}
      <button
        className="purple-btn"
        style={{ width: "90%", margin: "15px auto", display: "block" }}
        disabled={msg !== ""}
        onClick={() =>
          navigate("/dummy-pay", {
            state: {
              fare: fare,
              sourceId: state.sourceId,
              destinationId: state.destinationId,
              passengers: state.passengers,
              isReturn: false,
            },
          })
        }
      >
        Buy One-Way Ticket
      </button>


      {/* BUY RETURN BUTTON */}
      <button
        className="purple-btn"
        style={{
          width: "90%",
          margin: "10px auto",
          display: "block",
          background: "#8a2be2",
        }}
        disabled={msg !== ""}
        onClick={() =>
          navigate("/dummy-pay", {
            state: {
              fare: fare * 2,
              sourceId: state.sourceId,
              destinationId: state.destinationId,
              passengers: state.passengers,
              isReturn: true,
            },
          })
        }
      >
        Buy Return Ticket
      </button>


     

    </>
  );
}

export default FarePage;