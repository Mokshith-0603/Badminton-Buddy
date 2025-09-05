import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firebase";

export default function Leaderboard() {
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    const q = query(collection(db, "users"), orderBy("rating", "desc"));
    const unsub = onSnapshot(q, (snap) => {
      setPlayers(snap.docs.map(d => ({ id: d.id, ...d.data() })));
    });
    return () => unsub();
  }, []);

  return (
    <div className="card">
      <h3>Leaderboard</h3>
      <table className="table">
        <thead><tr><th>#</th><th>Name</th><th>Skill</th><th>Rating</th></tr></thead>
        <tbody>
          {players.map((p, i) => (
            <tr key={p.id}>
              <td>{i+1}</td><td>{p.name || p.email}</td><td><span className="badge">{p.skill}</span></td><td>{p.rating ?? 1000}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
