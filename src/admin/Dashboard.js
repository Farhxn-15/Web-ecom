import React from 'react';
import { Routes, Route, Link, useLocation } from "react-router-dom";
import Products from './Products';
import Orders from './Orders';
import Reviews from './Reviews';
// import Users from './Users'; // Uncomment if you add Users tab

const SIDEBAR = [
  { path: "products", label: "Manage Products", icon: "🛍️" },
  { path: "orders", label: "Orders", icon: "📦" },
  { path: "reviews", label: "Reviews", icon: "⭐" },
  // { path: "users", label: "Users", icon: "👥" } // Optional
];

export default function Dashboard({ onLogout }) {
  const location = useLocation();
  // Helper: is tab active (matches full route/with trailing slash/support /edit etc)
  function tabActive(tabPath) {
    const l = location.pathname.replace(/\/+$/, ""); // strip trailing slashes
    // Matches /admin/products and /admin/products/anySubpage
    return l === `/admin/${tabPath}` || l.startsWith(`/admin/${tabPath}/`);
  }

  return (
    <div className="min-h-screen flex bg-[#f5f4f0]">
      {/* Sidebar */}
      <aside className="w-56 bg-gradient-to-b from-[#40652a] to-[#a89168] text-white flex flex-col min-h-screen shadow-md">
        <div className="font-bold text-2xl p-7 pb-5 text-center tracking-wider select-none">
          Admin Panel
        </div>
        <nav className="flex flex-col gap-1 text-lg flex-1">
          {SIDEBAR.map(tab => (
            <Link
              key={tab.path}
              to={`/admin/${tab.path}`}
              className={`flex items-center gap-2 px-8 py-2 rounded transition-all duration-150 focus:outline-none ${
                tabActive(tab.path)
                  ? "bg-[#a89168]/90 font-bold shadow"
                  : "hover:bg-[#2c4722]/30"
              }`}
              tabIndex={0}
              aria-current={tabActive(tab.path) ? "page" : undefined}
            >
              <span className="text-lg">{tab.icon}</span> {tab.label}
            </Link>
          ))}
        </nav>
        <button
          onClick={onLogout}
          className="mx-8 mb-7 mt-2 py-2 rounded text-[#a89168] bg-[#fffdf6] font-semibold hover:bg-[#e6ebd7] shadow transition-colors"
        >
          Logout
        </button>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-8 overflow-x-auto">
        <Routes>
          <Route path="products" element={<Products />} />
          <Route path="orders" element={<Orders />} />
          <Route path="reviews" element={<Reviews />} />
          {/* <Route path="users" element={<Users />} /> */}
          <Route path="*" element={
            <div className="text-gray-900 text-lg font-semibold pt-6">
              Welcome to <span className="text-[#40652a]">Admin Dashboard</span>
            </div>
          } />
        </Routes>
      </main>
    </div>
  );
}
