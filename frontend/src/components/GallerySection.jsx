import React, { useState } from "react";

const galleryTabs = [
  { label: "Semua", value: "all" },
  { label: "Minimalis", value: "minimalis" },
  { label: "Glossy", value: "glossy" },
  { label: "Cute", value: "cute" },
  { label: "Glitter", value: "glitter" },
];

// Dummy data untuk contoh
const galleryImages = [
  {
    src: "https://readdy.ai/api/search-image?query=minimalist%20nail%20art%20design%2C%20elegant%20simple%20nails%2C%20soft%20pink%20and%20white%20colors%2C%20clean%20lines%2C%20professional%20manicure%2C%20close-up%20of%20hands%2C%20high-quality%20nail%20photography%2C%20soft%20lighting&width=500&height=500&seq=8&orientation=squarish",
    alt: "Minimalist Nails",
    type: "minimalis",
  },
  {
    src: "https://readdy.ai/api/search-image?query=glossy%20nail%20design%2C%20high-shine%20manicure%2C%20elegant%20pink%20nails%20with%20glossy%20finish%2C%20professional%20nail%20art%2C%20close-up%20of%20hands%2C%20luxury%20nail%20salon%20result%2C%20high-quality%20nail%20photography&width=500&height=500&seq=9&orientation=squarish",
    alt: "Glossy Nails",
    type: "glossy",
  },
  {
    src: "https://readdy.ai/api/search-image?query=cute%20nail%20art%20with%20small%20decorative%20elements%2C%20playful%20nail%20design%2C%20pastel%20colors%2C%20small%20hearts%20or%20flowers%2C%20professional%20manicure%2C%20close-up%20of%20hands%2C%20high-quality%20nail%20photography&width=500&height=500&seq=10&orientation=squarish",
    alt: "Cute Nails",
    type: "cute",
  },
  {
    src: "https://readdy.ai/api/search-image?query=glitter%20nail%20art%2C%20sparkly%20manicure%2C%20elegant%20nails%20with%20glitter%20accents%2C%20professional%20nail%20design%2C%20close-up%20of%20hands%2C%20luxury%20nail%20result%2C%20high-quality%20nail%20photography&width=500&height=500&seq=11&orientation=squarish",
    alt: "Glitter Nails",
    type: "glitter",
  },
  {
    src: "https://readdy.ai/api/search-image?query=french%20manicure%20with%20twist%2C%20modern%20take%20on%20classic%20french%20tips%2C%20elegant%20nail%20design%2C%20professional%20manicure%2C%20close-up%20of%20hands%2C%20high-quality%20nail%20photography&width=500&height=500&seq=12&orientation=squarish",
    alt: "French Manicure",
    type: "minimalis",
  },
  {
    src: "https://readdy.ai/api/search-image?query=geometric%20nail%20art%2C%20modern%20abstract%20nail%20design%2C%20elegant%20pattern%20on%20nails%2C%20professional%20manicure%2C%20close-up%20of%20hands%2C%20high-quality%20nail%20photography&width=500&height=500&seq=13&orientation=squarish",
    alt: "Geometric Nails",
    type: "minimalis",
  },
  {
    src: "https://readdy.ai/api/search-image?query=ombre%20nail%20design%2C%20gradient%20color%20nails%2C%20soft%20transition%20between%20colors%2C%20professional%20manicure%2C%20close-up%20of%20hands%2C%20high-quality%20nail%20photography&width=500&height=500&seq=14&orientation=squarish",
    alt: "Ombre Nails",
    type: "glossy",
  },
  {
    src: "https://readdy.ai/api/search-image?query=3D%20nail%20art%20with%20rhinestones%2C%20luxury%20nail%20design%20with%20decorative%20elements%2C%20professional%20manicure%2C%20close-up%20of%20hands%2C%20high-quality%20nail%20photography&width=500&height=500&seq=15&orientation=squarish",
    alt: "3D Nails",
    type: "glitter",
  },
];

export default function GallerySection() {
  const [activeTab, setActiveTab] = useState("all");

  // Filter images sesuai tab
  const filteredImages =
    activeTab === "all"
      ? galleryImages
      : galleryImages.filter((img) => img.type === activeTab);

  return (
    <section className="py-16 bg-tertiary/20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-3">Galeri Nail Art</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Inspirasi desain kuku terbaik dari salon kami
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex bg-white p-1 rounded-full shadow-sm">
            {galleryTabs.map((tab) => (
              <button
                key={tab.value}
                className={`px-4 py-2 text-sm font-medium rounded-full whitespace-nowrap transition-all ${
                  activeTab === tab.value
                    ? "bg-primary text-white"
                    : "text-gray-700 hover:text-primary"
                }`}
                onClick={() => setActiveTab(tab.value)}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredImages.map((img, i) => (
            <div
              key={i}
              className="gallery-item rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all"
            >
              <img
                src={img.src}
                alt={img.alt}
                className="w-full h-64 object-cover object-top transition-transform duration-300 hover:scale-105"
              />
            </div>
          ))}
        </div>

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
