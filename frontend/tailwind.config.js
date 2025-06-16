/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    // "./public/index.html", // uncomment jika pakai file HTML langsung
  ],
  safelist: [
    'bg-primary/80',
    'bg-secondary/80',
    'bg-accent/80',
    'bg-nailart-pink',   // tambahkan ini jika ada safelist warna
    'bg-red-500',
    'bg-green-600',
    // tambahkan semua warna badge yang akan digunakan
  ],
  theme: {
    extend: {
      colors: {
        primary: "#ff3ba5",      // warna untuk cart & badge utama
        secondary: "#9d4edd",    // warna badge secondary
        accent: "#febc2e",       // warna badge accent (jika pakai)
        nailartPink: "#f9cee7",  // warna pink custom untuk background utama
        // tambahkan lagi jika perlu
      },
    },
  },
  plugins: [],
}


module.exports = {
  theme: {
    extend: {
      fontFamily: {
        playfair: ['"Playfair Display"', 'serif'],
        inter: ['Inter', 'sans-serif'],
      },
      animation: {
        fadeIn: "fadeIn 1s ease-out",
        fadeInUp: "fadeInUp 0.8s ease-out forwards",
      },
      keyframes: {
        fadeIn: {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        fadeInUp: {
          from: { opacity: 0, transform: "translateY(20px)" },
          to: { opacity: 1, transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};
