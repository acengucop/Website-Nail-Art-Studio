import React from "react";
import { FiShoppingCart } from "react-icons/fi";

// Props: totalItems (number), onClick (function)
export default function StickyCartButton({ totalItems = 0, onClick }) {
  return (
    <button
      className="
        fixed z-50 bottom-6 right-6 sm:bottom-10 sm:right-10
        shadow-xl rounded-full
        bg-gradient-to-br from-[#fe019a] via-[#ff5ea2] to-[#ffafcc]
        transition-colors p-0 w-16 h-16 flex items-center justify-center
        outline-none
        border-4 border-white/50
        ring-2 ring-pink-200/40
        active:scale-95
        group
        hover:animate-jelly
        focus-visible:ring-4
        overflow-visible
      "
      onClick={onClick}
      aria-label="Checkout"
      style={{ boxShadow: "0 6px 24px 0 rgba(254,1,154,.18)" }}
    >
      {/* GLOW */}
      <span className="absolute z-0 w-full h-full rounded-full pointer-events-none bg-pink-100 blur-2xl opacity-40 group-hover:opacity-60 transition duration-300"></span>
      {/* Cart icon */}
      <span className="relative z-10">
        <FiShoppingCart
          size={32}
          className="
            text-white drop-shadow-lg
            group-hover:animate-swing2
            transition-transform
          "
        />
      </span>
      {/* Cart badge */}
      {totalItems > 0 && (
        <span
          className="
            absolute z-20 -top-2 -right-2
            bg-white text-[#fe019a]
            rounded-full
            px-2 py-0.5 text-xs font-bold shadow
            border-2 border-pink-200
            animate-jelly
          "
          style={{
            minWidth: 22,
            textAlign: "center",
            fontWeight: 700
          }}
        >
          {totalItems}
        </span>
      )}

      {/* CSS Animasi */}
      <style>{`
        @keyframes jelly {
          0% { transform: scale(1,1);}
          15% { transform: scale(1.14,0.89);}
          25% { transform: scale(0.89,1.14);}
          40% { transform: scale(1.08,0.93);}
          50% { transform: scale(0.96,1.06);}
          65% { transform: scale(1.04,0.96);}
          75% { transform: scale(0.98,1.02);}
          100% { transform: scale(1,1);}
        }
        .hover\\:animate-jelly:hover,
        .animate-jelly {
          animation: jelly 0.7s cubic-bezier(.36,2.4,.4,1.2) 1;
        }

        @keyframes swing2 {
          0% { transform: rotate(0);}
          30% { transform: rotate(-19deg);}
          60% { transform: rotate(14deg);}
          100% { transform: rotate(0);}
        }
        .group-hover\\:animate-swing2:hover .group-hover\\:animate-swing2,
        .group-hover\\:animate-swing2:hover {
          animation: swing2 0.7s cubic-bezier(.36,1.5,.59,1) 1;
        }
      `}</style>
    </button>
  );
}
