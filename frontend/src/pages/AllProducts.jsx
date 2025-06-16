import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiShoppingCart } from "react-icons/fi";
import { useCart } from "../context/CartContext";
import ProductCard from "../ui/ProductCard";
import StickyCartButton from "../ui/StickyCartButton";


export default function AllProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showLoginAlert, setShowLoginAlert] = useState(false);
  const navigate = useNavigate();

  // Cart context
  const { cart, setCart } = useCart();

  // Login status & jumlah item cart
  const isLoggedIn = !!localStorage.getItem("token");
  const totalItems = cart.reduce((sum, item) => sum + (item.qty || 1), 0);

  useEffect(() => {
    fetch("http://localhost:8000/api/products/")
      .then(res => res.json())
      .then(data => {
        setProducts(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  // Add to cart handler (ikuti pola ShopHighlight)
  const handleAddToCart = (product) => {
    const token = localStorage.getItem("token");
    if (!token) {
      setShowLoginAlert(true);
      return;
    }
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

  return (
    <section className="py-16" style={{ backgroundColor: "#f9cee7" }}>
      <div className="container mx-auto px-4">
        {/* ===== Tombol Kembali ===== */}
<div className="mb-6 flex justify-start">
  <button
    className="
      group
      relative
      inline-flex items-center px-6 py-3
      rounded-2xl
      shadow-lg
      bg-gradient-to-r from-pink-100 via-pink-200 to-pink-100
      text-[#fe019a] font-extrabold text-lg
      overflow-hidden
      border-2 border-[#fe019a]/30
      focus:outline-none
      transition-all duration-300
      hover:animate-jelly
      active:scale-95
    "
    onClick={() => navigate(-1)}
    style={{ boxShadow: "0 6px 24px 0 rgba(254,1,154,.16)" }}
  >
    <span className="mr-3 flex items-center justify-center">
      <i
        className="
          ri-arrow-left-line
          text-2xl
          animate-swing
          group-hover:animate-swing2
          group-active:animate-bounce-short
        "
        style={{
          display: "inline-block"
        }}
      ></i>
    </span>
    <span className="relative z-10">Kembali</span>
    {/* Shine effect */}
    <span className="absolute left-0 top-0 w-full h-full pointer-events-none overflow-hidden rounded-2xl">
      <span className="absolute left-[-40%] top-0 w-[60%] h-full bg-white/30 blur-xl animate-shine"></span>
    </span>
  </button>
  {/* Animasi keyframes CSS */}
  <style>{`
    @keyframes jelly {
      0% { transform: scale(1,1);}
      15% { transform: scale(1.1,0.9);}
      25% { transform: scale(0.9,1.1);}
      40% { transform: scale(1.04,0.96);}
      50% { transform: scale(0.96,1.04);}
      65% { transform: scale(1.02,0.98);}
      75% { transform: scale(0.98,1.02);}
      100% { transform: scale(1,1);}
    }
    .hover\\:animate-jelly:hover {
      animation: jelly 0.8s cubic-bezier(.3,2.5,.5,1) 1;
    }

    @keyframes swing {
      0% { transform: rotate(0);}
      10% { transform: rotate(-16deg);}
      20% { transform: rotate(12deg);}
      30% { transform: rotate(-10deg);}
      40% { transform: rotate(6deg);}
      50% { transform: rotate(-4deg);}
      60% { transform: rotate(2deg);}
      100% { transform: rotate(0);}
    }
    .animate-swing {
      animation: swing 1.2s cubic-bezier(.36,1.5,.59,1) 1;
    }
    @keyframes swing2 {
      0% { transform: rotate(0);}
      50% { transform: rotate(-22deg);}
      70% { transform: rotate(15deg);}
      100% { transform: rotate(0);}
    }
    .group-hover\\:animate-swing2:hover .animate-swing,
    .animate-swing2 {
      animation: swing2 0.7s cubic-bezier(.36,1.5,.59,1) 1;
    }

    @keyframes bounce-short {
      0% { transform: translateY(0);}
      35% { transform: translateY(-6px);}
      50% { transform: translateY(3px);}
      70% { transform: translateY(-2px);}
      100% { transform: translateY(0);}
    }
    .group-active\\:animate-bounce-short:active .animate-swing,
    .animate-bounce-short {
      animation: bounce-short 0.32s cubic-bezier(.65,1.6,.56,1) 1;
    }

    @keyframes shine {
      0% { left: -60%; }
      100% { left: 120%; }
    }
    .animate-shine {
      animation: shine 2s cubic-bezier(.23,1,.32,1) infinite;
    }
  `}</style>
</div>


        {/* ===== Header modern (center, tapi tetap space for sticky cart) ===== */}
        <div className="flex flex-col sm:flex-row sm:justify-center sm:items-center mb-12">
<div className="text-center mx-auto mb-12">
  <h1
    className="
      text-4xl font-extrabold mb-3
      bg-gradient-to-r from-[#fe019a] via-[#ff5ea2] to-[#ffafcc]
      bg-clip-text text-transparent
      drop-shadow-lg
      animate-fade-in-up
    "
    style={{
      animation: "fadeInUp 1s cubic-bezier(0.23, 1, 0.32, 1)"
    }}
  >
    Semua Produk
  </h1>
  <p
    className="
      text-gray-700 max-w-2xl mx-auto text-lg font-medium
      animate-fade-in-up
    "
    style={{
      animation: "fadeInUp 1s 0.3s cubic-bezier(0.23, 1, 0.32, 1) both"
    }}
  >
    Pilih produk perawatan kuku favoritmu dari katalog lengkap kami!
  </p>
  {/* Tambahkan animasi keyframes di bawah */}
  <style>
    {`
      @keyframes fadeInUp {
        from {
          opacity: 0;
          transform: translateY(32px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }
      .animate-fade-in-up {
        animation: fadeInUp 1s cubic-bezier(0.23, 1, 0.32, 1) both;
      }
    `}
  </style>
</div>


          {/* Tombol cart sticky? Tidak di header, sticky di bawah. */}
        </div>
        {/* ===== Grid / Loading / Empty State ===== */}
        {loading ? (
          <div className="text-center py-12 text-gray-400">Loading produk...</div>
        ) : products.length === 0 ? (
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
          <div className="w-full flex justify-center items-start">
            <div
              className="
                grid gap-8
                w-full
                max-w-7xl
                grid-cols-1
                sm:grid-cols-2
                md:grid-cols-3
                lg:grid-cols-4
                items-stretch
              "
            >
              {products.map((product, idx) => (
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
      </div>

      {/* ===== STICKY/FLOATING CART BUTTON (POJOK BAWAH KANAN) ===== */}
      {isLoggedIn && (
  <StickyCartButton
    totalItems={totalItems}
    onClick={() => navigate('/checkout')}
  />
)}

    </section>
  );
}
