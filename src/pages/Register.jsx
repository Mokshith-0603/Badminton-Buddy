import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db } from "../firebase";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";

export default function Register() {
  const [name,setName]=useState(""); const [email,setEmail]=useState(""); const [password,setPassword]=useState("");
  const [err,setErr]=useState(""); const navigate = useNavigate();

  const submit = async(e)=>{
    e.preventDefault(); setErr("");
    try{
      const res = await createUserWithEmailAndPassword(auth,email,password);
      await updateProfile(res.user,{ displayName: name });
      await setDoc(doc(db,"users",res.user.uid),{
        uid: res.user.uid, name, email, skill:"Beginner", availability:"Evenings", rating: 1000, createdAt: serverTimestamp()
      },{ merge:true });
      navigate("/dashboard");
    }catch(e){ setErr(e.message); }
  };

  return (
    <div className="page">
      <div className="container" style={{maxWidth:460}}>
        <div className="card">
          <h3>Create account</h3>
          {err && <div className="error">{err}</div>}
          <form onSubmit={submit}>
            <div><label>Name</label><input required value={name} onChange={e=>setName(e.target.value)} /></div>
            <div><label>Email</label><input required type="email" value={email} onChange={e=>setEmail(e.target.value)} /></div>
            <div><label>Password</label><input required type="password" value={password} onChange={e=>setPassword(e.target.value)} /></div>
            <button className="btn" type="submit">Register</button>
          </form>
          <p className="muted">Have an account? <Link className="link" to="/login">Login</Link></p>
        </div>
      </div>
    </div>
  );
}
