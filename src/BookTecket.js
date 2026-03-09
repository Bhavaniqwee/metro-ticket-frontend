import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function BookTicket() {
  const navigate = useNavigate();
  const [stations, setStations] = useState([]);
  const [source, setSource] = useState("");
  const [destination, setDestination] = useState("");
  const [passengers, setPassengers] = useState(1);

  useEffect(() => {
    const fetchStations = async () => {
      const token = localStorage.getItem("accessToken");

      const res = await axios.get(
        "http://127.0.0.1:8000/api/metro/stations/",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setStations(res.data);
    };

    fetchStations();
  }, []);

  // 🔁 SWAP STATIONS
  const swapStations = () => {
    let temp = source;
    setSource(destination);
    setDestination(temp);
  };

  const calculateFare = () => {
    const sourceStation = stations.find((s) => s.id === Number(source));
    const destinationStation = stations.find((s) => s.id === Number(destination));

    if (!sourceStation || !destinationStation) {
      alert("Select valid stations");
      return;
    }

    navigate("/fare", {
      state: {
        sourceId: sourceStation.id,
        sourceName: sourceStation.name,
        destinationId: destinationStation.id,
        destinationName: destinationStation.name,
        passengers,
      },
    });
  };

  return (
    <div className="card">
      
      <h2 style={{ marginBottom: "20px" }}>
        <span role="img" aria-label="train">🚇</span> Book Metro Ticket
      </h2>

      <h3>Passengers</h3>
      <button
        onClick={() => setPassengers(Math.max(1, passengers - 1))}
        className="purple-btn"
      >
        -
      </button>

      <div style={{ fontSize: "20px", margin: "10px 0" }}>{passengers}</div>

      <button onClick={() => setPassengers(passengers + 1)} className="purple-btn">
        +
      </button>

      {/* SOURCE */}
      <select
        value={source}
        onChange={(e) => setSource(e.target.value)}
        className="dropdown"
      >
        <option value="">Select Source</option>
        {stations.map((s) => (
          <option key={s.id} value={s.id}>
            {s.name} ({s.line})
          </option>
        ))}
      </select>

      {/* SWAP BUTTON */}
      <button
        onClick={swapStations}
        style={{
          width: "80%",
          margin: "10px auto",
          backgroundColor: "#6a0dad",
          color: "white",
          border: "none",
          padding: "10px",
          borderRadius: "20px",
          fontSize: "18px",
        }}
      >
        ⇄ Swap
      </button>

      {/* DESTINATION */}
      <select
        value={destination}
        onChange={(e) => setDestination(e.target.value)}
        className="dropdown"
      >
        <option value="">Select Destination</option>
        {stations.map((s) => (
          <option key={s.id} value={s.id}>
            {s.name} ({s.line})
          </option>
        ))}
      </select>

      <button onClick={calculateFare} className="purple-btn">
        Calculate Fare
      </button>
    </div>
  );
}

export default BookTicket;