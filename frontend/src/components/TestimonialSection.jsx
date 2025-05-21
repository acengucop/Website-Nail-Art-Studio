import React from "react";

const testimonials = [
  {
    img: "https://readdy.ai/api/search-image?query=professional%20headshot%20of%20Indonesian%20woman%20in%20her%2030s%2C%20friendly%20smile%2C%20elegant%20appearance%2C%20soft%20lighting%2C%20neutral%20background%2C%20high-quality%20portrait&width=100&height=100&seq=16&orientation=squarish",
    name: "Anita Wijaya",
    rating: 5,
    review:
      "Saya sangat puas dengan hasil nail art dari salon ini. Desainnya cantik dan tahan lama. Teknisi kuku sangat profesional dan ramah. Pasti akan kembali lagi!",
  },
  {
    img: "https://readdy.ai/api/search-image?query=professional%20headshot%20of%20Indonesian%20woman%20in%20her%2020s%2C%20casual%20style%2C%20friendly%20smile%2C%20soft%20lighting%2C%20neutral%20background%2C%20high-quality%20portrait&width=100&height=100&seq=17&orientation=squarish",
    name: "Dian Sastrowardoyo",
    rating: 4.5,
    review:
      "Pengalaman booking online sangat mudah. Saya suka dengan koleksi nail art yang up-to-date. Hasilnya selalu mendapat banyak pujian dari teman-teman. Terima kasih Nail Studio!",
  },
  {
    img: "https://readdy.ai/api/search-image?query=professional%20headshot%20of%20Indonesian%20woman%20in%20her%2040s%2C%20elegant%20business%20attire%2C%20confident%20smile%2C%20soft%20lighting%2C%20neutral%20background%2C%20high-quality%20portrait&width=100&height=100&seq=18&orientation=squarish",
    name: "Maya Soetoro",
    rating: 5,
    review:
      "Sebagai pelanggan tetap selama 2 tahun, saya selalu puas dengan layanan di sini. Produk yang dijual juga berkualitas tinggi. Saya sudah merekomendasikan ke banyak teman dan keluarga.",
  },
];

function renderStars(rating) {
  // Render star icons, support for 0.5 stars
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    if (rating >= i) {
      stars.push(<i key={i} className="ri-star-fill text-yellow-400"></i>);
    } else if (rating >= i - 0.5) {
      stars.push(<i key={i} className="ri-star-half-fill text-yellow-400"></i>);
    } else {
      stars.push(<i key={i} className="ri-star-line text-yellow-400"></i>);
    }
  }
  return <div className="flex">{stars}</div>;
}

export default function TestimonialSection() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-3">
            Testimoni Pelanggan
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Apa kata pelanggan kami tentang layanan nail art kami
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className="testimonial-card bg-white rounded-lg p-6 shadow-md transition-transform hover:-translate-y-1"
            >
              <div className="flex items-center mb-4">
                <img
                  src={t.img}
                  alt={t.name}
                  className="w-12 h-12 rounded-full object-cover object-top"
                />
                <div className="ml-4">
                  <h4 className="font-bold text-gray-900">{t.name}</h4>
                  {renderStars(t.rating)}
                </div>
              </div>
              <p className="text-gray-600">&quot;{t.review}&quot;</p>
            </div>
          ))}
        </div>

        <div className="flex justify-center mt-10">
          <div className="flex space-x-2">
            <button className="w-3 h-3 rounded-full bg-primary"></button>
            <button className="w-3 h-3 rounded-full bg-gray-300 hover:bg-primary/50"></button>
            <button className="w-3 h-3 rounded-full bg-gray-300 hover:bg-primary/50"></button>
          </div>
        </div>
      </div>
    </section>
  );
}
