import { motion } from "framer-motion";

export default function AnimatedGalleryHeader() {
  return (
    <div className="text-center mb-12 select-none">
      {/* Judul dengan font cantik & animasi */}
      <motion.h2
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, type: "spring" }}
        whileHover={{
          scale: 1.05,
          color: "#E02B8A", // pink cantik, bisa diganti
          textShadow: "0 4px 32px rgba(224,43,138,0.25)"
        }}
        className="text-4xl md:text-5xl font-bold mb-3"
        style={{
          fontFamily: "'Dancing Script', 'Playfair Display', cursive, serif",
          letterSpacing: ".03em",
          transition: "all 0.3s"
        }}
      >
        Galeri Nail Art
      </motion.h2>

      {/* Subjudul dengan animasi lembut */}
      <motion.p
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.9, type: "spring" }}
        className="text-gray-600 max-w-2xl mx-auto text-lg md:text-xl font-light"
        style={{
          fontFamily: "'Playfair Display', serif",
          fontStyle: "italic",
          color: "#B25D88"
        }}
        whileHover={{
          color: "#E02B8A"
        }}
      >
        Inspirasi desain kuku terbaik dari salon kami
      </motion.p>
    </div>
  );
}
