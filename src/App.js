
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import BookTicket from "./BookTecket";
import FarePage from "./FarePage";
import QRPage from "./QRPage";
import HistoryPage from "./HistoryPage";
import PaymentSuccessPage from "./pages/PaymentSuccessPage";
import PaymentPage from "./pages/PaymentPage";



function App() {
  const token = localStorage.getItem("accessToken");

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected routes */}
        <Route
          path="/book"
          element={token ? <BookTicket /> : <Navigate to="/" />}
        />
        <Route
          path="/fare"
          element={token ? <FarePage /> : <Navigate to="/" />}
        />
        <Route
          path="/qr"
          element={token ? <QRPage /> : <Navigate to="/" />}
        />
        <Route path="/history" element={<HistoryPage />} />
        <Route path="/dummy-pay" element={<PaymentPage />} />
         <Route path="/payment-success" element={<PaymentSuccessPage />} />
      </Routes>
      
    </BrowserRouter>
  );
}

export default App;
