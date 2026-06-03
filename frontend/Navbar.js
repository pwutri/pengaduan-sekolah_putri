import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const nav = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    nav("/login");
  };

  return (
    <div style={{
      background: "#b6c1ff",
      padding: "12px 20px",
      display: "flex",
      justifyContent: "space-between"
    }}>
      <h2 style={{ color: "white" }}>Aspirasi 💖</h2>

      <div style={{ display: "flex", gap: "15px" }}>
        <Link to="/" style={{color:"white"}}>Input</Link>
        <Link to="/history" style={{color:"white"}}>History</Link>
        <Link to="/login" style={{color:"white"}}>Admin</Link>
        <button onClick={logout}>Logout</button>
      </div>
    </div>
  );
}