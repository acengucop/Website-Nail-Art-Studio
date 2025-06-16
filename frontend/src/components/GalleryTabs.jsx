import { motion, AnimatePresence } from "framer-motion";

const tabFont = {
  fontFamily: "'Playfair Display', 'Dancing Script', cursive, serif",
  letterSpacing: ".02em"
};

export default function GalleryTabs({ galleryTabs, activeTab, setActiveTab }) {
  return (
    <div className="flex justify-center mb-10">
      <div className="inline-flex bg-white/90 backdrop-blur p-2 rounded-full shadow-lg border border-pink-100">
        {galleryTabs.map((tab) => {
          const isActive = activeTab === tab.value;
          return (
            <motion.button
              key={tab.value}
              onClick={() => setActiveTab(tab.value)}
              style={tabFont}
              className={`relative px-6 py-2 text-base font-semibold rounded-full mx-1 transition-all
                ${
                  isActive
                    ? "text-white shadow-pink-200"
                    : "text-pink-600 hover:text-pink-400"
                }`}
              whileHover={{
                scale: 1.07,
                boxShadow: "0 4px 24px rgba(224,43,138,0.11)",
                backgroundColor: isActive ? "#E02B8A" : "#FCE4EC",
              }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              animate={{
                backgroundColor: isActive ? "#E02B8A" : "#fff",
                color: isActive ? "#fff" : "#E02B8A",
                boxShadow: isActive
                  ? "0 4px 24px rgba(224,43,138,0.16)"
                  : "0 1px 4px rgba(224,43,138,0.08)",
              }}
            >
              <span className="relative z-10">{tab.label}</span>
              {/* Glow animasi */}
              <AnimatePresence>
                {isActive && (
                  <motion.div
                    layoutId="tab-glow"
                    className="absolute inset-0 rounded-full bg-pink-400/30 blur-md z-0"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  />
                )}
              </AnimatePresence>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
