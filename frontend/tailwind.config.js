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
