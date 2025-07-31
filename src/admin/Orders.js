import React, { useEffect, useState } from "react";
import { collection, getDocs, doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase"; // adjust path as needed

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  // Load all orders from Firestore on mount
  useEffect(() => {
    fetchOrders();
    // eslint-disable-next-line
  }, []);

  async function fetchOrders() {
    setLoading(true);
    try {
      const snap = await getDocs(collection(db, "orders"));
      setOrders(snap.docs.map(doc => ({ ...doc.data(), id: doc.id })));
    } catch (e) {
      setOrders([]);
    }
    setLoading(false);
  }

  // Change payment status
  async function setStatus(orderId, newStatus) {
    const orderRef = doc(db, "orders", orderId);
    await updateDoc(orderRef, { paymentStatus: newStatus });
    // Update local copy
    setOrders(orders =>
      orders.map(o =>
        o.id === orderId ? { ...o, paymentStatus: newStatus } : o
      )
    );
  }

  return (
    <div>
      <h2 className="text-xl font-bold mb-4 text-[#40652a]">Orders</h2>
      <div className="overflow-x-auto">
        <table className="w-full bg-[#eceadd] rounded-xl overflow-hidden shadow text-xs md:text-base">
          <thead className="bg-[#a89168]/90 text-white">
            <tr>
              <th>Customer</th>
              <th>Items</th>
              <th>Total</th>
              <th>Address</th>
              <th>Contact</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={6} className="text-center text-gray-400 py-5">Loading...</td>
              </tr>
            ) : orders.length === 0 ? (
              <tr><td colSpan={6} className="text-gray-400 text-center py-5">No orders yet.</td></tr>
            ) : (
              orders.map((o, i) => (
                <tr key={o.id || i} className="border-t text-center">
                  <td>
                    <div>{o.name}</div>
                    <div className="text-xs text-gray-600 break-all">{o.email}</div>
                  </td>
                  <td>
                    {(o.cart||[]).map(item =>
                      <div key={item.id}>
                        {item.title || item.name} x {item.qty}
                      </div>
                    )}
                  </td>
                  <td className="font-bold">₹{o.total || ((o.cart||[]).reduce((sum, item) => sum + (item.price||0)*(item.qty||1),0))}</td>
                  <td>
                    {o.address}<br />
                    <span className="text-xs">{o.pincode}</span>
                  </td>
                  <td>
                    <div>{o.phone}</div>
                  </td>
                  <td>
                    <select
                      className="rounded border"
                      value={o.paymentStatus || "Pending"}
                      onChange={e => setStatus(o.id, e.target.value)}
                    >
                      <option>Paid</option>
                      <option>Pending</option>
                      <option>COD</option>
                    </select>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
