import React, { useState, useRef, useEffect } from 'react';
import { FiShoppingCart, FiMenu, FiX } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { useCart } from "../context/CartContext";
import { Link as ScrollLink } from 'react-scroll';
import StickyCartButton from "../ui/StickyCartButton";

const NAV_ITEMS = [
  { label: 'Home', href: 'beranda' },
  { label: 'Galeri', href: 'galeri' },
  { label: 'Toko', href: 'toko' },
  { label: 'Testimoni', href: 'testimoni' },
];

const ACCENT_COLOR = '#fe019a';

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const mobileMenuRef = useRef(null);
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { cart } = useCart();
  const totalItems = cart.reduce((acc, item) => acc + item.qty, 0);

  useEffect(() => {
    setIsLoggedIn(!!localStorage.getItem('token'));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    navigate('/login');
  };

  useEffect(() => {
    if (!mobileOpen) return;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setMobileOpen(false);
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [mobileOpen]);

  useEffect(() => {
    if (mobileOpen && mobileMenuRef.current) {
      mobileMenuRef.current.focus();
    }
  }, [mobileOpen]);

return (
  <>
    <nav
      className="fixed w-full top-0 z-50 bg-white/80 backdrop-blur-[10px] shadow-[0_2px_24px_0_rgba(254,1,154,0.07)] transition-all"
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="flex items-center gap-3 group" aria-label="Nail Studio Home">
          <img
            src="/nail_logo.gif"
            alt="Nail Studio Logo"
            className="w-12 h-12 rounded-full bg-white border-2 border-[#fe019a] shadow-[0_2px_12px_#fe019a33] object-cover transition-transform duration-200 group-hover:scale-105"
            style={{ minWidth: '3rem', minHeight: '3rem' }}
            draggable="false"
          />
          <span
            className="hidden md:inline ml-1 text-2xl font-bold tracking-tight"
            style={{ fontFamily: "'Pacifico', 'cursive'", color: ACCENT_COLOR, textShadow: '0 1px 12px #fe019a44' }}
          >
            Nail Studio
          </span>
        </a>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-2">
          {NAV_ITEMS.map(({ label, href }) => (
            <ScrollLink
              key={label}
              to={href}
              smooth={true}
              offset={-80}
              duration={500}
              className="cursor-pointer px-4 py-2 rounded-xl text-base font-medium text-gray-800 hover:text-white hover:bg-[#fe019a] focus-visible:ring-2 focus-visible:ring-[#fe019a] focus:outline-none transition-colors duration-200"
            >
              {label}
            </ScrollLink>
          ))}

          {isLoggedIn && (
            <a
              href="/order-history"
              className="px-4 py-2 rounded-xl text-base font-medium text-gray-800 hover:text-white hover:bg-[#fe019a] focus-visible:ring-2 focus-visible:ring-[#fe019a] focus:outline-none transition-colors duration-200"
            >
              Histori
            </a>
          )}

          {isLoggedIn && (
            <a
              href="/my-appointments"
              className="px-4 py-2 rounded-xl text-base font-medium text-gray-800 hover:text-white hover:bg-[#fe019a] focus-visible:ring-2 focus-visible:ring-[#fe019a] focus:outline-none transition-colors duration-200"
            >
              Booking Saya
            </a>
          )}

          <a
            href="/booking"
            className="px-4 py-2 rounded-xl text-base font-medium text-gray-800 hover:text-white hover:bg-[#fe019a] focus-visible:ring-2 focus-visible:ring-[#fe019a] focus:outline-none transition-colors duration-200"
          >
            Booking Nail Art
          </a>

          {/* Cart Button (Desktop) */}
          {isLoggedIn && (
            <button
              className="
                relative ml-2 flex items-center px-3 py-2 rounded-xl
                bg-[#fe019a]/10 hover:bg-[#fe019a]/20 transition-colors
                focus-visible:ring-2 focus-visible:ring-[#fe019a] focus:outline-none
                hover:animate-jelly
              "
              onClick={() => navigate('/checkout')}
              aria-label="Checkout"
              type="button"
            >
              <FiShoppingCart size={22} className="text-[#fe019a]" />
              {totalItems > 0 && (
                <span
                  className="absolute -top-2 -right-2 bg-[#fe019a] text-white rounded-full px-2 py-0.5 text-xs font-bold shadow"
                  style={{ minWidth: 22, textAlign: "center" }}
                >
                  {totalItems}
                </span>
              )}
            </button>
          )}

          {!isLoggedIn ? (
            <>
              <button
                className="ml-2 px-4 py-2 rounded-xl bg-[#fe019a] text-white font-semibold hover:bg-[#c90077] transition-colors"
                onClick={() => navigate('/login')}
              >
                Login
              </button>
              <button
                className="ml-2 px-4 py-2 rounded-xl border border-[#fe019a] text-[#fe019a] font-semibold hover:bg-[#fe019a]/10 transition-colors"
                onClick={() => navigate('/register')}
              >
                Register
              </button>
            </>
          ) : (
            <button
              className="ml-2 px-4 py-2 rounded-xl bg-gray-200 text-gray-700 font-semibold hover:bg-[#fe019a]/10 transition-colors"
              onClick={handleLogout}
            >
              Logout
            </button>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center gap-2">
          {/* Cart Button (Mobile) */}
          {isLoggedIn && (
            <button
              className="
                relative ml-1 flex items-center px-2 py-2 rounded-xl
                bg-[#fe019a]/10 hover:bg-[#fe019a]/20 transition-colors
                focus-visible:ring-2 focus-visible:ring-[#fe019a] focus:outline-none
                hover:animate-jelly
              "
              onClick={() => navigate('/checkout')}
              aria-label="Checkout"
              type="button"
            >
              <FiShoppingCart size={22} className="text-[#fe019a]" />
              {totalItems > 0 && (
                <span
                  className="absolute -top-2 -right-2 bg-[#fe019a] text-white rounded-full px-2 py-0.5 text-xs font-bold shadow"
                  style={{ minWidth: 22, textAlign: "center" }}
                >
                  {totalItems}
                </span>
              )}
            </button>
          )}
          <button
            className="w-10 h-10 flex items-center justify-center text-[#fe019a] rounded-full bg-white/90 hover:bg-[#fe019a]/10 transition-all focus-visible:ring-2 focus-visible:ring-[#fe019a] focus:outline-none"
            aria-label="Open navigation menu"
            onClick={() => setMobileOpen(true)}
          >
            <FiMenu size={26} />
          </button>
        </div>
      </div>
    </nav>

    {/* ...lanjutan: mobile menu dsb ... */}

    {/* Animasi Jelly untuk Cart Button */}
    <style>
      {`
        @keyframes jelly {
          0% { transform: scale(1,1);}
          15% { transform: scale(1.12,0.88);}
          25% { transform: scale(0.88,1.12);}
          40% { transform: scale(1.06,0.94);}
          50% { transform: scale(0.97,1.04);}
          65% { transform: scale(1.02,0.98);}
          75% { transform: scale(0.98,1.02);}
          100% { transform: scale(1,1);}
        }
        .hover\\:animate-jelly:hover {
          animation: jelly 0.7s cubic-bezier(.36,2.4,.4,1.2) 1;
        }
      `}
    </style>
    <link href="https://fonts.googleapis.com/css2?family=Pacifico&display=swap" rel="stylesheet" />
  </>
);

}
