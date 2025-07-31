import React, { useEffect, useRef, useState } from 'react';
import { collection, addDoc, getDocs, updateDoc, deleteDoc, doc } from "firebase/firestore";
import { db, storage } from '../firebase'; // adjust as needed
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({ image: "", title: "", label: "", quantity: "", price: "" });
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [fileUpload, setFileUpload] = useState(null);
  const [uploadingProgress, setUploadingProgress] = useState(0);
  const fileInput = useRef();

  useEffect(() => { fetchAllProducts(); }, []);

  async function fetchAllProducts() {
    setLoading(true);
    const snap = await getDocs(collection(db, "products"));
    setProducts(snap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    setLoading(false);
  }

  // Add or update product
  async function handleSubmit(e) {
    e.preventDefault();
    if (!form.title || !form.price) return;
    setLoading(true);

    let imageUrl = form.image ? form.image : "";

    // UPLOAD image file if present
    if (fileUpload) {
      try {
        const ext = fileUpload.name.split('.').pop();
        const safeName = form.title.replace(/[^a-z0-9]/gi, '_').toLowerCase();
        const storageRef = ref(storage, `products/${safeName}_${Date.now()}.${ext}`);
        // Progress bar using uploadBytesResumable:
        const uploadTask = uploadBytesResumable(storageRef, fileUpload);
        await new Promise((resolve, reject) => {
          uploadTask.on('state_changed',
            (snap) => {
              setUploadingProgress(Math.round((snap.bytesTransferred / snap.totalBytes) * 100));
            },
            (err) => reject(err),
            () => resolve() // done
          );
        });
        imageUrl = await getDownloadURL(storageRef);
      } catch (e) {
        alert("Image upload failed."); setLoading(false); setUploadingProgress(0); return;
      }
    }

    // Final data
    let data = {
      ...form,
      image: imageUrl,
      price: parseFloat(form.price),
    };

    try {
      if (editingId) {
        const productRef = doc(db, "products", editingId);
        await updateDoc(productRef, data);
      } else {
        await addDoc(collection(db, "products"), data);
      }
    } catch (e) {
      alert('Could not save product: ' + (e?.message || e)); setLoading(false); return;
    }
    setForm({ image: "", title: "", label: "", quantity: "", price: "" });
    setEditingId(null); setFileUpload(null); setUploadingProgress(0);
    if (fileInput.current) fileInput.current.value = "";
    await fetchAllProducts();
    setLoading(false);
  }

  function handleEdit(product) {
    setForm({
      image: product.image || "",
      title: product.title || "",
      label: product.label || "",
      quantity: product.quantity || "",
      price: product.price || "",
    });
    setEditingId(product.id);
    setFileUpload(null); setUploadingProgress(0);
    if (fileInput.current) fileInput.current.value = "";
  }

  async function handleDelete(id) {
    if (!window.confirm("Delete this product?")) return;
    setLoading(true);
    await deleteDoc(doc(db, "products", id));
    await fetchAllProducts();
    setLoading(false);
  }

  return (
    <div>
      <h2 className="text-xl font-bold mb-4 text-[#40652a]">Manage Products</h2>
      <form
        onSubmit={handleSubmit}
        className="flex flex-wrap gap-3 items-end mb-5 bg-white p-3 rounded shadow-lg"
        autoComplete="off"
      >
        {/* Image upload/paste section */}
        <div className="flex flex-col min-w-[120px]">
          <label className="text-xs font-semibold mb-1">Image (upload or paste a link)</label>
          <input
            type="file"
            accept="image/*"
            ref={fileInput}
            onChange={e => {
              setFileUpload(e.target.files?.[0] || null);
              setUploadingProgress(0);
              // If uploading a new file, clear the URL field to avoid doubly set images:
              if (e.target.files?.length) setForm(f => ({ ...f, image: "" }));
            }}
            disabled={loading}
            className="border rounded px-2 py-1 mb-1"
            style={{ minWidth: 130 }}
          />
          <input
            placeholder="or, paste Image URL"
            className="border rounded px-2 py-1"
            value={form.image}
            onChange={e => setForm(f => ({ ...f, image: e.target.value }))}
            disabled={loading}
          />
          {/* Progress bar if uploading */}
          {uploadingProgress > 0 && uploadingProgress < 100 && (
            <div style={{ background: '#eceadd', borderRadius: 4, overflow: "hidden", marginTop: 4 }}>
              <div style={{ width: uploadingProgress + "%", background: "#a89168", height: 6, transition: 'width 0.25s' }} />
            </div>
          )}
          {uploadingProgress === 100 && (
            <div style={{ color: "#37682c", fontSize: 12, marginTop: 3 }}>Upload complete!</div>
          )}
        </div>
        <input required placeholder="Name" className="border rounded px-2 py-1 flex-1" value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} disabled={loading} />
        <input placeholder="Quality Label" className="border rounded px-2 py-1" value={form.label} onChange={e => setForm(f => ({ ...f, label: e.target.value }))} disabled={loading} />
        <input placeholder="Quantity (250g, 1 Cone...)" className="border rounded px-2 py-1" value={form.quantity} onChange={e => setForm(f => ({ ...f, quantity: e.target.value }))} disabled={loading} />
        <input required type="number" min="1" placeholder="Price" className="border rounded px-2 py-1 w-24" value={form.price} onChange={e => setForm(f => ({ ...f, price: e.target.value }))} disabled={loading} />
        <button className="bg-[#40652a] text-white font-bold rounded px-5 py-1.5" disabled={loading}>
          {editingId ? "Update" : "Add"}
        </button>
        {editingId && (
          <button
            type="button"
            onClick={() => {
              setForm({ image: "", title: "", label: "", quantity: "", price: "" });
              setEditingId(null);
              setFileUpload(null); setUploadingProgress(0);
              if (fileInput.current) fileInput.current.value = "";
            }}
            className="bg-[#a89168] text-white font-bold rounded px-4 py-1.5"
            disabled={loading}
          >Cancel</button>
        )}
      </form>
      {/* Product List */}
      <div className="text-[#2e4d25]">
        <table className="w-full bg-[#eceadd] rounded-xl overflow-hidden shadow">
          <thead className="bg-[#a89168]/90 text-white">
            <tr>
              <th className="py-2">Image</th>
              <th>Name</th>
              <th>Label</th>
              <th>Quantity</th>
              <th>Price</th>
              <th className="w-24"></th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={6} className="text-center text-gray-400 py-5">Loading...</td>
              </tr>
            ) : products.length === 0 ? (
              <tr>
                <td colSpan={6} className="text-gray-400 text-center py-5">No products yet.</td>
              </tr>
            ) : (
              products.map((p) => (
                <tr key={p.id} className="border-t text-center">
                  <td>
                    {p.image ?
                      <img src={p.image} alt={p.title} className="w-12 h-12 object-cover mx-auto rounded" />
                      : <span className="text-gray-400">No image</span>
                    }
                  </td>
                  <td>{p.title}</td>
                  <td>{p.label}</td>
                  <td>{p.quantity}</td>
                  <td>₹{p.price}</td>
                  <td>
                    <button className="text-blue-700 hover:underline mr-3" onClick={() => handleEdit(p)} disabled={loading}>Edit</button>
                    <button className="text-red-600 hover:underline" onClick={() => handleDelete(p.id)} disabled={loading}>Delete</button>
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
