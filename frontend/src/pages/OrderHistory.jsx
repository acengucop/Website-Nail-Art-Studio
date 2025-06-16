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

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Riwayat Pesanan</h2>
      {orders.length === 0 ? (
        <div>Belum ada pesanan.</div>
      ) : (
        <ul>
          {orders.map((order) => {
            // Hitung total order
            const total = order.items
              ? order.items.reduce(
                  (sum, item) =>
                    sum +
                    ((item.product?.price || 0) * (item.qty || 0)),
                  0
                )
              : 0;

            return (
              <li
                key={order.id}
                className="mb-8 p-5 border rounded-lg shadow bg-white"
              >
                {/* Header Order */}
                <div className="flex justify-between items-center mb-1">
                  <span className="font-semibold text-lg">
                    Order #{order.id}
                  </span>
                  <span
                    className={`text-xs px-2 py-1 rounded ${
                      order.payment_status === "paid"
                        ? "bg-green-100 text-green-700"
                        : order.payment_status === "waiting_confirm"
                        ? "bg-yellow-100 text-yellow-700"
                        : order.payment_status === "pending"
                        ? "bg-gray-100 text-gray-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {
                      {
                        pending: "Menunggu Pembayaran",
                        waiting_confirm: "Menunggu Konfirmasi",
                        paid: "Lunas",
                        cancelled: "Dibatalkan",
                      }[order.payment_status] || order.payment_status
                    }
                  </span>
                </div>
                <div className="text-sm text-gray-500 mb-2">
                  {order.created_at &&
                    new Date(order.created_at).toLocaleString()}
                </div>

                {/* Payment Method */}
                <div className="mb-2">
                  Metode:{" "}
                  <b>{order.payment_method?.name || "-"}</b>
                </div>

                {/* Daftar Item */}
                <ul className="ml-6 list-disc mb-3">
                  {order.items && order.items.length > 0 ? (
                    order.items.map((item) => (
                      <li key={item.id} className="mb-1">
                        <span className="font-medium">
                          {item.product?.name || "Produk tidak ditemukan"}
                        </span>
                        {" x "}
                        <span>{item.qty}</span>
                        {" "}
                        <span className="text-gray-600 text-sm">
                          @ Rp{item.product?.price?.toLocaleString() || "0"}
                        </span>
                        <br />
                        <span className="text-gray-500 text-xs">
                          Subtotal:{" "}
                          <b>
                            Rp
                            {(item.product?.price && item.qty
                              ? (item.product.price * item.qty).toLocaleString()
                              : "0")}
                          </b>
                        </span>
                      </li>
                    ))
                  ) : (
                    <li>
                      <em>Tidak ada item</em>
                    </li>
                  )}
                </ul>

                {/* Total */}
                <div className="text-right font-bold text-lg mt-3">
                  Total: Rp{total.toLocaleString()}
                </div>

                {/* Bukti Bayar */}
                {order.payment_proof && (
                  <div className="mt-3">
                    <span className="text-xs text-gray-400">Bukti bayar:</span>
                    <br />
                    <a
                      href={order.payment_proof}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <img
                        src={order.payment_proof}
                        alt="Bukti Pembayaran"
                        className="w-32 mt-1 rounded shadow inline-block"
                        style={{ maxHeight: 120, objectFit: "contain" }}
                      />
                    </a>
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
