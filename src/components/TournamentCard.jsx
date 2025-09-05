export default function TournamentCard({ t, onJoin }) {
  const date = t?.date ? new Date(t.date.seconds ? t.date.seconds * 1000 : t.date) : null;
  return (
    <div className="card">
      <h3>{t.name}</h3>
      <div className="muted">Type: {t.type} · Max Players: {t.maxPlayers}</div>
      {date && <div className="muted">Starts: {date.toDateString()}</div>}
      <div className="spacer"></div>
      <div>Registered: {t.players?.length || 0}</div>
      {onJoin && <button className="btn" onClick={onJoin}>Join</button>}
    </div>
  );
}
