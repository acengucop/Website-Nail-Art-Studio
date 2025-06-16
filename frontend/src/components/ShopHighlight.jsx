import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext"; // ← tambahkan ini!
import ProductCard from "../ui/ProductCard"
const BADGE_LABELS = ["Promo", "Bestseller", "New", "Limited"];

export default function ShopHighlight() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [, setNow] = useState(Date.now());
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [showLoginAlert, setShowLoginAlert] = useState(false);

  // Pakai cart global
  const { cart, setCart } = useCart();

  // Tidak perlu useEffect load/simpan cart ke localStorage DI SINI,
  // karena itu sudah dihandle oleh context!

  // --- Promo countdown update setiap detik
  useEffect(() => {
    const interval = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(interval);
  }, []);

  // --- Optimasi Fetching: AbortController & error handling
  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);
    setError(null);

    fetch("http://localhost:8000/api/products/", { signal: controller.signal })
      .then(res => {
        if (!res.ok) throw new Error("Gagal memuat produk.");
        return res.json();
      })
      .then(data => {
        setProducts(data);
        setLoading(false);
      })
      .catch((err) => {
        if (err.name !== "AbortError") {
          setError(err.message || "Terjadi kesalahan saat mengambil produk.");
          setLoading(false);
        }
      });

    return () => controller.abort();
  }, []);

  // --- Proteksi Add To Cart
  const handleAddToCart = (product) => {
    const token = localStorage.getItem("token");
    if (!token) {
      setShowLoginAlert(true);
      return;
    }
    // logic add to cart dengan context
    if (product.stock > 0) {
      setCart((prev) => {
        const found = prev.find(item => item.id === product.id);
        if (found) {
          return prev.map(item =>
            item.id === product.id
              ? { ...item, qty: item.qty + 1 }
              : item
          );
        }
        return [...prev, { ...product, qty: 1 }];
      });
    }
  };

  // Ambil satu produk untuk setiap badge label utama
  const filteredProducts = BADGE_LABELS
    .map(label => products.find(p => p.badge_label === label))
    .filter(Boolean);

  // ====== RENDER UI ======
  return (
    <section className="py-16" style={{ backgroundColor: "#f9cee7" }}>
      <div className="container mx-auto px-4">
        {/* ===== TITLE & DESKRIPSI ===== */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-3">Produk Unggulan</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Temukan produk berkualitas untuk perawatan kuku di rumah
          </p>
        </div>
        {/* ===== LOADING / ERROR / EMPTY STATE / PRODUCT GRID ===== */}
        {loading ? (
          <div className="text-center py-12 text-gray-400">Loading produk...</div>
        ) : error ? (
          <div className="text-center py-12 text-red-500">
            {error}
          </div>
        ) : filteredProducts.length === 0 ? (
          // ===== EMPTY STATE =====
          <div className="col-span-3 flex flex-col items-center justify-center py-12">
            <img
              src="/svg_empty.svg"
              alt="Produk kosong"
              className="w-40 h-40 mb-4 opacity-80"
              loading="lazy"
            />
            <p className="text-gray-400 text-lg font-semibold mb-1">
              Tidak ada produk tersedia.
            </p>
            <span className="text-gray-500">
              Coba cek kembali beberapa saat lagi.
            </span>
          </div>
        ) : (
          // ===== GRID WRAPPER AGAR SELALU DI TENGAH =====
          <div className="w-full flex justify-center items-start">
            <div className={`
              grid gap-8
              w-full
              max-w-7xl
              grid-cols-1
              sm:grid-cols-2
              md:grid-cols-3
              lg:grid-cols-4
              items-stretch
            `}>
              {/* ===== MAP PRODUK KE ProductCard ===== */}
              {filteredProducts.map((product, idx) => (
                <ProductCard
                  key={product.id || idx}
                  product={product}
                  onAddToCart={handleAddToCart}
                />
              ))}
            </div>
          </div>
        )}

        {/* ===== MODAL/ALERT LOGIN ===== */}
        {showLoginAlert && (
          <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl shadow-xl p-6 text-center">
              <div className="text-lg font-semibold mb-3 text-[#fe019a]">Anda belum login</div>
              <div className="mb-5">Silakan login terlebih dahulu untuk menambahkan produk ke keranjang.</div>
              <button
                className="px-4 py-2 rounded bg-[#fe019a] text-white font-semibold mr-2"
                onClick={() => {
                  setShowLoginAlert(false);
                  navigate('/login');
                }}
              >
                Login
              </button>
              <button
                className="px-4 py-2 rounded bg-gray-200 text-gray-700 font-semibold"
                onClick={() => setShowLoginAlert(false)}
              >
                Batal
              </button>
            </div>
          </div>
        )}

        {/* ===== FOOTER: TOMBOL LIHAT SEMUA PRODUK ===== */}
        <div className="text-center mt-12">
          <Link
            to="/products"
            className="inline-flex items-center justify-center px-6 py-3 bg-white border-2 border-primary text-primary font-medium rounded-button hover:bg-primary/5 transition-all whitespace-nowrap"
          >
            <span>Lihat Semua Produk</span>
            <i className="ri-arrow-right-line ri-lg ml-2"></i>
          </Link>
        </div>
      </div>
    </section>
  );
}
