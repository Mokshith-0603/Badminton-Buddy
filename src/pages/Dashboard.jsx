import Leaderboard from "../components/Leaderboard";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

const QUOTES = [
  "Success is no accident. It is hard work, perseverance, learning, and sacrifice.",
  "Champions keep playing until they get it right.",
  "The difference between ordinary and extraordinary is practice.",
  "Every smash, every drop, every rally makes you better.",
  "Push yourself, because no one else is going to do it for you.",
  "Winners train, losers complain.",
  "Your only limit is you.",
  "Great things never come from comfort zones.",
  "Don’t count the days, make the days count.",
  "The harder you work for something, the greater you’ll feel when you achieve it."
];

export default function Dashboard() {
  const [quote, setQuote] = useState("");

  useEffect(() => {
    setQuote(QUOTES[Math.floor(Math.random() * QUOTES.length)]);
  }, []);

  return (
    <div className="page dashboard-page">
      <div className="container dashboard-grid">
        {/* Left: Actions & Stats */}
        <div>
          <div className="card dashboard-actions" style={{ marginBottom: 32 }}>
            <h3 style={{ marginBottom: 18 }}>Quick Actions</h3>
            <div
              style={{
                display: "flex",
                gap: 18,
                flexWrap: "wrap",
                marginBottom: 10,
                justifyContent: "flex-start",
              }}
            >
              <Link className="btn" to="/challenges" style={{ minWidth: 170 }}>
                🏸 Find/Make Challenge
              </Link>
              <Link className="btn secondary" to="/tournaments" style={{ minWidth: 170 }}>
                🏆 Join Tournament
              </Link>
              <Link className="btn secondary" to="/booking" style={{ minWidth: 170 }}>
                📅 Book Court
              </Link>
              <Link className="btn secondary" to="/profile" style={{ minWidth: 170 }}>
                ✏️ Edit Profile
              </Link>
            </div>
          </div>
          <div className="card dashboard-stats" style={{ display: "flex", gap: 24, flexWrap: "wrap", justifyContent: "space-between" }}>
            <div className="stat-card" style={{ flex: "1 1 120px", minWidth: 120 }}>
              <span className="stat-icon">👥</span>
              <span className="stat-value">120+</span>
              <span className="stat-label">Active Players</span>
            </div>
            <div className="stat-card" style={{ flex: "1 1 120px", minWidth: 120 }}>
              <span className="stat-icon">🏆</span>
              <span className="stat-value">8</span>
              <span className="stat-label">Tournaments</span>
            </div>
            <div className="stat-card" style={{ flex: "1 1 120px", minWidth: 120 }}>
              <span className="stat-icon">⚔️</span>
              <span className="stat-value">200+</span>
              <span className="stat-label">Challenges</span>
            </div>
          </div>
          {/* Motivational Quote */}
          <div className="card dashboard-quote" style={{
            marginTop: 32,
            padding: "18px 22px",
            borderRadius: 12,
            background: "var(--bg-card)",
            boxShadow: "0 2px 12px rgba(108,99,255,0.07)",
            fontStyle: "italic",
            color: "var(--text-muted)",
            fontSize: "1.08rem",
            display: "flex",
            alignItems: "center",
            gap: 12
          }}>
            <span style={{ fontSize: "1.5rem" }}>💡</span>
            <span>{quote}</span>
          </div>
        </div>
        {/* Right: Leaderboard */}
        <div>
          <Leaderboard />
          {/* Add a small info card below leaderboard */}
          <div className="card dashboard-info" style={{
            marginTop: 28,
            padding: "14px 18px",
            borderRadius: 10,
            background: "var(--bg-card)",
            color: "var(--text-muted)",
            fontSize: "0.99rem",
            boxShadow: "0 2px 8px rgba(0,0,0,0.04)"
          }}>
            <span style={{ fontWeight: 600, color: "var(--text-link)" }}>Tip:</span> 
            Track your progress and climb the leaderboard by playing more matches and joining tournaments!
          </div>
        </div>
      </div>
      <style>{`
        .dashboard-grid {
          display: grid;
          grid-template-columns: 1.2fr 1fr;
          gap: 40px;
          align-items: flex-start;
        }
        .dashboard-actions {
          margin-bottom: 32px;
        }
        .dashboard-stats {
          margin-top: 0;
          margin-bottom: 0;
          background: var(--bg-card);
          border-radius: 14px;
          box-shadow: var(--shadow);
          padding: 18px 10px;
        }
        .stat-card {
          background: transparent;
          border: none;
          box-shadow: none;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 4px;
          padding: 0 8px;
        }
        .stat-icon {
          font-size: 2rem;
        }
        .stat-value {
          font-size: 1.3rem;
          font-weight: 700;
        }
        .stat-label {
          color: var(--text-muted);
          font-size: 0.98rem;
        }
        .dashboard-quote {
          animation: fadeInUp 0.7s both;
        }
        .dashboard-info {
          animation: fadeInUp 0.8s 0.2s both;
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px);}
          to { opacity: 1; transform: none;}
        }
        @media (max-width: 900px) {
          .dashboard-grid {
            grid-template-columns: 1fr;
            gap: 28px;
          }
          .dashboard-actions {
            margin-bottom: 20px;
          }
          .dashboard-stats {
            flex-direction: column;
            gap: 16px;
          }
        }
      `}</style>
    </div>
  );
}