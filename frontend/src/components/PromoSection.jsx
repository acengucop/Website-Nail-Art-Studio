import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

// Helper: Format Rupiah
function formatRupiah(num) {
  if (!num) return "";
  return "Rp " + Number(num).toLocaleString("id-ID");
}

// Helper: Format tanggal ke bahasa Indonesia
function formatTanggal(dateStr) {
  if (!dateStr) return "";
  const bulan = [
    "Januari", "Februari", "Maret", "April", "Mei", "Juni",
    "Juli", "Agustus", "September", "Oktober", "November", "Desember"
  ];
  const [year, month, day] = dateStr.split("-");
  return `${parseInt(day)} ${bulan[parseInt(month) - 1]} ${year}`;
}

// Hitung sisa hari untuk highlight otomatis
function getDaysLeft(endDate) {
  if (!endDate) return null;
  const now = new Date();
  const end = new Date(endDate);
  end.setHours(0, 0, 0, 0);
  now.setHours(0, 0, 0, 0);
  const diffTime = end - now;
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
}

function isAlmostExpired(endDate, threshold = 3) {
  const daysLeft = getDaysLeft(endDate);
  return daysLeft !== null && daysLeft <= threshold && daysLeft >= 0;
}

// Live countdown (jam:menit:detik)
function getTimeLeft(endDateStr) {
  if (!endDateStr) return null;
  const now = new Date();
  const endDate = new Date(endDateStr + "T23:59:59");
  const diff = endDate - now;
  if (diff <= 0) return null;
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);
  return { days, hours, minutes, seconds, total: diff };
}

function getCountdownNotice(countdown) {
  if (!countdown || countdown.total <= 0) return "Promo telah berakhir";
  if (countdown.days > 1) return "Masih ada waktu, jangan lewatkan promonya!";
  if (countdown.days === 1) return "Hari terakhir promo! Buruan booking ✨";
  return "Promo berakhir dalam hitungan jam!";
}


export default function PromoSection() {
  const [promos, setPromos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [countdowns, setCountdowns] = useState([]);
  const [selectedPromo, setSelectedPromo] = useState(null);

  // Brand color palette
  const brandColors = {
    primary: "#eea1cd",  // Brand signature pink
    secondary: "#f9f0f5", // Light pink background
    accent: "#dbabca",   // Deeper pink accent
    neutral: "#f8f8f8",  // Light neutral
    text: "#4a4a4a",     // Text color
    gold: "#d4af37"      // Luxury accent
  };

  // Fetch promo data
  useEffect(() => {
    fetch("http://localhost:8000/api/promo/")
      .then((res) => res.json())
      .then((data) => {
        setPromos(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  // Update all countdowns every second
  useEffect(() => {
    if (!promos.length) return;
    const updateCountdowns = () => {
      setCountdowns(
        promos.map((promo) => getTimeLeft(promo.end_date))
      );
    };
    updateCountdowns();
    const interval = setInterval(updateCountdowns, 1000);
    return () => clearInterval(interval);
  }, [promos]);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  function renderCountdown(promo, idx) {
  const countdown = countdowns[idx];
  const notice = getCountdownNotice(countdown);

  if (!promo.end_date)
    return null;
  if (!countdown || countdown.total <= 0)
    return (
      <div className="flex flex-col items-end gap-1">
        <span className="inline-flex items-center gap-1 bg-rose-100 text-rose-400 px-2 py-1 rounded text-xs font-semibold animate-pulse">
          <svg width="14" height="14" fill="currentColor" className="inline"><circle cx="7" cy="7" r="6"/></svg>
          Promo telah berakhir
        </span>
        <span className="text-[11px] text-gray-400 italic">Yuk cek promo berikutnya!</span>
      </div>
    );

  // Label lebih visual dan friendly
  return (
    <div className="flex flex-col items-end gap-1">
      <span className={`inline-flex items-center gap-1 px-2 py-1 rounded text-xs font-semibold 
        ${countdown.days === 0 ? "bg-gradient-to-r from-pink-500 to-rose-400 text-white shadow"
                               : "bg-rose-50 text-rose-500 border border-rose-200"}`}>
        <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.7" className="inline">
          <circle cx="8" cy="8" r="7" strokeOpacity=".3"/>
          <path d="M8 4v4l2 2" strokeLinecap="round"/>
        </svg>
        {countdown.days > 0 && <span className="font-bold">{countdown.days} hari</span>}
        <span>
          {String(countdown.hours).padStart(2, "0")}:
          {String(countdown.minutes).padStart(2, "0")}:
          {String(countdown.seconds).padStart(2, "0")}
        </span>
      </span>
      <span className={`text-[11px] italic font-medium transition-all 
        ${countdown.days <= 1 ? "text-pink-500" : "text-gray-400"}`}>
        {notice}
      </span>
    </div>
  );
}


  // Modal for promo details - fixed to prevent flickering
  const PromoModal = ({ promo, onClose }) => {
    if (!promo) return null;
    
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
        <div 
          className="bg-white rounded-xl overflow-hidden max-w-xl w-full mx-4 shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="relative">
            <img
              src={
                promo.image?.startsWith("http")
                ? promo.image
                : `http://localhost:8000${promo.image}`
              }
              alt={promo.title}
              className="w-full h-64 object-cover object-center"
              onError={(e) => (e.target.src = "/no-promo.svg")}
            />
            <button 
              onClick={onClose}
              className="absolute top-4 right-4 bg-white bg-opacity-80 rounded-full p-2 hover:bg-opacity-100 transition-all"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          <div className="p-6">
            <h3 className="text-2xl font-light mb-2 text-gray-800">{promo.title}</h3>
            <p className="text-gray-600 mb-4">{promo.description}</p>
            
            <div className="flex justify-between items-center mb-4 border-t border-b border-gray-100 py-4">
              <div>
                {promo.old_price && (
                  <span className="text-gray-400 line-through text-sm mr-2">
                    {formatRupiah(promo.old_price)}
                  </span>
                )}
                <span className="text-gray-800 font-medium text-xl">
                  {formatRupiah(promo.price)}
                </span>
              </div>
              
              <div className="text-xs text-gray-500">
                {formatTanggal(promo.start_date)} - {formatTanggal(promo.end_date)}
              </div>
            </div>
            
            <button 
              className="w-full py-3 text-white rounded-md hover:opacity-90 transition-all font-medium tracking-wide"
              style={{ backgroundColor: brandColors.primary }}
            >
              Book This Offer
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <section 
      className="py-24 relative overflow-hidden"
      style={{ backgroundColor: brandColors.secondary }}
    >
      {/* Background decoration elements */}
      <div className="absolute top-0 left-0 w-64 h-64 rounded-full opacity-10" style={{ backgroundColor: brandColors.primary, filter: 'blur(80px)', transform: 'translate(-30%, -30%)' }}></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full opacity-10" style={{ backgroundColor: brandColors.primary, filter: 'blur(100px)', transform: 'translate(40%, 40%)' }}></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="font-extralight text-4xl md:text-5xl tracking-wide mb-4"
            style={{ color: brandColors.text }}
          >
            <span className="relative">
              Exclusive Offers
              <motion.span 
                initial={{ width: 0 }}
                whileInView={{ width: '100%' }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="absolute -bottom-2 left-0 h-px bg-gradient-to-r from-transparent via-pink-300 to-transparent"
              ></motion.span>
            </span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-gray-500 max-w-md mx-auto"
          >
            Discover our curated selection of nail art experiences designed to elevate your beauty routine
          </motion.p>
        </div>

        {loading ? (
          <div className="flex justify-center py-24">
            <div className="w-10 h-10 rounded-full border-2 border-t-transparent" style={{ borderColor: brandColors.accent, borderTopColor: 'transparent' }}>
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="w-full h-full"
              ></motion.div>
            </div>
          </div>
        ) : promos.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <img
              src="/no-promo.svg"
              alt="No promotions available"
              className="w-20 h-20 mx-auto mb-4 opacity-60"
            />
            <p className="text-gray-400 font-light">
              No current promotions available. Please check back soon.
            </p>
          </motion.div>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto"
          >
            {/* Wrapper untuk menampung card-card promo */}
            <div className="flex justify-center items-start col-span-full">
              {/* Container untuk card yang disesuaikan lebarnya berdasarkan jumlah promo */}
              <div className={`grid gap-8 w-full ${
                promos.length === 1 
                  ? 'grid-cols-1 max-w-md' 
                  : promos.length === 2 
                    ? 'grid-cols-1 md:grid-cols-2 max-w-4xl' 
                    : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 max-w-6xl'
              }`}>
                {promos.map((promo, idx) => {
                  const isExpiring = isAlmostExpired(promo.end_date);
                  
                  return (
                    <motion.div
                      key={promo.id || idx}
                      variants={cardVariants}
                      className={`bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 group`}
                    >
                      <div className="relative overflow-hidden">
                        <img
                          src={
                            promo.image?.startsWith("http")
                              ? promo.image
                              : `http://localhost:8000${promo.image}`
                          }
                          alt={promo.title}
                          className="w-full h-64 object-cover object-center transition-transform duration-700 group-hover:scale-105"
                          loading="lazy"
                          onError={(e) => (e.target.src = "/no-promo.svg")}
                        />
                        
                        {/* Label badge with subtle animation */}
                        {(promo.label || isExpiring) && (
                          <div 
                            className={`absolute top-4 left-0 py-1 px-3 text-white text-xs tracking-wider font-light flex items-center ${isExpiring ? "bg-gradient-to-r from-rose-400 to-pink-400" : "bg-opacity-90"}`}
                            style={{ backgroundColor: isExpiring ? undefined : brandColors.primary }}
                          >
                            <span>{promo.label || (isExpiring ? "Limited Time" : "")}</span>
                            {isExpiring && (
                              <motion.span 
                                animate={{ opacity: [0.5, 1, 0.5] }}
                                transition={{ duration: 2, repeat: Infinity }}
                                className="ml-1"
                              >
                                ✨
                              </motion.span>
                            )}
                          </div>
                        )}
                      </div>
                      
                      <div className="p-5">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="text-lg font-light text-gray-800">
                            {promo.title}
                          </h3>
                          {renderCountdown(promo, idx)}
                        </div>
                        
                        <p className="text-gray-500 text-sm mb-4 line-clamp-2 font-light">
                          {promo.description}
                        </p>
                        
                        <div className="flex justify-between items-center">
                          <div>
                            {promo.old_price && (
                              <div className="text-gray-400 line-through text-xs mb-1">
                                {formatRupiah(promo.old_price)}
                              </div>
                            )}
                            <div className="font-medium" style={{ color: brandColors.text }}>
                              {formatRupiah(promo.price)}
                            </div>
                          </div>
                          
                          <button
                            onClick={() => setSelectedPromo(promo)}
                            className="text-xs uppercase tracking-wider py-2 px-4 rounded border transition-all hover:bg-gray-50"
                            style={{ borderColor: brandColors.primary, color: brandColors.text }}
                          >
                            Details
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </motion.div>
        )}
      </div>
      
      {/* Modal - Fixed implementation to prevent flickering */}
      {selectedPromo && (
        <PromoModal promo={selectedPromo} onClose={() => setSelectedPromo(null)} />
      )}
    </section>
  );
}