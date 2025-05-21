import React from "react";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white pt-16 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {/* Kolom 1: Logo & deskripsi */}
          <div>
            <a href="#" className="logo text-2xl text-primary font-bold mb-4 inline-block" style={{ fontFamily: "'Pacifico', serif" }}>
              Nail Studio
            </a>
            <p className="text-gray-400 mb-6">
              Salon kuku premium dengan layanan profesional dan produk berkualitas tinggi untuk perawatan kuku Anda.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 flex items-center justify-center bg-gray-800 text-white rounded-full hover:bg-primary transition-colors">
                <i className="ri-instagram-line"></i>
              </a>
              <a href="#" className="w-10 h-10 flex items-center justify-center bg-gray-800 text-white rounded-full hover:bg-primary transition-colors">
                <i className="ri-tiktok-line"></i>
              </a>
              <a href="#" className="w-10 h-10 flex items-center justify-center bg-gray-800 text-white rounded-full hover:bg-primary transition-colors">
                <i className="ri-whatsapp-line"></i>
              </a>
            </div>
          </div>
          {/* Kolom 2: Menu Cepat */}
          <div>
            <h3 className="text-lg font-bold mb-6">Menu Cepat</h3>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-gray-400 hover:text-primary transition-colors">Beranda</a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-primary transition-colors">Booking</a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-primary transition-colors">Galeri</a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-primary transition-colors">Toko</a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-primary transition-colors">Testimoni</a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-primary transition-colors">Tentang Kami</a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-primary transition-colors">Kontak</a>
              </li>
            </ul>
          </div>
          {/* Kolom 3: Kontak */}
          <div>
            <h3 className="text-lg font-bold mb-6">Kontak Kami</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <div className="w-5 h-5 flex items-center justify-center mt-1 mr-3 text-primary">
                  <i className="ri-map-pin-line"></i>
                </div>
                <span className="text-gray-400">
                  Jl. Kemang Raya No. 28, Jakarta Selatan, DKI Jakarta 12730
                </span>
              </li>
              <li className="flex items-center">
                <div className="w-5 h-5 flex items-center justify-center mr-3 text-primary">
                  <i className="ri-whatsapp-line"></i>
                </div>
                <a href="#" className="text-gray-400 hover:text-primary transition-colors">+62 812-3456-7890</a>
              </li>
              <li className="flex items-center">
                <div className="w-5 h-5 flex items-center justify-center mr-3 text-primary">
                  <i className="ri-mail-line"></i>
                </div>
                <a href="#" className="text-gray-400 hover:text-primary transition-colors">info@nailstudio.id</a>
              </li>
              <li className="flex items-center">
                <div className="w-5 h-5 flex items-center justify-center mr-3 text-primary">
                  <i className="ri-time-line"></i>
                </div>
                <span className="text-gray-400">Senin - Minggu: 10:00 - 20:00</span>
              </li>
            </ul>
            <div className="mt-6">
              <h4 className="text-sm font-semibold mb-3">Metode Pembayaran</h4>
              <div className="flex space-x-3">
                <div className="w-10 h-6 flex items-center justify-center bg-white rounded">
                  <i className="ri-visa-fill text-blue-700"></i>
                </div>
                <div className="w-10 h-6 flex items-center justify-center bg-white rounded">
                  <i className="ri-mastercard-fill text-red-500"></i>
                </div>
                <div className="w-10 h-6 flex items-center justify-center bg-white rounded">
                  <i className="ri-bank-card-fill text-gray-700"></i>
                </div>
                <div className="w-10 h-6 flex items-center justify-center bg-white rounded">
                  <i className="ri-alipay-fill text-blue-500"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Bottom Footer */}
        <div className="border-t border-gray-800 mt-12 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-500 text-sm mb-4 md:mb-0">
              © 2025 Nail Studio | Designed with ❤️ by Nail Studio Team
            </p>
            <div className="flex items-center space-x-4">
              <a href="#" className="text-gray-500 hover:text-primary text-sm">Syarat &amp; Ketentuan</a>
              <a href="#" className="text-gray-500 hover:text-primary text-sm">Kebijakan Privasi</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
