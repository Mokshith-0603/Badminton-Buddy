import { useState, useRef } from "react";
import { useAuth } from "../context/AuthContext";
import { db } from "../firebase";
import { doc, setDoc } from "firebase/firestore";

// You need to set up Firebase Storage for this to work:
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

export default function Profile() {
  const { user, profile, setProfile } = useAuth();
  const [name, setName] = useState(profile?.name || user?.displayName || "");
  const [skill, setSkill] = useState(profile?.skill || "Beginner");
  const [availability, setAvailability] = useState(profile?.availability || "Evenings");
  const [gender, setGender] = useState(profile?.gender || "");
  const [photo, setPhoto] = useState(profile?.photoURL || "");
  const [games, setGames] = useState(profile?.games || 0); // This should be set from backend/game logic
  const [saving, setSaving] = useState(false);
  const [ok, setOk] = useState("");
  const [uploading, setUploading] = useState(false);
  const fileInput = useRef();

  // Upload image to Firebase Storage
  const handlePhotoUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true);
    const storage = getStorage();
    const storageRef = ref(storage, `profile-pics/${user.uid}`);
    await uploadBytes(storageRef, file);
    const url = await getDownloadURL(storageRef);
    setPhoto(url);
    setUploading(false);
  };

  const save = async () => {
    setSaving(true); setOk("");
    const data = { name, skill, availability, gender, photoURL: photo };
    await setDoc(doc(db, "users", user.uid), data, { merge: true });
    setProfile(p => ({ ...p, ...data }));
    setSaving(false); setOk("Saved!");
  };

  return (
    <div className="page">
      <div className="container" style={{ maxWidth: 540 }}>
        <div className="card" style={{ padding: 28 }}>
          <h3>Your Profile</h3>
          <div className="muted" style={{ marginBottom: 10 }}>
            Manage your visibility for matchmaking and leaderboards.
          </div>
          <div className="profile-pic-section" style={{ display: "flex", alignItems: "center", gap: 18, marginBottom: 18 }}>
            <img
              src={photo || "https://api.dicebear.com/7.x/person/svg?seed=" + encodeURIComponent(name || "player")}
              alt="Profile"
              style={{
                width: 68, height: 68, borderRadius: "50%", objectFit: "cover", border: "2px solid var(--border-card)"
              }}
            />
            <div>
              <label style={{ fontWeight: 500 }}>Profile Picture</label>
              <input
                type="file"
                accept="image/*"
                ref={fileInput}
                style={{ display: "none" }}
                onChange={handlePhotoUpload}
              />
              <button
                className="btn secondary"
                type="button"
                onClick={() => fileInput.current.click()}
                disabled={uploading}
                style={{ marginTop: 6 }}
              >
                {uploading ? "Uploading..." : "Upload from device"}
              </button>
            </div>
          </div>
          <div className="grid" style={{ gap: 18 }}>
            <div>
              <label>Name</label>
              <input value={name} onChange={e => setName(e.target.value)} />
            </div>
            <div>
              <label>Gender</label>
              <select value={gender} onChange={e => setGender(e.target.value)}>
                <option value="">Prefer not to say</option>
                <option>Male</option>
                <option>Female</option>
                <option>Other</option>
              </select>
            </div>
            <div>
              <label>Skill</label>
              <select value={skill} onChange={e => setSkill(e.target.value)}>
                <option>Beginner</option>
                <option>Intermediate</option>
                <option>Advanced</option>
              </select>
            </div>
            <div>
              <label>Availability</label>
              <select value={availability} onChange={e => setAvailability(e.target.value)}>
                <option>Mornings</option>
                <option>Afternoons</option>
                <option>Evenings</option>
              </select>
            </div>
            <div>
              <label>Games Played</label>
              <input
                type="number"
                min={0}
                value={games}
                disabled
                style={{ width: 120, background: "#2223", color: "#888" }}
                title="This is automatically updated based on your matches"
              />
            </div>
          </div>
          <div className="spacer"></div>
          <button className="btn" onClick={save} disabled={saving}>
            {saving ? "Saving..." : "Save changes"}
          </button>
          {ok && <span style={{ marginLeft: 10 }} className="muted">{ok}</span>}
        </div>
      </div>
      <style>{`
        .profile-pic-section input[type="file"] {
          margin-top: 4px;
        }
        @media (max-width: 600px) {
          .profile-pic-section {
            flex-direction: column;
            align-items: flex-start;
            gap: 10px;
          }
        }
      `}</style>
    </div>
  );
}