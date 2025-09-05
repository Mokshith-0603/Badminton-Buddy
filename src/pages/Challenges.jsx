import { addDoc, collection, onSnapshot, orderBy, query, serverTimestamp } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firebase";
import { useAuth } from "../context/AuthContext";

export default function Challenges() {
  const { user, profile } = useAuth();
  const [list, setList] = useState([]);
  const [skill, setSkill] = useState(profile?.skill || "Any");
  const [type, setType] = useState("1v1");
  const [when, setWhen] = useState("This Week");
  const [creating, setCreating] = useState(false);
  const [note, setNote] = useState("");
  const [search, setSearch] = useState("");
  const [filterSkill, setFilterSkill] = useState("All");

  useEffect(() => {
    const base = query(collection(db, "challenges"), orderBy("createdAt", "desc"));
    const unsub = onSnapshot(base, (snap) => {
      setList(snap.docs.map(d => ({ id: d.id, ...d.data() })));
    });
    return () => unsub();
  }, []);

  const create = async () => {
    setCreating(true); setNote("");
    await addDoc(collection(db, "challenges"), {
      owner: user.uid,
      ownerName: profile?.name || user.email,
      type,
      preferredSkill: skill === "Any" ? null : skill,
      window: when,
      status: "open",
      participants: [user.uid],
      createdAt: serverTimestamp()
    });
    setCreating(false); setNote("Challenge created!");
  };

  const join = async (ch) => {
    alert(`Contact ${ch.ownerName} on campus to coordinate! (Replace this with arrayUnion in a transaction in production)`);
  };

  // Filtering logic for search and skill
  const filteredList = list
    .filter(c => c.status === "open")
    .filter(c =>
      (!search || c.ownerName.toLowerCase().includes(search.toLowerCase())) &&
      (filterSkill === "All" || (c.preferredSkill || "Any") === filterSkill)
    );

  return (
    <div className="page">
      <div className="container challenges-grid">
        {/* Create Challenge */}
        <div className="card challenge-create-card">
          <h3>Create a challenge</h3>
          <div className="field-row" style={{ gap: 18 }}>
            <div>
              <label>Type</label>
              <select value={type} onChange={e => setType(e.target.value)}>
                <option value="1v1">1v1 Singles</option>
                <option value="2v2">2v2 Doubles</option>
              </select>
            </div>
            <div>
              <label>Preferred Skill</label>
              <select value={skill} onChange={e => setSkill(e.target.value)}>
                <option>Any</option><option>Beginner</option><option>Intermediate</option><option>Advanced</option>
              </select>
            </div>
          </div>
          <div style={{ marginTop: 12 }}>
            <label>Time Window</label>
            <select value={when} onChange={e => setWhen(e.target.value)}>
              <option>This Week</option><option>Weekend</option><option>Next Week</option>
            </select>
          </div>
          <button className="btn" onClick={create} disabled={creating} style={{ marginTop: 18, minWidth: 160 }}>
            {creating ? "Creating..." : "Create Challenge"}
          </button>
          {note && <span style={{ marginLeft: 10 }} className="muted">{note}</span>}
        </div>

        {/* Open Challenges */}
        <div className="card challenge-list-card">
          <h3>Open challenges</h3>
          <div className="challenge-filters" style={{ display: "flex", gap: 12, marginBottom: 12, flexWrap: "wrap" }}>
            <input
              type="text"
              placeholder="Search by owner..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              style={{ padding: "6px 10px", borderRadius: 8, border: "1px solid var(--border-card)", minWidth: 140 }}
            />
            <select value={filterSkill} onChange={e => setFilterSkill(e.target.value)} style={{ borderRadius: 8 }}>
              <option value="All">All Skills</option>
              <option value="Any">Any</option>
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
            </select>
          </div>
          <table className="table">
            <thead>
              <tr>
                <th>Owner</th>
                <th>Type</th>
                <th>Pref. Skill</th>
                <th>Window</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {filteredList.map(c => (
                <tr key={c.id}>
                  <td>{c.ownerName}</td>
                  <td>{c.type}</td>
                  <td>{c.preferredSkill || "Any"}</td>
                  <td>{c.window}</td>
                  <td>
                    <button className="btn secondary" onClick={() => join(c)}>Join</button>
                  </td>
                </tr>
              ))}
              {filteredList.length === 0 && (
                <tr>
                  <td colSpan="5" className="muted">No open challenges found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      <style>{`
        .challenges-grid {
          display: grid;
          grid-template-columns: 1.1fr 1fr;
          gap: 48px;
          align-items: flex-start;
          margin-top: 32px;
        }
        .challenge-create-card, .challenge-list-card {
          min-width: 320px;
          padding-bottom: 28px;
        }
        .challenge-create-card {
          margin-bottom: 0;
        }
        .field-row {
          display: flex;
          gap: 18px;
          margin-bottom: 10px;
        }
        @media (max-width: 900px) {
          .challenges-grid {
            grid-template-columns: 1fr;
            gap: 28px;
          }
          .challenge-create-card, .challenge-list-card {
            min-width: 0;
          }
        }
      `}</style>
    </div>
  );
}