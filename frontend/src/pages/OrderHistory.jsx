import React, { useEffect, useState } from "react";

export default function OrderHistory() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) return;
    fetch("http://localhost:8000/api/orders/", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        if (res.status === 401) throw new Error("Unauthorized");
        return res.json();
      })
      .then((data) => {
        // DRF pagination or not
        if (Array.isArray(data)) setOrders(data);
        else if (Array.isArray(data.results)) setOrders(data.results);
        else setOrders([]);
      })
      .catch((err) => {
        if (err.message === "Unauthorized") {
          setOrders([]);
          localStorage.removeItem("token");
          window.location.href = "/login";
        }
      })
      .finally(() => setLoading(false));
  }, [token]);

  if (!token)
    return <div className="p-8">Silakan login untuk melihat pesanan Anda.</div>;
  if (loading) return <div className="p-8">Loading...</div>;

  // --- THEME COLORS & STYLES ---
  const statusStyles = {
    paid: "bg-green-100 text-green-700",
    waiting_confirm: "bg-yellow-100 text-yellow-700",
    pending: "bg-gray-200 text-gray-700",
    cancelled: "bg-red-100 text-red-700",
  };
  const statusText = {
    paid: "Paid",
    waiting_confirm: "Awaiting Confirmation",
    pending: "Pending Payment",
    cancelled: "Cancelled",
  };

  // --- Redesigned Loading State ---
  if (loading) return (
    <div className="min-h-screen bg-[#F9F5F6] flex flex-col items-center justify-center p-8">
        <div className="w-12 h-12 rounded-full border-4 border-[#FFD1DA] border-t-[#FBA1B7] animate-spin mb-4"></div>
        <span className="text-[#5D434C] font-medium text-lg">Loading History...</span>
    </div>
  );

  // --- Redesigned Auth/Login Required State ---
  if (!token) return (
    <div className="min-h-screen bg-[#F9F5F6] flex flex-col items-center justify-center text-center p-8 font-sans">
        <h2 className="text-3xl font-serif text-[#FBA1B7] mb-2">Please Login</h2>
        <p className="text-[#5D434C]">You need to be logged in to view your order history.</p>
    </div>
  );

  // --- Main Component Render ---
  return (
    <div className="min-h-screen bg-[#F9F5F6] p-4 sm:p-8 font-sans">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-4xl font-serif text-center text-[#FBA1B7] mb-8 animate-fade-in select-none">
          Order History
        </h2>
        
        {/* --- Redesigned Empty State --- */}
        {orders.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-center animate-fade-in">
                <svg className="w-20 h-20 text-[#FFD1DA] mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                </svg>
                <h3 className="text-2xl font-serif text-[#5D434C]">No Treatments Booked Yet</h3>
                <p className="text-md text-[#B38C9C] mt-1">Your past orders will appear here.</p>
            </div>
        ) : (
            <ul className="space-y-6">
              {/* --- Redesigned Order Cards --- */}
              {orders.map((order, index) => {
                const total = order.items
                  ? order.items.reduce((sum, item) => sum + ((item.product?.price || 0) * (item.qty || 0)), 0)
                  : 0;

                return (
                  <li
                    key={order.id}
                    className="bg-white/70 backdrop-blur-xl border border-white rounded-2xl shadow-lg shadow-[#FBA1B7]/10 p-6 transition-all duration-300 hover:shadow-xl hover:shadow-[#FBA1B7]/20 hover:-translate-y-1 animate-fade-in"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    {/* Card Header */}
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="font-bold text-lg text-[#5D434C]">Order #{order.id}</h3>
                        <p className="text-xs text-[#B38C9C]">
                            {order.created_at ? new Date(order.created_at).toLocaleString('id-ID', { dateStyle: 'medium', timeStyle: 'short' }) : ''}
                        </p>
                      </div>
                      <span className={`text-xs font-bold px-3 py-1 rounded-full capitalize ${statusStyles[order.payment_status] || statusStyles.pending}`}>
                        {statusText[order.payment_status] || order.payment_status}
                      </span>
                    </div>

                    {/* Items List */}
                    <div className="border-t border-b border-[#F9F5F6] py-4 my-4">
                      <ul className="space-y-3">
                        {order.items && order.items.length > 0 ? (
                          order.items.map((item) => (
                            <li key={item.id} className="flex justify-between items-center text-sm">
                              <div>
                                <span className="font-semibold text-[#5D434C]">{item.product?.name || "Product not found"}</span>
                                <span className="text-[#B38C9C]"> x {item.qty}</span>
                              </div>
                              <span className="font-medium text-[#5D434C]">Rp{(item.product?.price * item.qty).toLocaleString('id-ID')}</span>
                            </li>
                          ))
                        ) : (
                          <li className="text-sm text-[#B38C9C]"><em>No items in this order.</em></li>
                        )}
                      </ul>
                    </div>
                    
                    {/* Card Footer */}
                    <div className="flex justify-between items-center">
                        <div>
                        {order.payment_proof && (
                             <a href={order.payment_proof} target="_blank" rel="noopener noreferrer" className="group">
                                <span className="text-xs text-[#B38C9C] group-hover:text-[#FBA1B7] transition">View Payment Proof</span>
                                <img
                                    src={order.payment_proof}
                                    alt="Payment Proof"
                                    className="w-16 h-16 mt-1 rounded-lg shadow object-cover border-2 border-transparent group-hover:border-[#FFD1DA] transition"
                                />
                             </a>
                        )}
                        </div>
                        <div className="text-right">
                            <p className="text-sm text-[#B38C9C]">Total</p>
                            <p className="font-bold text-xl text-[#FBA1B7]">Rp{total.toLocaleString('id-ID')}</p>
                        </div>
                    </div>
                  </li>
                );
              })}
            </ul>
        )}
      </div>
       {/* --- Custom Animations & Fonts --- */}
       <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=Poppins:wght@400;500;600;700&display=swap');
        .font-serif { font-family: 'Playfair Display', serif; }
        .font-sans { font-family: 'Poppins', sans-serif; }
        .animate-fade-in {
          animation: fade-in 0.8s cubic-bezier(0.4, 0, 0.2, 1) both;
          opacity: 0;
        }
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(24px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
