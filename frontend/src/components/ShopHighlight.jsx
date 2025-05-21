import React, { useEffect, useState } from "react";

// ===== HELPER: Format Harga ke Rupiah =====
function formatRupiah(num) {
  if (!num) return "";
  return "Rp " + Number(num).toLocaleString("id-ID");
}

// ===== HELPER: Hitung Waktu Tersisa Promo =====
function getPromoCountdown(endDate) {
  if (!endDate) return "";
  const end = new Date(endDate);
  const now = new Date();
  const diff = end - now;
  if (diff <= 0) return "Promo telah berakhir";
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);
  return `${days > 0 ? days + " hari " : ""}${hours} jam ${minutes} menit ${seconds} detik`;
}

export default function ShopHighlight() {
  // ===== STATE =====
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cart, setCart] = useState([]);
  const [, setNow] = useState(Date.now()); // Untuk update realtime countdown

  // ===== TIMER: Update Countdown Setiap Detik =====
  useEffect(() => {
    const interval = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(interval);
  }, []);

  // ===== FETCH DATA PRODUK =====
  useEffect(() => {
    fetch("http://localhost:8000/api/products/")
      .then(res => res.json())
      .then(data => {
        setProducts(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  // ===== HANDLER: Tambah Produk ke Cart =====
  const handleAddToCart = (product) => {
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

  // ====== RENDER UI ======
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        {/* ===== TITLE & DESKRIPSI ===== */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-3">Produk Unggulan</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Temukan produk berkualitas untuk perawatan kuku di rumah
          </p>
        </div>

        {/* ===== CART BADGE / KERANJANG ===== */}
{/* ===== CART BADGE / KERANJANG ===== */}
<div className="fixed top-8 right-8 z-50 ">
  <button
    className="relative bg-primary text-white rounded-full w-12 h-12 flex items-center justify-center shadow-lg"
    aria-label="Buka keranjang belanja"
  >
    <img
      src="online-shop.gif"
      alt="Keranjang Belanja"
      className="w-9 h-9 object-contain"
      draggable={false}
    />
    {cart.length > 0 && (
      <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full px-2 py-0.5 font-bold">
        {cart.reduce((sum, item) => sum + item.qty, 0)}
      </span>
    )}
  </button>
</div>


        {/* ===== LOADING / EMPTY STATE / PRODUCT GRID ===== */}
        {loading ? (
          <div className="text-center py-12 text-gray-400">Loading produk...</div>
        ) : (
          products.length === 0 ? (
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
            <div className="flex justify-center items-start col-span-full">
              <div className={`grid gap-8 w-full ${
                products.length === 1 
                  ? 'grid-cols-1 max-w-md' 
                  : products.length === 2 
                    ? 'grid-cols-1 md:grid-cols-2 max-w-4xl' 
                    : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 max-w-6xl'
              }`}>
                {/* ===== MAP PRODUK KE CARD ===== */}
                {products.map((product, idx) => {
                  // ===== CEK PROMO AKTIF =====
                  const promoIsActive =
                    product.promo_active &&
                    (!product.promo_start || new Date() >= new Date(product.promo_start)) &&
                    (!product.promo_end || new Date() <= new Date(product.promo_end)) &&
                    product.promo_price;

                  // ===== BADGE DINAMIS =====
                  const badgeLabel = product.badge_label;
                  const badgeColor = product.badge_color || "bg-primary/80";

                  return (
                    <div
                      key={product.id || idx}
                      className="product-card bg-white rounded-lg overflow-hidden shadow-md transition-all duration-300"
                    >
                      {/* ===== GAMBAR & BADGE ===== */}
                      <div className="relative">
                        <img
                          src={
                            product.image?.startsWith("http")
                              ? product.image
                              : `http://localhost:8000${product.image}`
                          }
                          alt={product.name}
                          className="aspect-square object-cover object-top"
                          loading="lazy"
                        />
                        {badgeLabel && (
                          <div
                            className={`absolute top-3 right-3 text-white text-xs font-bold px-3 py-1 rounded-full ${badgeColor}`}
                          >
                            {badgeLabel}
                          </div>
                        )}
                        {promoIsActive && !badgeLabel && (
                          <div className="absolute top-3 right-3 bg-primary/90 text-white text-xs font-bold px-3 py-1 rounded-full">
                            Promo
                          </div>
                        )}
                      </div>
                      {/* ===== DETAIL PRODUK ===== */}
                      <div className="p-6">
                        <h3 className="text-lg font-bold text-gray-900 mb-1">
                          {product.name}
                        </h3>
                        <p className="text-gray-600 text-sm mb-3">
                          {product.description}
                        </p>
                        <div className="flex justify-between items-center">
                          <span className="text-primary font-bold">
                            {promoIsActive ? (
                              <>
                                <span className="text-gray-400 line-through text-sm mr-2">
                                  {formatRupiah(product.promo_old_price || product.price)}
                                </span>
                                {formatRupiah(product.promo_price)}
                              </>
                            ) : (
                              formatRupiah(product.price)
                            )}
                          </span>
                          <button
                            className={`w-10 h-10 flex items-center justify-center rounded-full transition-colors
                              ${
                                product.stock > 0
                                  ? "bg-primary/10 text-primary hover:bg-primary hover:text-white"
                                  : "bg-gray-100 text-gray-400 cursor-not-allowed"
                              }
                            `}
                            disabled={product.stock <= 0}
                            title={product.stock > 0 ? "Tambahkan ke keranjang" : "Stok habis"}
                            onClick={() => handleAddToCart(product)}
                          >
                            <i className="ri-shopping-cart-line"></i>
                          </button>
                        </div>
                        {/* ===== INFO PROMO ===== */}
                        {promoIsActive && (
                          <div className="mt-2 text-xs text-gray-500">
                            {product.promo_start && product.promo_end &&
                              `Promo: ${product.promo_start} - ${product.promo_end}`}
                          </div>
                        )}
                        {/* ===== COUNTDOWN PROMO ===== */}
                        {promoIsActive && product.promo_end && (
                          <div className="mt-2 text-xs text-red-500 font-semibold animate-pulse">
                            Promo berakhir dalam: {getPromoCountdown(product.promo_end)}
                          </div>
                        )}
                        {/* ===== INFO STOK ===== */}
                        <div className="mt-1 text-xs text-gray-500">
                          Stok: <span className={product.stock > 0 ? "text-green-600 font-semibold" : "text-red-500 font-semibold"}>
                            {product.stock > 0 ? product.stock : "Habis"}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )
        )}

        {/* ===== FOOTER: TOMBOL LIHAT SEMUA PRODUK ===== */}
        <div className="text-center mt-12">
          <a
            href="#"
            className="inline-flex items-center justify-center px-6 py-3 bg-white border-2 border-primary text-primary font-medium rounded-button hover:bg-primary/5 transition-all whitespace-nowrap"
          >
            <span>Lihat Semua Produk</span>
            <i className="ri-arrow-right-line ri-lg ml-2"></i>
          </a>
        </div>
      </div>
    </section>
  );
}
