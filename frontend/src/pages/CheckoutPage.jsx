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
    axios.get("payment-methods/")
      .then(res => {
        setPaymentMethods(res.data);
        if (res.data.length > 0) setSelectedPayment(res.data[0].id);
      })
      .catch(() => alert("Gagal memuat metode pembayaran"))
      .finally(() => setLoading(false));
  }, []);

  const handleRemoveItem = (productId) => {
    setCart(prevCart => prevCart.filter(item => item.id !== productId));
  };

  const handleCheckout = async (e) => {
    e.preventDefault();
    if (!selectedPayment) return alert("Pilih metode pembayaran terlebih dahulu!");

    try {
      const payload = {
        payment_method_id: selectedPayment,
        order_items: cart.map(item => ({
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

  const qrPayment = paymentMethods.find(pm => pm.id === Number(selectedPayment));

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-4">Checkout</h2>
      <div className="mb-4">
        <button
          className="flex items-center gap-2 text-[#fe019a] hover:underline font-semibold"
          type="button"
          onClick={() => navigate('/')}
        >
          <svg width="20" height="20" fill="none" viewBox="0 0 24 24">
            <path stroke="#fe019a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          Kembali ke Home
        </button>
      </div>
      {loading ? (
        <div>Memuat metode pembayaran...</div>
      ) : cart.length === 0 ? (
        <div>Keranjang kosong.</div>
      ) : (
        <form onSubmit={handleCheckout}>
          <ul className="mb-6">
            {cart.map((item) => (
              <li key={item.id} className="mb-1 flex items-center justify-between">
                <div>
                  {item.name} x {item.qty} @ Rp{item.price?.toLocaleString() || "-"}
                  <div className="text-xs text-gray-500">
                    Subtotal: <b>Rp{(item.qty * item.price).toLocaleString()}</b>
                  </div>
                </div>
                <button
                  type="button"
                  className="ml-4 px-3 py-1 rounded bg-red-500 text-white text-xs font-bold hover:bg-red-700 transition"
                  onClick={() => handleRemoveItem(item.id)}
                >
                  Hapus
                </button>
              </li>
            ))}
          </ul>

          <div className="mb-6">
            <label className="block mb-1 font-medium">Metode Pembayaran</label>
            <select
              className="w-full border rounded px-3 py-2"
              value={selectedPayment}
              onChange={e => setSelectedPayment(e.target.value)}
              required
            >
              <option value="" disabled>Pilih metode pembayaran</option>
              {paymentMethods.map(pm => (
                <option key={pm.id} value={pm.id}>{pm.name}</option>
              ))}
            </select>
          </div>

          {qrPayment && (
            <div className="mb-6 text-center">
              <div className="font-semibold mb-2">Scan QR untuk pembayaran</div>
              <img
                src={qrPayment.qr_image}
                alt="QR Code Pembayaran"
                className="w-52 h-52 mx-auto rounded shadow"
              />
              <div className="text-gray-500 mt-2">{qrPayment.description}</div>
            </div>
          )}

          <button
            type="submit"
            className="mt-4 px-6 py-2 rounded bg-[#fe019a] text-white"
            disabled={!selectedPayment}
          >
            Checkout & Bayar
          </button>
        </form>
      )}
    </div>
  );
}
