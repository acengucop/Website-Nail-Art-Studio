import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext"; // ← tambahkan ini!
import ProductCard from "../ui/ProductCard"
const BADGE_LABELS = ["Promo", "Bestseller", "New", "Limited"];
import { motion } from "framer-motion";


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
  <motion.div
    key={product.id || idx}
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.25 }}
    transition={{ duration: 0.7, delay: idx * 0.09, ease: [0.36, 1, 0.32, 1] }}
    whileHover={{
      scale: 1.045,
      rotate: [-2, 2, -1, 1, 0],
      boxShadow: "0 10px 28px 0 rgba(254,1,154,0.10), 0 2px 4px 0 rgba(0,0,0,0.04)"
    }}
    className="h-full" // Pastikan card tetap stretching
  >
    <ProductCard
      product={product}
      onAddToCart={handleAddToCart}
    />
  </motion.div>
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
<div className="text-center mt-12">
      <Link
        to="/products"
        // 'group' memungkinkan kita untuk memicu animasi pada elemen anak saat parent di-hover
        // 'relative' & 'overflow-hidden' adalah kunci untuk animasi isian
        className="
          group 
          relative 
          inline-flex 
          items-center 
          justify-center 
          px-8 
          py-3 
          text-lg 
          font-semibold 
          text-pink-500 
          bg-transparent 
          border-2 
          border-pink-500 
          rounded-full 
          overflow-hidden 
          transition-all 
          duration-300 
          hover:shadow-lg 
          hover:shadow-pink-500/20
        "
      >
        {/* Lapisan Latar Belakang untuk Animasi Isian */}
        {/* - Posisinya absolut untuk menutupi seluruh tombol.
          - Awalnya memiliki lebar 0 (w-0) dan akan melebar menjadi 100% (group-hover:w-full) saat tombol di-hover.
          - Transisi yang halus (transition-all duration-300) menciptakan efek isian yang elegan.
        */}
        <span
          className="
            absolute 
            left-0 
            top-0 
            h-full 
            w-0 
            bg-pink-500 
            transition-all 
            duration-300 
            ease-in-out 
            group-hover:w-full
          "
        ></span>

        {/* Konten Tombol (Teks & Ikon) */}
        {/* - 'relative z-10' memastikan konten ini selalu berada di atas lapisan animasi latar belakang.
          - Warna teks akan berubah menjadi putih saat di-hover (group-hover:text-white).
        */}
        <span className="relative z-10 flex items-center group-hover:text-white transition-colors duration-300">
          <span>Lihat Semua Produk</span>
          {/* - Ikon panah akan bergeser ke kanan (group-hover:translate-x-1.5) saat tombol di-hover.
            - Ini memberikan isyarat visual untuk "melanjutkan" atau "melihat lebih lanjut".
          */}
          <i
            className="
              ri-arrow-right-line 
              ri-lg 
              ml-2 
              transition-transform 
              duration-300 
              ease-in-out 
              group-hover:translate-x-1.5
            "
          ></i>
        </span>
      </Link>
    </div>
        </div>
      </div>
    </section>
  );
}
