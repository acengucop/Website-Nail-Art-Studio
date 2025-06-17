import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import TestimoniHeader from "./TestimoniHeader";

// ENHANCED STAR ICONS WITH GRADIENT
function renderStars(rating) {
  return (
    <div className="flex space-x-1">
      {[1, 2, 3, 4, 5].map(i =>
        rating >= i ? (
          <motion.i 
            key={i} 
            className="ri-star-fill text-transparent bg-clip-text bg-gradient-to-r from-rose-400 to-pink-500 text-lg"
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: i * 0.1, type: "spring", stiffness: 200 }}
          />
        ) : rating >= i - 0.5 ? (
          <motion.i 
            key={i} 
            className="ri-star-half-fill text-rose-300 text-lg"
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: i * 0.1, type: "spring", stiffness: 200 }}
          />
        ) : (
          <i key={i} className="ri-star-line text-gray-300 text-lg" />
        )
      )}
    </div>
  );
}

// LUXURIOUS ANIMATED CARD WITH GLASSMORPHISM
function TestimonialCard({ t }) {
  const { img, name, rating, review } = t;
  
  return (
    <motion.div
      className="w-[320px] flex-shrink-0 relative group"
      whileHover={{ y: -8 }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
    >
      {/* Glowing background effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-rose-300/20 to-fuchsia-400/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      {/* Main card */}
      <div className="relative bg-white/80 backdrop-blur-lg rounded-3xl p-8 shadow-xl border border-white/50 overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-rose-200/30 to-transparent rounded-bl-full" />
        <div className="absolute bottom-0 left-0 w-16 h-16 bg-gradient-to-tr from-fuchsia-200/30 to-transparent rounded-tr-full" />
        
        {/* Profile section */}
        <div className="flex items-center mb-6 relative z-10">
          <div className="relative">
            {/* Profile image with glowing ring */}
            <div className="absolute inset-0 bg-gradient-to-r from-rose-400 to-fuchsia-500 rounded-full p-0.5 animate-pulse">
              <div className="w-full h-full bg-white rounded-full" />
            </div>
            <img
              src={img.startsWith("http") ? img : `http://localhost:8000${img}`}
              alt={name}
              className="relative w-16 h-16 rounded-full object-cover border-2 border-white shadow-lg"
            />
            {/* Sparkle effect */}
            <motion.div
              className="absolute -top-1 -right-1 w-6 h-6 bg-gradient-to-r  to-amber-400 rounded-full flex items-center justify-center"
              animate={{ rotate: 360 }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            >
              <span className="text-white text-xs">✨</span>
            </motion.div>
          </div>
          
          <div className="ml-4 flex-1">
            <motion.h4 
              className="font-bold text-xl bg-gradient-to-r from-fuchsia-600 to-rose-600 bg-clip-text text-transparent"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              {name}
            </motion.h4>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
            >
              {renderStars(Number(rating))}
            </motion.div>
          </div>
        </div>
        
        {/* Review text with elegant typography */}
        <motion.div 
          className="relative z-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          {/* Quote marks */}
          <div className="absolute -top-2 -left-2 text-4xl text-rose-200 font-serif leading-none">"</div>
          <p className="text-gray-700 text-base leading-relaxed font-medium italic pl-6 pr-4 relative">
            {review}
          </p>
          <div className="absolute -bottom-4 -right-2 text-4xl text-rose-200 font-serif leading-none rotate-180">"</div>
        </motion.div>
        
        {/* Floating beauty icons */}
        <motion.div
          className="absolute top-4 right-4 text-rose-300 opacity-20"
          animate={{ 
            y: [0, -10, 0],
            rotate: [0, 5, -5, 0]
          }}
          transition={{ 
            duration: 4, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
        >
          <i className="ri-sparkling-2-fill text-2xl" />
        </motion.div>
      </div>
    </motion.div>
  );
}

export default function TestimonialSection() {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:8000/api/testimonials/")
      .then(res => res.json())
      .then(data => {
        setTestimonials(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  // Dynamic loop duration
  const loopDuration = Math.max(12, testimonials.length * 4);

  return (
    <section className="py-24 relative overflow-hidden">
      {/* Enhanced gradient background with beauty theme */}
      <div className="absolute inset-0 bg-gradient-to-br from-rose-50 via-pink-50 to-fuchsia-50" />
      
      {/* Floating beauty elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-20 left-10 text-rose-200/30 text-6xl"
          animate={{ 
            y: [0, -20, 0],
            rotate: [0, 360]
          }}
          transition={{ 
            duration: 8, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
        >
          💐
        </motion.div>
        
        <motion.div
          className="absolute top-32 right-20 text-fuchsia-200/30 text-4xl"
          animate={{ 
            y: [0, 15, 0],
            x: [0, 10, 0]
          }}
          transition={{ 
            duration: 6, 
            repeat: Infinity, 
            ease: "easeInOut",
            delay: 1
          }}
        >
          ✨
        </motion.div>
        
        <motion.div
          className="absolute bottom-20 left-1/4 text-rose-200/20 text-5xl"
          animate={{ 
            rotate: [0, -360],
            scale: [1, 1.1, 1]
          }}
          transition={{ 
            duration: 10, 
            repeat: Infinity, 
            ease: "linear"
          }}
        >
          🌸
        </motion.div>
        
        <motion.div
          className="absolute bottom-32 right-1/3 text-pink-200/30 text-3xl"
          animate={{ 
            y: [0, -25, 0],
            opacity: [0.3, 0.6, 0.3]
          }}
          transition={{ 
            duration: 7, 
            repeat: Infinity, 
            ease: "easeInOut",
            delay: 2
          }}
        >
          💄
        </motion.div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <TestimoniHeader />

        {loading ? (
          <div className="text-center py-20">
            <motion.div
              className="inline-flex items-center space-x-3 bg-white/80 backdrop-blur-sm rounded-full px-8 py-4 shadow-lg"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <div className="w-6 h-6 bg-gradient-to-r from-rose-400 to-fuchsia-500 rounded-full animate-pulse" />
              <span className="text-gray-600 font-medium">Memuat testimoni...</span>
            </motion.div>
          </div>
        ) : testimonials.length === 1 ? (
          <motion.div 
            className="flex justify-center"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, type: "spring" }}
          >
            <TestimonialCard t={testimonials[0]} />
          </motion.div>
        ) : (
          <div className="overflow-hidden py-8">
            <motion.div
              className="flex gap-8"
              animate={{ x: ["0%", "-50%"] }}
              transition={{
                x: {
                  repeat: Infinity,
                  repeatType: "loop",
                  duration: loopDuration,
                  ease: "linear"
                }
              }}
            >
              {[...testimonials, ...testimonials].map((t, i) => (
                <TestimonialCard t={t} key={i} />
              ))}
            </motion.div>
          </div>
        )}
      </div>
      
      {/* Bottom gradient overlay */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white/50 to-transparent pointer-events-none" />
    </section>
  );
}