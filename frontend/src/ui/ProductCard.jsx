import React from "react";

function formatRupiah(num) {
  if (!num) return "";
  return "Rp " + Number(num).toLocaleString("id-ID");
}

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

export default function ProductCard({ product, onAddToCart }) {
  const promoIsActive =
    product.promo_active &&
    (!product.promo_start || new Date() >= new Date(product.promo_start)) &&
    (!product.promo_end || new Date() <= new Date(product.promo_end)) &&
    product.promo_price;

  const badgeLabel = product.badge_label;
  const badgeColor = product.badge_color || "bg-primary/80";

  return (
<div className="flex flex-col bg-white/80 rounded-3xl shadow-xl h-full min-h-[530px] max-w-xs mx-auto p-5 transition-all duration-300">
  {/* GAMBAR + BADGE */}
  <div className="relative w-full aspect-square mb-3">
    <img
      src={product.image?.startsWith("http") ? product.image : `http://localhost:8000${product.image}`}
      alt={product.name}
      className="w-full h-full object-cover rounded-2xl"
    />
    {/* BADGE */}
    {badgeLabel && (
      <div className={`absolute top-3 left-3 min-w-[90px] text-center px-4 py-1.5 rounded-full shadow-md text-xs font-bold
        ${badgeLabel === "Promo" ? "bg-gradient-to-r from-pink-400 to-yellow-300 text-white" : ""}
        ${badgeLabel === "Bestseller" ? "bg-gradient-to-r from-fuchsia-500 to-pink-300 text-white" : ""}
        ${badgeLabel === "New" ? "bg-gradient-to-r from-sky-400 to-pink-200 text-white" : ""}
        ${badgeLabel === "Limited" ? "bg-gradient-to-r from-yellow-300 to-amber-400 text-white" : ""}
      `}>
        {badgeLabel === "Bestseller" && "🌟 "}
        {badgeLabel === "Limited" && "👑 "}
        {badgeLabel === "Promo" && "💖 "}
        {badgeLabel}
      </div>
    )}
  </div>

  {/* ISI CARD */}
  <div className="flex flex-col flex-1 justify-between">
    <div>
      <h3 className="text-lg font-bold text-pink-900 mb-1 truncate" title={product.name}>{product.name}</h3>
      <p className="text-gray-700 text-sm mb-3 min-h-[44px]">{product.description}</p>
      {/* Harga */}
      <div className="flex items-end justify-between mb-2">
        <div>
          {promoIsActive ? (
            <>
              <div className="text-xs text-gray-400 line-through">{formatRupiah(product.promo_old_price || product.price)}</div>
              <div className="text-pink-600 font-bold text-lg">{formatRupiah(product.promo_price)}</div>
            </>
          ) : (
            <div className="text-pink-600 font-bold text-lg">{formatRupiah(product.price)}</div>
          )}
        </div>
        <button
          className={`w-11 h-11 flex items-center justify-center rounded-full transition-all duration-200 shadow-lg
            ${product.stock > 0
              ? "bg-gradient-to-br from-pink-400 via-fuchsia-400 to-yellow-200 text-white hover:scale-110 active:scale-95"
              : "bg-gray-200 text-gray-400 cursor-not-allowed"
            }`}
          disabled={product.stock <= 0}
          title={product.stock > 0 ? "Tambahkan ke keranjang" : "Stok habis"}
          onClick={() => onAddToCart(product)}
        >
          <i className="ri-shopping-cart-line text-xl"></i>
        </button>
      </div>
      {/* Promo info */}
      {promoIsActive && (
        <div className="text-xs text-pink-500 italic mb-2">
          {product.promo_start && product.promo_end && `Promo: ${product.promo_start} - ${product.promo_end}`}
        </div>
      )}
    </div>

    {/* BARIS INFO BAWAH */}
    <div className="flex flex-row items-end gap-2 mt-2">
      {promoIsActive && product.promo_end && (
        <div className="flex items-center gap-1 px-3 py-1 rounded-full bg-pink-50 text-amber-700 text-xs font-semibold shadow min-w-[146px]">
          <span>⏰</span>
          <span className="truncate">Berakhir: {getPromoCountdown(product.promo_end)}</span>
        </div>
      )}
      <div className="flex items-center gap-1 px-3 py-1 rounded-full bg-pink-50 text-green-700 text-xs font-semibold shadow min-w-[70px] justify-center">
   
        <span>Stok: {product.stock > 0 ? product.stock : "Habis"}</span>
      </div>
    </div>
  </div>
</div>

  );
}
