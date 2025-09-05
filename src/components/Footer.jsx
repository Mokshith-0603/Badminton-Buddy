export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-main">
        <div className="footer-left">
          <span>© {new Date().getFullYear()} Badminton Buddy. All rights reserved.</span>
        </div>
        <div className="footer-right">
          <a href="mailto:support@badmintonbuddy.com" className="footer-link" title="Email">
            <span style={{ fontSize: "1.15em", verticalAlign: "middle", marginRight: 4 }}>📧</span>
            support@badmintonbuddy.com
          </a>
          <span className="footer-sep">|</span>
          <a href="https://github.com/your-repo" className="footer-link" target="_blank" rel="noopener noreferrer" title="GitHub">
            <span style={{ fontSize: "1.15em", verticalAlign: "middle", marginRight: 4 }}>🐙</span>
            GitHub
          </a>
          <span className="footer-sep">|</span>
          <a href="tel:+911234567890" className="footer-link" title="Phone">
            <span style={{ fontSize: "1.15em", verticalAlign: "middle", marginRight: 4 }}>📞</span>
            +91 12345 67890
          </a>
        </div>
      </div>
      <style>{`
        .footer {
          width: 100%;
          background: var(--bg-navbar, #f8f9fb);
          color: var(--text-muted, #888);
          font-size: 1rem;
          border-top: 1px solid var(--border-navbar, #e5e7eb);
          position: fixed;
          left: 0;
          bottom: 0;
          z-index: 100;
          min-height: 48px;
        }
        .footer-main {
          max-width: 1200px;
          margin: 0 auto;
          padding: 10px 24px 8px 24px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
        }
        .footer-left {
          font-size: 0.98rem;
        }
        .footer-right {
          display: flex;
          align-items: center;
          gap: 10px;
          flex-wrap: wrap;
        }
        .footer-link {
          color: #6c63ff;
          text-decoration: none;
          font-weight: 500;
          display: inline-flex;
          align-items: center;
          transition: color 0.2s;
        }
        .footer-link:hover {
          color: #4834d4;
          text-decoration: underline;
        }
        .footer-sep {
          color: #bbb;
          margin: 0 6px;
        }
        @media (max-width: 700px) {
          .footer-main {
            flex-direction: column;
            align-items: flex-start;
            gap: 6px;
            padding: 10px 10px 8px 10px;
          }
          .footer-right {
            gap: 8px;
          }
        }
        body {
          padding-bottom: 56px; /* Prevent content from being hidden behind the footer */
        }
      `}</style>
    </footer>
  );
}