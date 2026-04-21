import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <header style={{
      height: 56,
      padding: "0 40px",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      background: "rgba(255,255,255,0.92)",
      backdropFilter: "blur(12px)",
      WebkitBackdropFilter: "blur(12px)",
      borderBottom: "1px solid var(--border-light)",
      position: "sticky",
      top: 0,
      zIndex: 100,
    }}>
      <span style={{
        fontFamily: "var(--font-serif)",
        fontSize: 15,
        fontWeight: 500,
        letterSpacing: "0.04em",
        color: "var(--text)",
      }}>
        Lumino 自然光攝影棚
      </span>
      <button className="nav-logout-btn" onClick={handleLogout}>
        登出
      </button>
    </header>
  );
};

export default Header;
