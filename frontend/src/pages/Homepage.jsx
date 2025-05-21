import React, { useEffect } from 'react';

import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';
import PromoSection from '../components/PromoSection';
import ShopHighlight from '../components/ShopHighlight';
import GallerySection from '../components/GallerySection';
import TestimonialSection from '../components/TestimonialSection';
import CTASection from '../components/CTASection';
import Footer from '../components/Footer';

export default function Homepage() {
  useEffect(() => {
    const backToTopButton = document.getElementById('back-to-top');
    const onScroll = () => {
      if (window.scrollY > 300) {
        backToTopButton?.classList.add('visible');
      } else {
        backToTopButton?.classList.remove('visible');
      }
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      {/* Navbar */}
      <Navbar />

      {/* Hero Section */}
      <HeroSection id="beranda" className="scroll-mt-24" />

      {/* Promo / Highlight Services */}
      <PromoSection id="" className="scroll-mt-24" />

      {/* Shop Highlight */}
      <ShopHighlight id="toko" className="scroll-mt-24" />

      {/* Gallery */}
      <GallerySection id="galeri" className="scroll-mt-24" />

      {/* Testimonials */}
      <TestimonialSection id="testimoni" className="scroll-mt-24" />

      {/* Call To Action */}
      <CTASection id="" className="scroll-mt-24" />

      {/* Footer */}
      <Footer id="kontak" className="scroll-mt-24" />

      {/* WhatsApp Floating Button */}
<a
  href="https://wa.me/6281234567890"
  target="_blank"
  rel="noopener noreferrer"
  className="
    whatsapp-button w-14 h-14 flex items-center justify-center
   text-white rounded-full shadow-lg
    transition-all duration-300
    hover:bg-green-600
    hover:scale-110
    hover:shadow-[0_0_24px_4px_#25d366aa]
    group
  "
  style={{
    position: 'fixed',
    bottom: 20,
    right: 20,
    zIndex: 999,
    // Tambahan shadow default
    boxShadow: '0 4px 18px 0 #25d36644',
  }}
  aria-label="WhatsApp"
>
  <img
    src="/whatsapp_2504957.png"
    alt="WhatsApp"
    className="
      w-8 h-8 object-contain
      transition-transform duration-300
      group-hover:rotate-12
      group-hover:scale-110
      drop-shadow-[0_2px_8px_#25d366aa]
    "
    draggable="false"
    style={{
      filter: 'drop-shadow(0 0 10px #25d366cc)',
    }}
  />
</a>



      {/* Back to Top Button */}
      <button
        id="back-to-top"
        className="back-to-top w-10 h-10 flex items-center justify-center bg-primary text-white rounded-full shadow-lg hover:bg-accent transition-colors"
        style={{ position: 'fixed', bottom: 90, right: 20, zIndex: 999, display: 'none' }}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        aria-label="Back to Top"
      >
        <i className="ri-arrow-up-line"></i>
      </button>
    </>
  );
}
