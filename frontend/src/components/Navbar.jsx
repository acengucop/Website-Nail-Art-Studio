import React, { useState, useRef, useEffect } from 'react';
import { FiShoppingCart, FiMenu, FiX } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom'; // pastikan react-router-dom sudah dipakai
import { useCart } from "../context/CartContext";


const NAV_ITEMS = [
  { label: 'Home', href: '#beranda' },
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

  // Tambahkan di bawah deklarasi function Navbar
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
      className="px-4 py-2 rounded-xl text-base font-medium text-gray-800 hover:text-white hover:bg-[#fe019a]
        focus-visible:ring-2 focus-visible:ring-[#fe019a] focus:outline-none transition-colors duration-200"
      tabIndex={0}
    >
      {label}
    </a>
  ))}

{isLoggedIn && (
  <a
    href="/order-history"
    className="px-4 py-2 rounded-xl text-base font-medium text-gray-800 hover:text-white hover:bg-[#fe019a]
      focus-visible:ring-2 focus-visible:ring-[#fe019a] focus:outline-none transition-colors duration-200"
    tabIndex={0}
  >
    Histori
  </a>
)}

{/* Cart Button Desktop */}
{isLoggedIn && (
  <button
    className="relative ml-2 flex items-center px-3 py-2 rounded-xl bg-[#fe019a]/10 hover:bg-[#fe019a]/20 transition-colors"
    onClick={() => navigate('/checkout')}
    aria-label="Checkout"
  >
    <FiShoppingCart size={22} className="text-[#fe019a]" />
    {totalItems > 0 && (
      <span
        className="absolute -top-2 -right-2 bg-[#fe019a] text-white rounded-full px-2 py-0.5 text-xs font-bold shadow"
        style={{ minWidth: 22, textAlign: 'center' }}
      >
        {totalItems}
      </span>
    )}
  </button>
)}




  {/* Tambahan Login/Logout */}
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

{/* Cart Button Desktop */}
{isLoggedIn && (
  <button
    className="relative ml-2 flex items-center px-3 py-2 rounded-xl bg-[#fe019a]/10 hover:bg-[#fe019a]/20 transition-colors"
    onClick={() => navigate('/checkout')}
    aria-label="Checkout"
  >
    <FiShoppingCart size={22} className="text-[#fe019a]" />
    {totalItems > 0 && (
      <span
        className="absolute -top-2 -right-2 bg-[#fe019a] text-white rounded-full px-2 py-0.5 text-xs font-bold shadow"
        style={{ minWidth: 22, textAlign: 'center' }}
      >
        {totalItems}
      </span>
    )}
  </button>
)}




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

<div className="flex flex-col gap-3 mt-8">
  {!isLoggedIn ? (
    <>
      <button
        className="w-full py-2 rounded-xl bg-[#fe019a] text-white font-semibold hover:bg-[#c90077] transition-colors"
        onClick={() => {
          setMobileOpen(false);
          navigate('/login');
        }}
      >
        Login
      </button>
      <button
        className="w-full py-2 rounded-xl border border-[#fe019a] text-[#fe019a] font-semibold hover:bg-[#fe019a]/10 transition-colors"
        onClick={() => {
          setMobileOpen(false);
          navigate('/register');
        }}
      >
        Register
      </button>
    </>
  ) : (
    <button
      className="w-full py-2 rounded-xl bg-gray-200 text-gray-700 font-semibold hover:bg-[#fe019a]/10 transition-colors"
      onClick={() => {
        setMobileOpen(false);
        handleLogout();
      }}
    >
      Logout
    </button>
  )}
</div>


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
