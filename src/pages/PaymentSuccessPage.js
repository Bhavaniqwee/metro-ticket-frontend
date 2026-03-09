import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import Navbar from "../Navbar";

function PaymentSuccessPage() {

  const { state } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {

    const bookTicket = async () => {

      try {

        const token = localStorage.getItem("accessToken");

        const res = await axios.post(
          "http://127.0.0.1:8000/api/tickets/book/",
          {
            source_id: state.sourceId,
            destination_id: state.destinationId,
            passengers: state.passengers,
            is_return: state.isReturn
          },
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );

        navigate("/qr", {
          state: res.data
        });

      } catch (err) {
        console.error("Booking error:", err);
      }

    };

    bookTicket();

  }, []);

  return (
    <>
      <Navbar title="Payment Successful" />

      <div className="card">
        <h2>Payment Successful 🎉</h2>
        <p>Generating your metro ticket...</p>
      </div>
    </>
  );
}

export default PaymentSuccessPage;