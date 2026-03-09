import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import Navbar from "../Navbar";

function PaymentPage() {

  const location = useLocation();
  const navigate = useNavigate();

  const state = location.state;

  const [loading, setLoading] = useState(false);

  if (!state) {
    return <h2>Invalid payment request</h2>;
  }

  const handlePayment = () => {

    setLoading(true);

    setTimeout(() => {

      console.log("Navigating to payment success...");

      navigate("/payment-success", {
        state: state
      });

    }, 2000);

  };

  return (
    <>
      <Navbar title="UPI Payment" />

      <div className="card">

        <h2>Pay ₹{state.fare}</h2>

        <img
          src="Qr.jpg"
          width="200"
          alt="QR"
        />

        <p>Scan with any UPI app</p>

        <button
          className="purple-btn"
          onClick={handlePayment}
          disabled={loading}
        >
          {loading ? "Processing..." : "I Have Paid"}
        </button>

      </div>
    </>
  );
}

export default PaymentPage;