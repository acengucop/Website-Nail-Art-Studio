import { motion } from "framer-motion";

export default function TestimoniHeader() {
  return (
    <motion.div
      className="text-center mb-14"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
    >
      {/* Emoji Bubble */}
      <div className="relative flex justify-center mb-2">
        <div className="absolute left-1/2 top-3 -translate-x-1/2 w-32 h-16 bg-gradient-to-br from-fuchsia-100 via-pink-50 to-white blur-2xl opacity-80 rounded-full z-0" />
        <motion.span
          whileHover={{
            scale: 1.15,      // satu nilai saja
            rotate: -7,       // satu nilai saja
            transition: { type: "spring", stiffness: 300, damping: 12 }
          }}
          className="relative z-10 inline-block text-5xl md:text-6xl bg-gradient-to-tr from-fuchsia-400 via-pink-400 to-fuchsia-200 bg-clip-text text-transparent drop-shadow-md cursor-pointer select-none"
          style={{ filter: "drop-shadow(0 2px 24px #f0abfc44)" }}
        >
          💅
        </motion.span>
      </div>

      {/* Title */}
      <motion.h2
        whileHover={{
          scale: 1.08,      // satu nilai saja
          skewY: 2.5,       // satu nilai saja
          transition: { type: "spring", stiffness: 320, damping: 10 }
        }}
        className="relative text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-600 via-pink-400 to-pink-300 drop-shadow-xl tracking-wide mb-4 cursor-pointer select-none"
        style={{ textShadow: "0 4px 24px #f5d0fe44, 0 1px 0 #fff8" }}
      >
        Testimoni Pelanggan
        <span className="block mx-auto mt-2 w-24 h-1 rounded-full bg-gradient-to-r from-fuchsia-300 via-pink-400 to-fuchsia-400 blur-[2px] shadow-lg shadow-pink-200/40" />
      </motion.h2>

      {/* Subtitle */}
      <motion.p
        className="text-gray-500 max-w-2xl mx-auto font-medium md:text-lg"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.7, ease: "easeOut" }}
        style={{ letterSpacing: ".01em", lineHeight: 1.7 }}
      >
        Apa kata pelanggan kami tentang layanan nail art kami ✨
      </motion.p>
    </motion.div>
  );
}
