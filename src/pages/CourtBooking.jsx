import { addDoc, collection, deleteDoc, doc, onSnapshot, query, serverTimestamp, where } from "firebase/firestore";
import { format } from "date-fns";
import { useEffect, useState } from "react";
import { db } from "../firebase";
import { useAuth } from "../context/AuthContext";

const SLOTS = ["07:00-08:00", "08:00-09:00", "17:00-18:00", "18:00-19:00", "19:00-20:00", "20:00-21:00"];

export default function CourtBooking() {
  const { user, profile } = useAuth();
  const [day, setDay] = useState(() => format(new Date(), "yyyy-MM-dd"));
  const [bookings, setBookings] = useState([]);
  const [myBooking, setMyBooking] = useState(null);

  useEffect(() => {
    const q = query(collection(db, "bookings"), where("date", "==", day));
    const unsub = onSnapshot(q, (snap) => {
      const allBookings = snap.docs.map(d => ({ id: d.id, ...d.data() }));
      setBookings(allBookings);
      setMyBooking(allBookings.find(b => b.userId === user.uid));
    });
    return () => unsub();
  }, [day, user.uid]);

  const isTaken = (slot) => bookings.some(b => b.slot === slot);
  const mySlot = (slot) => bookings.find(b => b.slot === slot && b.userId === user.uid);

  const book = async (slot) => {
    if (isTaken(slot) || myBooking) return;
    await addDoc(collection(db, "bookings"), {
      date: day,
      slot,
      userId: user.uid,
      by: profile?.name || profile?.email,
      createdAt: serverTimestamp()
    });
  };

  const unbook = async (slot) => {
    const booking = mySlot(slot);
    if (booking) {
      await deleteDoc(doc(db, "bookings", booking.id));
    }
  };

  return (
    <div className="page">
      <div className="container grid grid-2 court-booking-grid">
        <div className="card">
          <h3>Choose date</h3>
          <input type="date" value={day} onChange={e => setDay(e.target.value)} />
          <div className="spacer"></div>
          <div className="grid slot-list-grid">
            {SLOTS.map(s => {
              const taken = isTaken(s);
              const mine = mySlot(s);
              return (
                <div key={s} className="card slot-card" style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <div>
                    <strong>{s}</strong>
                    <div className="muted">{taken ? (mine ? "Booked by you" : "Booked") : "Available"}</div>
                  </div>
                  <div>
                    {!taken && !myBooking && (
                      <button className="btn" onClick={() => book(s)}>
                        Book
                      </button>
                    )}
                    {mine && (
                      <button className="btn danger" onClick={() => unbook(s)}>
                        Cancel
                      </button>
                    )}
                    {taken && !mine && (
                      <button className="btn secondary" disabled>
                        Taken
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
          {myBooking && (
            <div className="muted" style={{ marginTop: 12 }}>
              You have already booked <b>{myBooking.slot}</b> on this day.
            </div>
          )}
        </div>

        <div className="card">
          <h3>Bookings on {day}</h3>
          <table className="table">
            <thead><tr><th>Slot</th><th>By</th></tr></thead>
            <tbody>
              {bookings
                .sort((a, b) => SLOTS.indexOf(a.slot) - SLOTS.indexOf(b.slot))
                .map(b => (
                  <tr key={b.id}>
                    <td>{b.slot}</td>
                    <td>{b.by || b.userId}</td>
                  </tr>
                ))}
              {bookings.length === 0 && <tr><td colSpan="2" className="muted">No bookings yet.</td></tr>}
            </tbody>
          </table>
        </div>
      </div>
      <style>{`
        .court-booking-grid {
          gap: 48px;
          align-items: flex-start;
        }
        .slot-list-grid {
          gap: 18px;
        }
        .slot-card {
          min-width: 220px;
          padding: 14px 18px;
        }
        .btn.danger {
          background: #e74c3c;
          color: #fff;
          border: none;
        }
        .btn.danger:hover {
          background: #c0392b;
        }
        @media (max-width: 900px) {
          .court-booking-grid {
            grid-template-columns: 1fr;
            gap: 28px;
          }
        }
      `}</style>
    </div>
  );
}