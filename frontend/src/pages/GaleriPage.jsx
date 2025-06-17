import React, { useState, useEffect } from "react";
import axios from "axios";
import Masonry from "react-masonry-css";
import AnimatedGalleryHeader from "../components/AnimatedGalleryHeader";  // <== sesuaikan path
import GalleryTabs from "../components/GalleryTabs";                    // <== sesuaikan path
import AOS from "aos";
import "aos/dist/aos.css";


// Array tab kategori
const galleryTabs = [
  { label: "Semua", value: "all" },
  { label: "Minimalis", value: "minimalis" },
  { label: "Glossy", value: "glossy" },
  { label: "Cute", value: "cute" },
  { label: "Glitter", value: "glitter" },
];

const aosEffects = ["fade-up", "zoom-in", "flip-left", "fade-down", "fade-right"];
const breakpointColumnsObj = {
  default: 4,
  1100: 3,
  700: 2,
  500: 1
};

export default function Galeri() {
  const [activeTab, setActiveTab] = useState("all");
  const [galleryImages, setGalleryImages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/gallery-images/")
      .then((res) => setGalleryImages(res.data))
      .finally(() => setLoading(false));
  }, []);

  // FILTER GAMBAR SESUAI TAB
  const filteredImages =
    activeTab === "all"
      ? galleryImages
      : galleryImages.filter((img) => img.type === activeTab);

  useEffect(() => {
    AOS.init({
      duration: 800,
      once: false,
      mirror: true,
      easing: 'ease-in-out'
    });
  }, []);

  useEffect(() => {
    AOS.refresh();
  }, [filteredImages]);

  return (
    <section className="py-16 bg-tertiary/20 min-h-screen">
      <div className="container mx-auto px-4">
        <AnimatedGalleryHeader />

        {/* FILTER TABS */}
        <GalleryTabs
          galleryTabs={galleryTabs}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />

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
                  data-aos-delay={i * 50}
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
                Tidak ada gambar galeri.
              </div>
            )}
          </Masonry>
        )}

{/* Tombol Kembali di pojok kiri atas */}
<button
  type="button"
  onClick={() => window.history.back()}
  className="
    fixed top-6 left-6 z-[999]
    bg-white/30 backdrop-blur-md border border-white/40
    text-pink-600
    px-4 py-2 rounded-full shadow-xl
    flex items-center gap-3
    font-semibold text-base
    transition-all duration-200
    hover:bg-pink-500/90 hover:text-white
    hover:shadow-pink-200/80 hover:border-pink-300
    group
    hover:animate-[button-shake_0.45s]
    "
  style={{
    boxShadow: "0 6px 22px 0 rgba(224,43,138,.16)",
    backdropFilter: "blur(6px)",
  }}
>
  {/* Icon animasi */}
  <span
    className="
      inline-flex items-center
      transition-transform duration-200
      group-hover:animate-[icon-jump_0.6s_ease]
    "
    style={{ fontSize: 24 }}
  >
    <i className="ri-arrow-left-line"></i>
  </span>
  <span className="transition-all duration-200 group-hover:tracking-widest">
    Kembali
  </span>
</button>





      </div>
    </section>
  );
}
