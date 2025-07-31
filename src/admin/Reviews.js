import React, { useEffect, useState } from "react";
import { collection, getDocs, updateDoc, deleteDoc, doc } from "firebase/firestore";
import { db } from "../firebase"; // Update path if your firebase.js is elsewhere

export default function Reviews() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);

  // Load reviews from Firestore on mount
  useEffect(() => {
    fetchAllReviews();
    // eslint-disable-next-line
  }, []);

  async function fetchAllReviews() {
    setLoading(true);
    const snap = await getDocs(collection(db, "reviews"));
    setReviews(snap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    setLoading(false);
  }

  // Change review status
  async function setStatus(id, newStatus) {
    const reviewRef = doc(db, "reviews", id);
    await updateDoc(reviewRef, { status: newStatus });
    setReviews(reviews =>
      reviews.map(r =>
        r.id === id ? { ...r, status: newStatus } : r
      )
    );
  }

  // Delete review
  async function handleDelete(id) {
    await deleteDoc(doc(db, "reviews", id));
    setReviews(reviews => reviews.filter(r => r.id !== id));
  }

  return (
    <div>
      <h2 className="text-xl font-bold mb-4 text-[#40652a]">Reviews Management</h2>
      <table className="w-full bg-[#eceadd] rounded-xl overflow-hidden shadow">
        <thead className="bg-[#a89168]/90 text-white">
          <tr>
            <th>Customer</th>
            <th>Rating</th>
            <th>Review</th>
            <th>Status</th>
            <th className="w-32"></th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan={5} className="text-center text-gray-400 py-5">Loading...</td>
            </tr>
          ) : (reviews||[]).length === 0 ? (
            <tr><td colSpan={5} className="text-gray-400 text-center py-5">No reviews.</td></tr>
          ) : (
            reviews.map((r) => (
              <tr key={r.id} className="border-t">
                <td>{r.name || "Anonymous"}</td>
                <td>{"★".repeat(Number(r.rating) || 5)}</td>
                <td>{r.text}</td>
                <td>
                  <select
                    className="rounded border"
                    value={r.status || "pending"}
                    onChange={e => setStatus(r.id, e.target.value)}
                  >
                    <option>approved</option>
                    <option>pending</option>
                    <option>hidden</option>
                  </select>
                </td>
                <td>
                  <button
                    className="text-red-600 hover:underline"
                    onClick={() => handleDelete(r.id)}
                  >Delete</button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
