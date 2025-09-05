import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/"); // Navigate to home page after login
    } catch (err) {
      setError("Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-container animated-form">
      {/* Motivational Banner Above Login */}
      <div className="login-banner">
        <span className="login-banner-icon">🏸</span>
        <span className="login-banner-text">
          Welcome to <span style={{ color: "#3A6EEA", fontWeight: 700 }}>Badminton Buddy</span>! 
          <br />
          <span style={{ fontSize: "1.02em", color: "#555" }}>
            Connect, challenge, and track your badminton journey.
          </span>
        </span>
      </div>
      <div className="form-card">
        <h2 className="form-title">Welcome Back 👋</h2>
        <p className="form-subtitle">Sign in to your account</p>
        <form onSubmit={handleLogin} autoComplete="on">
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              placeholder="you@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoFocus
            />
          </div>
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {error && <p className="error animated-error">{error}</p>}
          <button
            type="submit"
            className="btn"
            disabled={loading}
            style={{
              transition: "background 0.3s, transform 0.2s",
              transform: loading ? "scale(0.97)" : "scale(1)",
              opacity: loading ? 0.7 : 1,
            }}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
          <div className="login-extra">
            <Link to="/register" className="login-link">New here? Register</Link>
            <span className="login-sep">|</span>
            <Link to="/forgot-password" className="login-link">Forgot Password?</Link>
          </div>
        </form>
      </div>
      <style>{`
        .form-container {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          background: #f6f7fb;
        }
        .login-banner {
          display: flex;
          align-items: center;
          gap: 18px;
          background: #eaf0ff;
          border-radius: 16px;
          padding: 18px 32px;
          margin-bottom: 32px;
          box-shadow: 0 2px 12px rgba(91,140,255,0.07);
          font-size: 1.15rem;
          font-weight: 500;
          animation: fadeInDown 0.7s both;
        }
        .login-banner-icon {
          font-size: 2.2rem;
          color: #3A6EEA;
        }
        .form-card {
          background: #fff;
          border-radius: 16px;
          box-shadow: 0 2px 16px rgba(91,140,255,0.09);
          padding: 38px 38px 32px 38px;
          min-width: 340px;
          max-width: 380px;
          margin: 0 auto;
        }
        .form-title {
          font-size: 1.6rem;
          font-weight: 800;
          color: #222b45;
          margin-bottom: 8px;
          text-align: center;
        }
        .form-subtitle {
          font-size: 1.05rem;
          color: #555;
          margin-bottom: 22px;
          text-align: center;
        }
        .input-group {
          margin-bottom: 18px;
        }
        .input-group label {
          display: block;
          font-weight: 600;
          color: #3A6EEA;
          margin-bottom: 6px;
        }
        .input-group input {
          width: 100%;
          padding: 10px 12px;
          border: 1.5px solid #e3e8f0;
          border-radius: 8px;
          font-size: 1.05rem;
          transition: border 0.2s;
        }
        .input-group input:focus {
          border-color: #3A6EEA;
          outline: none;
        }
        .btn {
          width: 100%;
          background: #3A6EEA;
          color: #fff;
          font-weight: 700;
          font-size: 1.08rem;
          border-radius: 8px;
          border: none;
          padding: 10px 0;
          margin-top: 8px;
          box-shadow: 0 2px 8px rgba(91,140,255,0.07);
          cursor: pointer;
        }
        .btn:disabled {
          background: #bfc8e6;
          cursor: not-allowed;
        }
        .error {
          color: #e74c3c;
          font-size: 0.98rem;
          margin-bottom: 8px;
          text-align: center;
        }
        .login-extra {
          margin-top: 18px;
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 10px;
        }
        .login-link {
          color: #3A6EEA;
          text-decoration: none;
          font-weight: 500;
          font-size: 0.98rem;
          transition: color 0.2s;
        }
        .login-link:hover {
          text-decoration: underline;
          color: #222b45;
        }
        .login-sep {
          color: #bbb;
        }
        @keyframes fadeInDown {
          from { opacity: 0; transform: translateY(-30px);}
          to { opacity: 1; transform: none;}
        }
        @media (max-width: 700px) {
          .form-card {
            padding: 22px 10px 18px 10px;
            min-width: 90vw;
            max-width: 98vw;
          }
          .login-banner {
            padding: 12px 10px;
            font-size: 1rem;
            gap: 10px;
          }
        }
      `}</style>
    </div>
  );
}