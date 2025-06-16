import React, { useState, useEffect } from "react";
import axios from "axios";
import Masonry from "react-masonry-css";
import AnimatedGalleryHeader from './AnimatedGalleryHeader'; // path sesuai folder kamu
import GalleryTabs from './GalleryTabs'; // path sesuai folder kamu
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
  }, [filteredImages]);

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
            {filteredImages.length > 0 ? (
              filteredImages.map((img, i) => (
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
            href="#"
            className="inline-flex items-center justify-center px-6 py-3 bg-primary text-white font-medium rounded-button shadow-lg hover:shadow-xl transition-all whitespace-nowrap"
          >
            <span>Lihat Lebih Banyak</span>
            <i className="ri-arrow-right-line ri-lg ml-2"></i>
          </a>
        </div>
      </div>
    </section>
  );
}
