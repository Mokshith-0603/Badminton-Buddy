import { addDoc, arrayUnion, collection, doc, onSnapshot, orderBy, query, serverTimestamp, Timestamp, updateDoc } from "firebase/firestore";
import { useEffect, useMemo, useState } from "react";
import { db } from "../firebase";
import { useAuth } from "../context/AuthContext";

function makePairs(ids){
  const shuffled = [...ids].sort(()=>Math.random()-0.5);
  const pairs = [];
  for(let i=0;i<shuffled.length;i+=2){
    const a = shuffled[i], b = shuffled[i+1] ?? null;
    pairs.push([a,b]);
  }
  return pairs;
}

export default function Tournaments(){
  const { user, profile } = useAuth();
  const [list,setList]=useState([]);
  const [name,setName]=useState("Campus Open");
  const [type,setType]=useState("Singles");
  const [maxPlayers,setMaxPlayers]=useState(8);
  const [date,setDate]=useState("");

  useEffect(()=>{
    const q = query(collection(db,"tournaments"), orderBy("createdAt","desc"));
    const unsub = onSnapshot(q,(snap)=>{
      setList(snap.docs.map(d=>({id:d.id,...d.data()})));
    });
    return ()=>unsub();
  },[]);

  const create = async()=>{
    const when = date ? new Date(date).getTime() : Date.now();
    await addDoc(collection(db,"tournaments"),{
      name, type, maxPlayers: Number(maxPlayers),
      date: Timestamp.fromMillis(when),
      players: [],
      owner: user.uid,
      createdAt: serverTimestamp(),
      bracket: [] // will fill when full or started
    });
  };

  const join = async(t)=>{
    if ((t.players?.length||0) >= t.maxPlayers) return alert("Tournament full");
    await updateDoc(doc(db,"tournaments",t.id), { players: arrayUnion(user.uid) });
  };

  const start = async(t)=>{
    if ((t.players?.length||0) < 2) return alert("Need at least 2 players");
    const pairs = makePairs(t.players);
    await updateDoc(doc(db,"tournaments",t.id), { bracket: pairs });
  };

  return (
    <div className="page">
      <div className="container grid grid-2">
        <div className="card">
          <h3>Create tournament</h3>
          <div className="grid">
            <div><label>Name</label><input value={name} onChange={e=>setName(e.target.value)} /></div>
            <div><label>Type</label>
              <select value={type} onChange={e=>setType(e.target.value)}>
                <option>Singles</option><option>Doubles</option>
              </select>
            </div>
            <div><label>Max Players</label><input type="number" min="2" step="2" value={maxPlayers} onChange={e=>setMaxPlayers(e.target.value)} /></div>
            <div><label>Start date</label><input type="date" value={date} onChange={e=>setDate(e.target.value)} /></div>
          </div>
          <div className="spacer"></div>
          <button className="btn" onClick={create}>Create</button>
        </div>

        <div className="card">
          <h3>All tournaments</h3>
          <table className="table">
            <thead><tr><th>Name</th><th>Type</th><th>Players</th><th>Actions</th></tr></thead>
            <tbody>
              {list.map(t=>(
                <tr key={t.id}>
                  <td>{t.name}</td>
                  <td>{t.type}</td>
                  <td>{(t.players?.length||0)}/{t.maxPlayers}</td>
                  <td style={{display:"flex", gap:8}}>
                    <button className="btn secondary" onClick={()=>join(t)}>Join</button>
                    {t.owner===profile?.uid || t.owner===user?.uid ? (
                      <button className="btn" onClick={()=>start(t)}>Start (generate bracket)</button>
                    ) : null}
                  </td>
                </tr>
              ))}
              {list.length===0 && <tr><td colSpan="4" className="muted">No tournaments yet.</td></tr>}
            </tbody>
          </table>
        </div>

        <div className="card">
          <h3>Brackets (pairs)</h3>
          {list.filter(t=>t.bracket && t.bracket.length>0).length===0 && <div className="muted">Start a tournament to see pairs.</div>}
          <div className="grid grid-3">
            {list.filter(t=>t.bracket && t.bracket.length>0).map(t=>(
              <div key={t.id} className="card">
                <strong>{t.name}</strong>
                <ul>
                  {t.bracket.map((pair, idx)=>(
                    <li key={idx}>Match {idx+1}: {pair[0] ?? "TBD"} vs {pair[1] ?? "BYE"}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
