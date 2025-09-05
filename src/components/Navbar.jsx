import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav className="navbar enhanced-navbar">
      <div className="container inner">
        {/* Logo Section */}
        <Link className="brand link nav-logo" to="/">
          <span className="logo-icon">
            {/* Modern badminton logo SVG, inspired by Decathlon style */}
            <svg width="38" height="38" viewBox="0 0 38 38" fill="none">
              <ellipse cx="19" cy="19" rx="16" ry="16" fill="#3A6EEA" opacity="0.13"/>
              <path d="M13 10L19 28L25 10" stroke="#3A6EEA" strokeWidth="2.5" strokeLinecap="round" />
              <circle cx="19" cy="28" r="2.5" fill="#fff" stroke="#3A6EEA" strokeWidth="1.5"/>
              <rect x="17.2" y="22" width="3.6" height="6" rx="1.5" fill="#3A6EEA" />
            </svg>
          </span>
          <span className="logo-text">
            <span className="logo-main">BADMINTON</span>
            <span className="logo-sub">Buddy</span>
          </span>
        </Link>
        {/* Navigation Links */}
        <div className="nav-links" style={{ gap: 18 }}>
          {user ? (
            <>
              <NavLink className="link" to="/dashboard">Dashboard</NavLink>
              <NavLink className="link" to="/challenges">Challenges</NavLink>
              <NavLink className="link" to="/tournaments">Tournaments</NavLink>
              <NavLink className="link" to="/booking">Court Booking</NavLink>
              <NavLink className="link" to="/profile">Profile</NavLink>
              <button className="btn secondary" onClick={logout}>Logout</button>
            </>
          ) : (
            <>
              <NavLink className="btn secondary" to="/login">Login</NavLink>
              <NavLink className="btn" to="/register">Register</NavLink>
            </>
          )}
        </div>
      </div>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@900&family=Roboto:wght@400;700&display=swap');
        .enhanced-navbar {
          background: #f4f6fb;
          border-bottom: 1.5px solid #e3e8f0;
          box-shadow: 0 2px 12px rgba(16,24,40,0.06);
          transition: background 0.3s, border 0.3s;
          position: sticky;
          top: 0;
          z-index: 100;
        }
        .enhanced-navbar .inner {
          min-height: 62px;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .nav-logo {
          display: flex;
          align-items: center;
          gap: 14px;
          text-decoration: none;
          user-select: none;
        }
        .logo-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, #3A6EEA 40%, #5B8CFF 100%);
          border-radius: 50%;
          width: 44px;
          height: 44px;
          box-shadow: 0 2px 12px rgba(91,140,255,0.13);
        }
        .logo-text {
          display: flex;
          align-items: baseline;
          gap: 7px;
        }
        .logo-main {
          font-family: 'Montserrat', Arial, sans-serif;
          font-weight: 900;
          font-size: 1.45rem;
          letter-spacing: 1px;
          color: #3A6EEA;
        }
        .logo-sub {
          font-family: 'Roboto', Arial, sans-serif;
          font-weight: 700;
          font-size: 1.1rem;
          color: #222b45;
          letter-spacing: 0.5px;
        }
        .nav-links {
          display: flex;
          align-items: center;
          gap: 18px;
        }
        .nav-links .link {
          color: #3A6EEA;
          font-family: 'Roboto', Arial, sans-serif;
          font-weight: 500;
          padding: 7px 14px;
          border-radius: 8px;
          font-size: 1.05rem;
          transition: background 0.2s, color 0.2s, box-shadow 0.2s;
        }
        .nav-links .link.active, .nav-links .link:hover {
          background: #eaf0ff;
          color: #222b45;
          box-shadow: 0 2px 8px rgba(91,140,255,0.07);
        }
        .btn, .btn.secondary {
          font-family: 'Roboto', Arial, sans-serif;
          font-weight: 700;
          font-size: 1.01rem;
          border-radius: 8px;
          transition: box-shadow 0.2s, background 0.2s;
        }
        .btn:hover, .btn.secondary:hover {
          box-shadow: 0 2px 8px rgba(91,140,255,0.13);
        }
        @media (max-width: 700px) {
          .nav-logo { gap: 8px; }
          .logo-main { font-size: 1.1rem; }
          .logo-sub { font-size: 0.95rem; }
          .nav-links { gap: 10px; }
        }
      `}</style>
    </nav>
  );
}