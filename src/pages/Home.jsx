import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const SIDE_CARDS = [
  {
    title: "Did You Know?",
    content: "Badminton is the fastest racket sport! The shuttlecock can reach speeds over 400 km/h.",
    icon: "🚀",
  },
  {
    title: "Pro Tip",
    content: "Warm up and stretch before every match to prevent injuries.",
    icon: "💡",
  },
  {
    title: "Community",
    content: "Join our Discord to connect with campus players.",
    icon: "🗨️",
    link: { url: "https://discord.gg/", text: "Join Discord" }
  },
];

function getRandomSideCard() {
  return SIDE_CARDS[Math.floor(Math.random() * SIDE_CARDS.length)];
}

export default function Home() {
  const { user } = useAuth();
  const sideCard = getRandomSideCard();

  return (
    <div className="page home-landing" style={{ background: "var(--bg-main)" }}>
      {/* Banner Section with Badminton Image */}
      <div className="banner-section" style={{
        width: "100%",
        minHeight: 220,
        background: "linear-gradient(90deg, #eaf0ff 60%, #dbeaff 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        marginBottom: 32,
        overflow: "hidden"
      }}>
        {/* Badminton image */}
        <img
          src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80"
          alt="Badminton match"
          style={{
            height: "160px",
            borderRadius: "18px",
            boxShadow: "0 2px 16px rgba(91,140,255,0.13)",
            objectFit: "cover",
            marginRight: "32px"
          }}
        />
        <div style={{
          fontSize: "2.7rem",
          fontWeight: 800,
          color: "#3A6EEA",
          letterSpacing: "1px",
          textAlign: "left",
          zIndex: 2,
          fontFamily: "'Montserrat', 'Poppins', Arial, sans-serif"
        }}>
          Badminton Buddy
          <div style={{
            fontSize: "1.25rem",
            fontWeight: 500,
            color: "#222b45",
            marginTop: 12,
            opacity: 0.85
          }}>
            Find partners. Play matches. Join events.
          </div>
        </div>
        {/* Decorative shapes */}
        <div style={{
          position: "absolute",
          left: 40,
          bottom: 10,
          opacity: 0.13,
          fontSize: "7rem"
        }}>🏸</div>
        <div style={{
          position: "absolute",
          right: 40,
          top: 10,
          opacity: 0.13,
          fontSize: "7rem"
        }}>🏆</div>
      </div>

      {/* Main Content */}
      <div className="container home-main-flex"
        style={{
          display: "flex",
          gap: "32px",
          marginBottom: "32px",
        }}
      >
        {/* Left Side Card */}
        <div className="side-card" style={{
          flex: "0 0 240px",
          alignSelf: "stretch",
          background: "var(--bg-card)",
          borderRadius: 16,
          boxShadow: "0 2px 16px rgba(108,99,255,0.07)",
          padding: "28px 18px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          minHeight: "220px",
          animation: "fadeInUp 0.7s both"
        }}>
          <div style={{ fontSize: "2rem", marginBottom: 10 }}>{sideCard.icon}</div>
          <div style={{ fontWeight: 700, fontSize: "1.13rem", marginBottom: 8 }}>{sideCard.title}</div>
          <div style={{ color: "var(--text-muted)", marginBottom: sideCard.link ? 10 : 0 }}>{sideCard.content}</div>
          {sideCard.link && (
            <a href={sideCard.link.url} target="_blank" rel="noopener noreferrer" className="btn secondary" style={{ fontSize: "0.97rem", alignSelf: "flex-start" }}>
              {sideCard.link.text}
            </a>
          )}
        </div>
        {/* Hero Section */}
        <div className="card hero-card"
          style={{
            animation: "fadeInUp 0.8s both",
            padding: "32px 28px",
            minHeight: "220px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            background: "var(--bg-card)",
            borderRadius: 16,
            boxShadow: "0 2px 16px rgba(108,99,255,0.07)"
          }}
        >
          <h2 style={{
            fontSize: "1.7rem",
            fontWeight: 700,
            marginBottom: 12,
            color: "#3A6EEA",
            textAlign: "center"
          }}>
            Play. Connect. Compete.
          </h2>
          <div style={{ marginBottom: 18, color: "#222b45", fontSize: "1.08rem", textAlign: "center" }}>
            Join the campus badminton community. Track your progress and enjoy the game!
          </div>
          <div style={{ display: "flex", gap: 16, marginBottom: 10 }}>
            <Link
              to="/register"
              className="btn"
              style={{
                fontSize: "1.05rem",
                pointerEvents: user ? "none" : "auto",
                opacity: user ? 0.5 : 1,
                minWidth: 120,
              }}
              tabIndex={user ? -1 : 0}
              aria-disabled={user ? "true" : "false"}
            >
              Get Started
            </Link>
            <Link
              to="/login"
              className="btn secondary"
              style={{
                fontSize: "1.05rem",
                pointerEvents: user ? "none" : "auto",
                opacity: user ? 0.5 : 1,
                minWidth: 120,
              }}
              tabIndex={user ? -1 : 0}
              aria-disabled={user ? "true" : "false"}
            >
              Login
            </Link>
          </div>
          <div className="home-stats" style={{ display: "flex", gap: 24, marginTop: 10 }}>
            <div className="stat-card" style={{ animation: "fadeInUp 1s 0.2s both" }}>
              <span className="stat-icon">👥</span>
              <span className="stat-value">120+</span>
              <span className="stat-label">Players</span>
            </div>
            <div className="stat-card" style={{ animation: "fadeInUp 1s 0.3s both" }}>
              <span className="stat-icon">🏆</span>
              <span className="stat-value">8</span>
              <span className="stat-label">Tournaments</span>
            </div>
            <div className="stat-card" style={{ animation: "fadeInUp 1s 0.4s both" }}>
              <span className="stat-icon">⚔️</span>
              <span className="stat-value">200+</span>
              <span className="stat-label">Challenges</span>
            </div>
          </div>
        </div>
        {/* Right Side Card */}
        <div className="side-card" style={{
          flex: "0 0 240px",
          alignSelf: "stretch",
          background: "var(--bg-card)",
          borderRadius: 16,
          boxShadow: "0 2px 16px rgba(108,99,255,0.07)",
          padding: "28px 18px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          minHeight: "220px",
          animation: "fadeInUp 0.7s both"
        }}>
          <div style={{ fontSize: "2rem", marginBottom: 10 }}>🏸</div>
          <div style={{ fontWeight: 700, fontSize: "1.13rem", marginBottom: 8 }}>Welcome!</div>
          <div style={{ color: "var(--text-muted)" }}>
            Explore. Play. Enjoy. <br />
            <span style={{ color: "#3A6EEA", fontWeight: 600 }}>#PlayMore</span>
          </div>
        </div>
      </div>
      {/* Events Section */}
      <div className="events-section" style={{
        background: "var(--bg-card)",
        padding: "48px 0",
        marginBottom: 32
      }}>
        <div className="container" style={{ textAlign: "center" }}>
          <h2 style={{
            fontSize: "2rem",
            fontWeight: 700,
            marginBottom: 18,
            color: "#222b45"
          }}>Badminton Events Near You</h2>
          <div className="card" style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 18,
            padding: "32px 38px",
            borderRadius: 18,
            background: "#f7f9fc",
            boxShadow: "0 2px 12px rgba(108,99,255,0.07)",
            marginBottom: 10
          }}>
            <span style={{ fontSize: "2.2rem" }}>🏃‍♂️</span>
            <span style={{ fontSize: "1.08rem", color: "#222b45" }}>
              Coming Soon! Explore other badminton events to <b>#PlayYourOwnWay</b>
            </span>
            <Link to="/events" className="btn secondary" style={{ minWidth: 170 }}>
              See Badminton Events
            </Link>
          </div>
        </div>
      </div>
      {/* How it works section */}
      <div
        className="container"
        style={{
          marginTop: 32,
          marginBottom: 32,
          animation: "fadeInUp 1s 0.4s both",
        }}
      >
        <h2 className="section-title" style={{ textAlign: "center", marginBottom: 32 }}>How It Works</h2>
        <div className="grid grid-3" style={{ gap: 36 }}>
          <div className="card step-card" style={{ padding: "28px 20px" }}>
            <div className="step-icon" style={{ fontSize: "1.7rem", marginBottom: 10 }}>📝</div>
            <h4 style={{ marginBottom: 8 }}>Create Profile</h4>
            <p className="muted">Sign up and set your skill level.</p>
          </div>
          <div className="card step-card" style={{ padding: "28px 20px" }}>
            <div className="step-icon" style={{ fontSize: "1.7rem", marginBottom: 10 }}>🤝</div>
            <h4 style={{ marginBottom: 8 }}>Match & Challenge</h4>
            <p className="muted">Find partners, send challenges, book courts.</p>
          </div>
          <div className="card step-card" style={{ padding: "28px 20px" }}>
            <div className="step-icon" style={{ fontSize: "1.7rem", marginBottom: 10 }}>🏅</div>
            <h4 style={{ marginBottom: 8 }}>Play & Climb Ranks</h4>
            <p className="muted">Play matches, join tournaments, climb the leaderboard.</p>
          </div>
        </div>
      </div>
      {/* Animation keyframes and light mode improvements */}
      <style>{`
        :root {
          --bg-main: #f4f6fb;
          --bg-card: #f7f9fc;
          --text-link: #3A6EEA;
          --text-muted: #6b7a99;
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px);}
          to { opacity: 1; transform: none;}
        }
        .home-main-flex {
          width: 100%;
          max-width: 1400px;
          margin: 0 auto;
        }
        .side-card {
          min-width: 220px;
        }
        .home-main-grid {
          min-height: 220px;
        }
        .card {
          background: var(--bg-card);
        }
        @media (max-width: 1200px) {
          .home-main-flex {
            flex-direction: column;
            gap: 24px;
          }
          .side-card {
            min-width: unset;
            margin-bottom: 0;
          }
        }
        @media (max-width: 900px) {
          .home-main-grid {
            grid-template-columns: 1fr;
            gap: 32px;
            margin-top: 32px;
          }
          .home-main-flex {
            flex-direction: column;
            gap: 18px;
          }
        }
        @media (max-width: 600px) {
          .container {
            padding-left: 8px !important;
            padding-right: 8px !important;
          }
          .home-main-grid {
            gap: 18px;
          }
          .banner-section img {
            height: 100px !important;
            margin-right: 12px !important;
          }
        }
      `}</style>
    </div>
  );
}