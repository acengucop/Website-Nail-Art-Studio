import React, { useEffect, useState } from "react";
import axios from "../utils/axios";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

export default function CheckoutPage() {
  const { cart, setCart } = useCart();
  const navigate = useNavigate();

  const [paymentMethods, setPaymentMethods] = useState([]);
  const [selectedPayment, setSelectedPayment] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("payment-methods/")
      .then((res) => {
        setPaymentMethods(res.data);
        if (res.data.length > 0) setSelectedPayment(res.data[0].id);
      })
      .catch(() => alert("Gagal memuat metode pembayaran"))
      .finally(() => setLoading(false));
  }, []);

  const handleRemoveItem = (productId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
  };

  const handleCheckout = async (e) => {
    e.preventDefault();
    if (!selectedPayment)
      return alert("Pilih metode pembayaran terlebih dahulu!");

    try {
      const payload = {
        payment_method_id: selectedPayment,
        order_items: cart.map((item) => ({
          product_id: item.id,
          qty: item.qty,
        })),
      };

      const response = await axios.post("orders/", payload);
      navigate(`/upload-proof/${response.data.id}`);
    } catch (err) {
      if (err.response?.status === 401) {
        alert("Login dulu untuk checkout!");
        navigate("/login");
      } else {
        alert(err?.response?.data?.detail || err.message || "Gagal checkout!");
      }
    }
  };

  const qrPayment = paymentMethods.find(
    (pm) => pm.id === Number(selectedPayment)
  );

  // COLORS
  // Primary: #FBA1B7 (soft pink)
  // Secondary: #FFD1DA (light pink)
  // Background: #F9F5F6 (very light pink/cream)

  return (
    <div className="min-h-screen bg-[#F9F5F6] flex flex-col items-center justify-center py-12 px-4 sm:px-6 font-sans">
      
      {/* --- Elegant Card Container --- */}
      <div className="w-full max-w-md rounded-3xl shadow-2xl shadow-[#FBA1B7]/20 bg-white/70 backdrop-blur-xl border border-white p-8 relative animate-fade-in">
        
        {/* --- Redesigned Back Button --- */}
        <button
          className="absolute left-5 top-5 h-10 w-10 flex items-center justify-center rounded-full bg-[#FFD1DA]/50 text-[#FBA1B7] hover:bg-[#FFD1DA] hover:scale-110 transition-all duration-300 group"
          type="button"
          onClick={() => navigate("/")}
          aria-label="Kembali ke beranda"
        >
          <svg
            width="22"
            height="22"
            fill="none"
            viewBox="0 0 24 24"
            className="transition-transform duration-300 group-hover:-translate-x-0.5"
          >
            <path
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>

        {/* --- Elegant Title --- */}
        <h2 className="text-4xl font-serif text-center text-[#FBA1B7] mb-8 select-none">
          Checkout
        </h2>

        {/* --- Loading and Empty States --- */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-16 animate-fade-in">
            <div className="w-12 h-12 rounded-full border-4 border-[#FFD1DA] border-t-[#FBA1B7] animate-spin mb-4"></div>
            <span className="text-[#5D434C] font-medium">Loading treatments...</span>
          </div>
        ) : cart.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-[#FBA1B7] animate-fade-in text-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="opacity-50 mb-4">
                <path d="M12.6 20.45c.3.3.3.8 0 1.1l-1.85 1.85c-.3.3-.8.3-1.1 0l-1.85-1.85c-.3-.3-.3-.8 0-1.1l7.4-7.4c.3-.3.8-.3 1.1 0l1.85 1.85c.3.3.3.8 0 1.1l-1.85 1.85c-.3.3-.8.3-1.1 0l-1.75-1.75"/>
                <path d="M18.5 2.35c.3.3.3.8 0 1.1l-1.85 1.85c-.3.3-.8.3-1.1 0l-1.85-1.85c-.3-.3-.3-.8 0-1.1L15.55.5c.3-.3.8-.3 1.1 0l1.85 1.85Z"/><path d="M21.5 5.35c.3.3.3.8 0 1.1l-1.85 1.85c-.3.3-.8.3-1.1 0l-1.85-1.85c-.3-.3-.3-.8 0-1.1L18.55 3.5c.3-.3.8-.3 1.1 0l1.85 1.85Z"/>
                <path d="m2 14 3-3 5 5-3 3-5-5Z"/><path d="m11 9 5-5"/>
            </svg>
            <div className="text-lg font-medium text-[#5D434C] mt-2">Your cart is empty.</div>
            <p className="text-sm text-[#B38C9C]">Find a treatment you'll love!</p>
          </div>
        ) : (
          <form onSubmit={handleCheckout} className="animate-fade-in-slow">
            {/* --- Redesigned Cart Item List --- */}
            <ul className="mb-8 space-y-4">
              {cart.map((item) => (
                <li
                  key={item.id}
                  className="bg-white/60 rounded-xl p-4 flex items-center justify-between transition-all duration-300 hover:shadow-lg hover:shadow-[#FFD1DA]/50 hover:-translate-y-1 animate-pop-in"
                  style={{ animationDelay: `${item.id * 100}ms` }}
                >
                  <div className="flex-grow">
                    <div className="font-semibold text-[#5D434C] text-base capitalize">
                      {item.name}
                    </div>
                    <div className="text-xs text-[#B38C9C] mt-1">
                      <span>Qty: {item.qty}</span> &bull; <span>@ Rp{item.price?.toLocaleString() || "-"}</span>
                    </div>
                     <div className="text-sm mt-2 font-bold text-[#FBA1B7]">
                        Rp{(item.qty * item.price).toLocaleString()}
                    </div>
                  </div>
                  <button
                    type="button"
                    className="ml-4 h-8 w-8 flex-shrink-0 flex items-center justify-center rounded-full bg-transparent text-[#FBA1B7]/50 hover:bg-[#FFD1DA]/50 hover:text-[#FBA1B7] transition-all duration-300"
                    onClick={() => handleRemoveItem(item.id)}
                    aria-label={`Remove ${item.name}`}
                  >
                    <svg width="20" height="20" fill="none" viewBox="0 0 24 24">
                      <path stroke="currentColor" strokeWidth="2" strokeLinecap="round" d="M18 6L6 18M6 6l12 12"/>
                    </svg>
                  </button>
                </li>
              ))}
            </ul>

            {/* --- Redesigned Payment Method Selector --- */}
            <div className="mb-8">
              <label className="block mb-2 font-semibold text-[#5D434C] text-sm" htmlFor="payment-method">
                Payment Method
              </label>
              <div className="relative">
                <select
                  id="payment-method"
                  className="w-full rounded-xl bg-white/80 border-2 border-[#FFD1DA] px-4 py-3 text-[#5D434C] font-medium focus:border-[#FBA1B7] focus:ring-2 focus:ring-[#FFD1DA] outline-none transition-all duration-200 appearance-none"
                  value={selectedPayment}
                  onChange={(e) => setSelectedPayment(e.target.value)}
                  required
                >
                  <option value="" disabled>Select a payment method</option>
                  {paymentMethods.map((pm) => (
                    <option key={pm.id} value={pm.id}>{pm.name}</option>
                  ))}
                </select>
                <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[#FBA1B7] transition-transform">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
                </span>
              </div>
            </div>

            {/* --- Redesigned QR Payment Display --- */}
            {qrPayment && (
              <div className="mb-10 text-center animate-pop-in">
                <div className="w-fit mx-auto p-3 rounded-2xl bg-gradient-to-br from-[#FFD1DA]/80 to-white/50 shadow-inner">
                  <img
                    src={qrPayment.qr_image}
                    alt="Payment QR Code"
                    className="w-48 h-48 object-cover mx-auto rounded-xl shadow-lg border-4 border-white"
                  />
                </div>
                 <p className="text-[#B38C9C] mt-4 text-xs max-w-xs mx-auto animate-fade-in-slow">
                    {qrPayment.description}
                </p>
              </div>
            )}

            {/* --- Redesigned Submit Button --- */}
            <button
              type="submit"
              className={`w-full py-4 rounded-xl font-bold text-lg text-white transition-all duration-300 ease-in-out shadow-lg
                bg-gradient-to-r from-[#FBA1B7] to-[#fec1d0]
                hover:shadow-xl hover:shadow-[#FBA1B7]/40 hover:-translate-y-1
                focus:outline-none focus:ring-4 focus:ring-[#FFD1DA]
                active:scale-[0.98]
                ${!selectedPayment ? "opacity-50 cursor-not-allowed" : "hover:from-[#f88fab] hover:to-[#FBA1B7]"}`}
              disabled={!selectedPayment}
            >
              Confirm & Pay
            </button>
          </form>
        )}
      </div>

      {/* --- Custom CSS Animations (Preserved and Enhanced) --- */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=Poppins:wght@400;500;600&display=swap');
        .font-serif { font-family: 'Playfair Display', serif; }
        .font-sans { font-family: 'Poppins', sans-serif; }
        .animate-fade-in {
          animation: fade-in 0.7s cubic-bezier(0.4, 0, 0.2, 1) both;
        }
        .animate-fade-in-slow {
          animation: fade-in 1.2s cubic-bezier(0.4, 0, 0.2, 1) both;
        }
        .animate-pop-in {
          animation: pop-in 0.6s cubic-bezier(0.25, 1, 0.5, 1.25) both;
          opacity: 0;
        }
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes pop-in {
          from { opacity: 0; transform: scale(0.95) translateY(10px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
      `}</style>
    </div>
  );
}
