export default function PlayerCard({ user, action }) {
  return (
    <div className="card">
      <h3>{user.name || user.email}</h3>
      <div className="muted">Skill: {user.skill} · Availability: {user.availability}</div>
      {action}
    </div>
  );
}
