import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import "../App.css";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const login = async () => {
    try {
      const res = await axios.post(
        "https://metro-ticket-booking-system.onrender.com//api/users/login/",
        { username, password }
      );

      localStorage.setItem("accessToken", res.data.access);
      navigate("/book");
    } catch {
      setMsg("Invalid login");
    }
  };

  return (
    <div className="card">
  <h2>🚇 Metro Login</h2>

  <input
    placeholder="Enter Username"
    onChange={(e) => setUsername(e.target.value)}
  />

  <input
    type="password"
    placeholder="Enter Password"
    onChange={(e) => setPassword(e.target.value)}
  />

  <button onClick={login}>Login</button>

  <p className="error">{msg}</p>

  <p style={{ marginTop: "15px" }}>
    Don't have an account? <Link to="/register">Register</Link>
  </p>
</div>

  )
}  
export default Login;
