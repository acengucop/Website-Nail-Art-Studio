import React, { useState, useEffect } from "react";
import axios from "axios";
import Masonry from "react-masonry-css";
import AnimatedGalleryHeader from './AnimatedGalleryHeader';
import GalleryTabs from './GalleryTabs';
import AOS from "aos";
import "aos/dist/aos.css";

// Konfigurasi tab galeri
const galleryTabs = [
  { label: "Semua", value: "all" },
  { label: "Minimalis", value: "minimalis" },
  { label: "Glossy", value: "glossy" },
  { label: "Cute", value: "cute" },
  { label: "Glitter", value: "glitter" },
];

// Efek AOS variasi
const aosEffects = ["fade-up", "zoom-in", "flip-left", "fade-down", "fade-right"];

// Breakpoints Masonry
const breakpointColumnsObj = {
  default: 4,
  1100: 3,
  700: 2,
  500: 1
};

export default function GallerySection() {
  const [activeTab, setActiveTab] = useState("all");
  const [galleryImages, setGalleryImages] = useState([]);
  const [loading, setLoading] = useState(true);

  // Ambil data dari API
  useEffect(() => {
    axios
      .get("http://localhost:8000/api/gallery-images/")
      .then((res) => setGalleryImages(res.data))
      .finally(() => setLoading(false));
  }, []);

  // Filter gambar sesuai tab aktif
  const filteredImages =
    activeTab === "all"
      ? galleryImages
      : galleryImages.filter((img) => img.type === activeTab);

  // Hanya tampilkan 7 foto saja
  const visibleImages = filteredImages.slice(0, 7);

  // Inisialisasi AOS hanya sekali
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: false,
      mirror: true,
      easing: 'ease-in-out'
    });
  }, []);

  // Refresh AOS setiap gambar berubah (misal: ganti tab)
  useEffect(() => {
    AOS.refresh();
  }, [visibleImages]);

  return (
    <section className="py-16 bg-tertiary/20">
      <div className="container mx-auto px-4">
        {/* Header Galeri Animasi */}
        <AnimatedGalleryHeader />

        {/* Filter Tabs */}
        <GalleryTabs
          galleryTabs={galleryTabs}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />

        {/* Gallery Masonry Grid */}
        {loading ? (
          <div className="text-center py-12">Loading...</div>
        ) : (
          <Masonry
            breakpointCols={breakpointColumnsObj}
            className="flex w-auto -ml-4"
            columnClassName="pl-4"
          >
            {visibleImages.length > 0 ? (
              visibleImages.map((img, i) => (
                <div
                  key={img.id}
                  className="mb-4 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all bg-white"
                  data-aos={aosEffects[i % aosEffects.length]}
                  data-aos-offset="120"
                  data-aos-delay={i * 70}
                  data-aos-duration="900"
                  data-aos-easing="ease-in-out"
                  data-aos-mirror="true"
                  data-aos-once="false"
                >
                  <img
                    src={img.image}
                    alt={img.alt}
                    className="w-full object-cover object-top transition-transform duration-300 hover:scale-105"
                  />
                </div>
              ))
            ) : (
              <div className="col-span-full text-center text-gray-500">
                Tidak ada gambar di kategori ini.
              </div>
            )}
          </Masonry>
        )}

        {/* Tombol Lihat Lebih Banyak */}
<div className="text-center mt-12">
  <a
    href="/galeri"
    className="
      inline-flex items-center justify-center
      px-8 py-3
      rounded-full
      font-semibold text-base
      bg-white/30 backdrop-blur-md border border-white/40 text-pink-600
      shadow-xl
      hover:bg-pink-500/90 hover:text-white
      hover:shadow-pink-200/80 hover:border-pink-300
      transition-all duration-200
      whitespace-nowrap
      group
      hover:animate-[button-shake_0.45s]
      relative
      "
    style={{
      boxShadow: "0 6px 22px 0 rgba(224,43,138,.16)",
      backdropFilter: "blur(6px)",
    }}
  >
    <span
      className="transition-all duration-200 group-hover:tracking-widest group-hover:text-yellow-50"
    >
      Lihat Lebih Banyak
    </span>
    <span
      className="
        inline-flex items-center ml-3
        transition-transform duration-200
        group-hover:animate-[icon-jump-right_0.6s_ease]
      "
      style={{ fontSize: 24 }}
    >
      <i className="ri-arrow-right-line"></i>
    </span>
  </a>
</div>

      </div>
    </section>
  );
}
