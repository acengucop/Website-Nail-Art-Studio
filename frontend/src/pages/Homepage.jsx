import React, { useEffect } from 'react';
import { Element } from 'react-scroll';

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
      <Element name="beranda" className="scroll-mt-24">
        <HeroSection />
      </Element>

      {/* Promo / Highlight Services */}
      <PromoSection />

      {/* Shop Highlight */}
      <Element name="toko" className="scroll-mt-24">
        <ShopHighlight />
      </Element>

      {/* Gallery */}
<Element name="galeri" id="galeri" className="scroll-mt-24">
  <GallerySection />
</Element>


      {/* Testimonials */}
      <Element name="testimoni" className="scroll-mt-24">
        <TestimonialSection />
      </Element>

      {/* Call To Action */}
      <Element name="tentang" className="scroll-mt-24">
        <CTASection />
      </Element>

      {/* Footer */}
      <Element name="kontak" className="scroll-mt-24">
        <Footer />
      </Element>

      {/* WhatsApp Floating Button */}
      <a
        href="https://wa.me/6281234567890"
        target="_blank"
        rel="noopener noreferrer"
        className="whatsapp-button w-14 h-14 flex items-center justify-center text-white rounded-full shadow-lg transition-all duration-300 hover:bg-green-600 hover:scale-110 hover:shadow-[0_0_24px_4px_#25d366aa] group"
        style={{
          position: 'fixed',
          bottom: 20,
          right: 20,
          zIndex: 999,
          boxShadow: '0 4px 18px 0 #25d36644',
        }}
        aria-label="WhatsApp"
      >
        <img
          src="/whatsapp_2504957.png"
          alt="WhatsApp"
          className="w-8 h-8 object-contain transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110 drop-shadow-[0_2px_8px_#25d366aa]"
          draggable="false"
          style={{ filter: 'drop-shadow(0 0 10px #25d366cc)' }}
        />
      </a>

      {/* Back to Top Button */}
      <button
        id="back-to-top"
        className="back-to-top w-10 h-10 flex items-center justify-center bg-primary text-white rounded-full shadow-lg hover:bg-accent transition-colors"
        style={{ position: 'fixed', bottom: 90, right: 20, zIndex: 999 }}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        aria-label="Back to Top"
      >
        <i className="ri-arrow-up-line"></i>
      </button>
    </>
  );
}
