import { Link } from "react-router-dom";

function BottomBar({ active }) {
  return (
    <div className="bottom-bar">
      <div className={active === "home" ? "active" : ""}>
        <Link to="/book">Home</Link>
      </div>
      <div className={active === "history" ? "active" : ""}>
        <Link to="/history">History</Link>
      </div>
    </div>
  );
}

export default BottomBar;