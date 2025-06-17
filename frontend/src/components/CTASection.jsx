import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CTASection() {
  const [showLoginAlert, setShowLoginAlert] = useState(false);
  const navigate = useNavigate();

  const handleBookingClick = () => {
    const isLoggedIn = !!localStorage.getItem("access"); // atau metode cek login lain
    if (!isLoggedIn) {
      setShowLoginAlert(true);
    } else {
      navigate("/booking");
    }
  };

  return (
    <section className="relative py-24 overflow-hidden">
      {/* Elegant gradient background with subtle pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-rose-50 via-pink-50 to-purple-50"></div>
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `radial-gradient(circle at 20% 80%, rgba(255, 182, 193, 0.3) 0%, transparent 50%),
                           radial-gradient(circle at 80% 20%, rgba(221, 160, 221, 0.3) 0%, transparent 50%),
                           radial-gradient(circle at 40% 40%, rgba(255, 228, 225, 0.2) 0%, transparent 50%)`,
        }}
      ></div>

      {/* Floating decorative elements */}
      <div className="absolute top-10 left-10 w-16 h-16 bg-gradient-to-br from-pink-200 to-rose-200 rounded-full opacity-20 animate-pulse"></div>
      <div className="absolute bottom-10 right-10 w-12 h-12 bg-gradient-to-br from-purple-200 to-pink-200 rounded-full opacity-20 animate-pulse delay-1000"></div>
      <div className="absolute top-1/2 left-1/4 w-8 h-8 bg-gradient-to-br from-rose-200 to-pink-200 rounded-full opacity-15 animate-pulse delay-500"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          {/* Decorative line above title */}
          <div className="flex items-center justify-center mb-6">
            <div className="w-16 h-px bg-gradient-to-r from-transparent via-rose-300 to-transparent"></div>
            <div className="mx-4 w-2 h-2 bg-rose-300 rounded-full"></div>
            <div className="w-16 h-px bg-gradient-to-r from-transparent via-rose-300 to-transparent"></div>
          </div>

          <h2 className="text-4xl md:text-5xl font-light text-gray-800 mb-4 tracking-wide">
            <span className="bg-gradient-to-r from-rose-600 via-pink-600 to-purple-600 bg-clip-text text-transparent font-medium">
              Siap Untuk Tampil
            </span>
            <br />
            <span className="italic font-light text-gray-700">Cantik?</span>
          </h2>

          <p className="text-gray-600 max-w-2xl mx-auto text-lg leading-relaxed font-light">
            Pilih layanan kami atau belanja produk premium untuk perawatan kuku Anda
          </p>

          {/* Decorative line below description */}
          <div className="flex items-center justify-center mt-6">
            <div className="w-24 h-px bg-gradient-to-r from-transparent via-pink-300 to-transparent"></div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-center gap-6 max-w-4xl mx-auto">
          {/* Booking Layanan button with login protection */}
          <button
            type="button"
            onClick={handleBookingClick}
            className="group flex-1 relative inline-flex items-center justify-center px-8 py-5 bg-white/80 backdrop-blur-sm text-gray-800 font-medium rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 whitespace-nowrap border border-white/50 hover:bg-white hover:-translate-y-1 overflow-hidden"
          >
            {/* Subtle hover gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-rose-50 to-pink-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>

            {/* Icon with gradient background */}
            <div className="relative z-10 flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-rose-100 to-pink-100 mr-3 group-hover:scale-110 transition-transform duration-300">
              <i className="ri-calendar-check-line text-xl text-rose-600"></i>
            </div>

            <span className="relative z-10 text-lg font-medium tracking-wide">
              Booking Layanan
            </span>

            {/* Subtle shine effect */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 transform translate-x-[-100%] group-hover:translate-x-[200%] transition-transform duration-1000"></div>
            </div>
          </button>

          {/* Belanja Produk tetap tanpa proteksi */}
          <a
            href="/products"
            className="group flex-1 relative inline-flex items-center justify-center px-8 py-5 bg-gradient-to-r from-rose-500 via-pink-500 to-purple-500 text-white font-medium rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 whitespace-nowrap hover:-translate-y-1 overflow-hidden"
          >
            {/* Hover gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-rose-600 via-pink-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

            {/* Icon with subtle background */}
            <div className="relative z-10 flex items-center justify-center w-10 h-10 rounded-full bg-white/20 mr-3 group-hover:scale-110 transition-transform duration-300">
              <i className="ri-shopping-bag-line text-xl text-white"></i>
            </div>

            <span className="relative z-10 text-lg font-medium tracking-wide">
              Belanja Produk
            </span>

            {/* Shine effect */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12 transform translate-x-[-100%] group-hover:translate-x-[200%] transition-transform duration-1000"></div>
            </div>
          </a>
        </div>

        {/* Subtle bottom decorative element */}
        <div className="flex justify-center mt-12">
          <div className="flex space-x-2">
            <div className="w-2 h-2 bg-rose-300 rounded-full opacity-60"></div>
            <div className="w-2 h-2 bg-pink-300 rounded-full opacity-60"></div>
            <div className="w-2 h-2 bg-purple-300 rounded-full opacity-60"></div>
          </div>
        </div>
      </div>

      {/* Login alert modal */}
      {showLoginAlert && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-xl p-6 text-center">
            <div className="text-lg font-semibold mb-3 text-[#fe019a]">
              Anda belum login
            </div>
            <div className="mb-5">
              Silakan login terlebih dahulu untuk booking layanan.
            </div>
            <button
              className="px-4 py-2 rounded bg-[#fe019a] text-white font-semibold mr-2"
              onClick={() => {
                setShowLoginAlert(false);
                navigate("/login");
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
    </section>
  );
}
