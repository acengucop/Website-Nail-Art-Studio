import React from "react";

export default function CTASection() {
  return (
    <section className="py-16 cta-gradient">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-900 mb-3">Siap Untuk Tampil Cantik?</h2>
          <p className="text-gray-700 max-w-2xl mx-auto">
            Pilih layanan kami atau belanja produk premium untuk perawatan kuku Anda
          </p>
        </div>
        <div className="flex flex-col md:flex-row justify-center gap-6 max-w-3xl mx-auto">
          <a
            href="#"
            className="flex-1 inline-flex items-center justify-center px-6 py-4 bg-white text-primary font-medium rounded-button shadow-lg hover:shadow-xl transition-all whitespace-nowrap"
          >
            <i className="ri-calendar-check-line ri-lg mr-2"></i> Booking Layanan
          </a>
          <a
            href="#"
            className="flex-1 inline-flex items-center justify-center px-6 py-4 bg-primary text-white font-medium rounded-button shadow-lg hover:shadow-xl transition-all whitespace-nowrap"
          >
            <i className="ri-shopping-bag-line ri-lg mr-2"></i> Belanja Produk
          </a>
        </div>
      </div>
    </section>
  );
}
