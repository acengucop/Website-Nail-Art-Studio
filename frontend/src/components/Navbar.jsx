import React, { useState, useRef, useEffect } from 'react';
import { FiShoppingCart, FiMenu, FiX } from 'react-icons/fi';

const NAV_ITEMS = [
  { label: 'Beranda', href: '#beranda' },
  { label: 'Booking', href: '#booking' },      // Jika ada section Booking
  { label: 'Galeri', href: '#galeri' },
  { label: 'Toko', href: '#toko' },
  { label: 'Testimoni', href: '#testimoni' },
  { label: 'Tentang', href: '#tentang' },      // Tambahkan id pada CTASection/TentangSection
  { label: 'Kontak', href: '#kontak' },        // Tambahkan id pada Footer atau KontakSection
];


const ACCENT_COLOR = '#fe019a';

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const mobileMenuRef = useRef(null);

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

  const cartCount = 27;

  return (
    <>
      <nav
        className="fixed w-full top-0 z-50 bg-white/80 backdrop-blur-[10px] shadow-[0_2px_24px_0_rgba(254,1,154,0.07)] transition-all"
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          {/* Logo with image and brand text */}
          <a
            href="#"
            className="flex items-center gap-3 focus:outline-none group"
            aria-label="Nail Studio Home"
          >
            <img
              src="/nail_logo.gif"
              alt="Nail Studio Logo"
              className="
                w-12 h-12 rounded-full bg-white border-2 border-[#fe019a]
                shadow-[0_2px_12px_#fe019a33] object-cover
                transition-transform duration-200 group-hover:scale-105
              "
              style={{
                background: '#fff',
                minWidth: '3rem',
                minHeight: '3rem'
              }}
              draggable="false"
            />
            <span
              className="hidden md:inline ml-1 text-2xl font-bold tracking-tight"
              style={{
                fontFamily: "'Pacifico', 'cursive'",
                color: ACCENT_COLOR,
                textShadow: '0 1px 12px #fe019a44'
              }}
            >
              Nail Studio
            </span>
          </a>
          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-2">
            {NAV_ITEMS.map(({ label, href }) => (
              <a
                key={label}
                href={href}
                className="
                  px-4 py-2 rounded-xl text-base font-medium text-gray-800
                  hover:text-white hover:bg-[#fe019a]
                  focus-visible:ring-2 focus-visible:ring-[#fe019a] focus:outline-none
                  transition-colors duration-200
                "
                tabIndex={0}
              >
                {label}
              </a>
            ))}
            {/* Cart */}
            <a
              href="#"
              aria-label="Shopping Cart"
              className="
                relative ml-3 flex items-center justify-center w-11 h-11
                rounded-full bg-white hover:bg-[#fe019a]/90 hover:text-white
                text-[#fe019a] shadow-[0_1px_6px_0_#fe019a30]
                focus-visible:ring-2 focus-visible:ring-[#fe019a] transition-all
              "
              tabIndex={0}
            >
              <FiShoppingCart size={23} />
              <span
                className="
                  absolute -top-1 -right-1 min-w-[1.4rem] h-5 px-1 bg-[#fe019a] text-white text-xs
                  flex items-center justify-center rounded-full border border-white shadow
                  font-semibold transition
                "
                aria-label={`${cartCount} items in cart`}
              >
                {cartCount}
              </span>
            </a>
          </div>
          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-2">
            {/* Cart on Mobile */}
            <a
              href="#"
              aria-label="Shopping Cart"
              className="
                relative flex items-center justify-center w-10 h-10
                rounded-full bg-white hover:bg-[#fe019a]/80 hover:text-white
                text-[#fe019a] shadow-[0_1px_6px_0_#fe019a30]
                focus-visible:ring-2 focus-visible:ring-[#fe019a] transition-all
              "
              tabIndex={0}
            >
              <FiShoppingCart size={22} />
              <span
                className="
                  absolute -top-1 -right-1 min-w-[1.2rem] h-5 px-1 bg-[#fe019a] text-white text-xs
                  flex items-center justify-center rounded-full border border-white shadow
                  font-semibold
                "
                aria-label={`${cartCount} items in cart`}
              >
                {cartCount}
              </span>
            </a>
            {/* Hamburger */}
            <button
              className="
                w-10 h-10 flex items-center justify-center text-[#fe019a]
                rounded-full bg-white/90 hover:bg-[#fe019a]/10 transition-all
                focus-visible:ring-2 focus-visible:ring-[#fe019a] focus:outline-none
              "
              aria-label="Open navigation menu"
              onClick={() => setMobileOpen(true)}
            >
              <FiMenu size={26} />
            </button>
          </div>
        </div>
      </nav>
      {/* Mobile Menu Overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 md:hidden animate-fade-in"
          aria-hidden="true"
          onClick={() => setMobileOpen(false)}
        />
      )}
      {/* Mobile Slide Menu */}
      <aside
        ref={mobileMenuRef}
        tabIndex={-1}
        className={`
          fixed top-0 right-0 w-4/5 max-w-xs h-full bg-white z-50 transition-transform duration-300 ease-in-out
          shadow-[0_0_36px_0_#fe019a33] md:hidden
          ${mobileOpen ? 'translate-x-0' : 'translate-x-full'}
        `}
        aria-label="Mobile navigation"
        role="dialog"
        aria-modal="true"
      >
        <div className="p-6 h-full flex flex-col">
          <div className="flex justify-between items-center mb-8">
            <a
              href="#"
              className="flex items-center gap-3"
              aria-label="Nail Studio Home"
              onClick={() => setMobileOpen(false)}
            >
              <img
                src="/nail_logo.gif"
                alt="Nail Studio Logo"
                className="w-10 h-10 rounded-full bg-white border-2 border-[#fe019a] shadow-[0_2px_12px_#fe019a33] object-cover"
                draggable="false"
              />
              <span
                className="ml-1 text-xl font-bold"
                style={{
                  fontFamily: "'Pacifico', 'cursive'",
                  color: ACCENT_COLOR,
                  textShadow: '0 1px 10px #fe019a22'
                }}
              >
                Nail Studio
              </span>
            </a>
            <button
              className="
                w-10 h-10 flex items-center justify-center text-[#fe019a] hover:bg-[#fe019a]/10 rounded-full
                focus-visible:ring-2 focus-visible:ring-[#fe019a] focus:outline-none
                transition-all
              "
              aria-label="Close navigation menu"
              onClick={() => setMobileOpen(false)}
            >
              <FiX size={26} />
            </button>
          </div>
          <nav className="flex flex-col gap-5" aria-label="Mobile navigation menu">
            {NAV_ITEMS.map(({ label, href }) => (
              <a
                key={label}
                href={href}
                className="
                  px-2 py-2 rounded-xl text-base font-medium text-gray-800
                  hover:text-white hover:bg-[#fe019a]
                  focus-visible:ring-2 focus-visible:ring-[#fe019a] focus:outline-none
                  transition-colors duration-200
                "
                tabIndex={mobileOpen ? 0 : -1}
                onClick={() => setMobileOpen(false)}
              >
                {label}
              </a>
            ))}
          </nav>
          <div className="mt-auto pt-12 text-center text-xs text-gray-400 select-none">
            &copy; {new Date().getFullYear()} Nail Studio
          </div>
        </div>
      </aside>
      <style>
        {`
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-fade-in { animation: fade-in 0.22s ease; }
        `}
      </style>
      {/* Import Pacifico font for luxury logo if not already in your app */}
      <link href="https://fonts.googleapis.com/css2?family=Pacifico&display=swap" rel="stylesheet" />
    </>
  );
}
