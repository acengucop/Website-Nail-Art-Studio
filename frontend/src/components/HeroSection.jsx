import React from 'react';
import { motion } from 'framer-motion';
import { AiOutlineCalendar, AiOutlinePicture } from 'react-icons/ai';
import { Typewriter } from 'react-simple-typewriter';


export default function HeroSection({ id, className = '' }) {
  return (
    <section
      id={id}
      className={`relative min-h-screen flex items-center overflow-hidden ${className}`}>
      {/* Background & Overlay tetap */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage:
            "url('https://readdy.ai/api/search-image?query=close-up%20professional%20nail%20art%20manicure%20with%20soft%20pink%20and%20white%20colors%2C%20elegant%20nail%20design%2C%20high-end%20salon%20atmosphere%2C%20feminine%20aesthetic%2C%20soft%20lighting%2C%20minimalist%20background%2C%20high-quality%20detailed%20nails%2C%20professional%20photography&width=1600&height=800&seq=1&orientation=landscape')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'brightness(0.88)',
        }}
        aria-hidden="true"
      />
      <div className="absolute inset-0 bg-gradient-to-br from-white/85 via-white/60 to-pink-100/30 z-0"></div>

      {/* Content */}
      <div className="relative z-10 w-full">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center min-h-screen">
          <div className="w-full md:w-1/2 flex flex-col justify-center py-16 md:py-0">
            {/* Headline + Typewriter */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="mb-6"
              style={{
                minHeight: "100px", // Biarkan ruang cukup, agar animasi typewriter tidak menggeser-geser layout bawah
                display: "flex",
                alignItems: "flex-end"
              }}
            >
              <h1
                className="
                  w-full max-w-2xl text-4xl md:text-6xl font-extrabold leading-tight
                  [text-shadow:_0_0_8px_#fe019a33,0_0_24px_#fe019a66]
                  "
                style={{
                  color: '#fe019a',
                  textShadow: `
                    0 0 4px #fe019a88,
                    0 0 12px #fe019a,
                    0 0 20px #fff2,
                    0 0 32px #fe019a33
                  `,
                  letterSpacing: '.5px',
                  minHeight: '56px', // untuk menjaga 2 baris agar tetap rapi
                  lineHeight: 1.18,
                  margin: 0,
                  padding: 0,
                  background: 'transparent'
                }}
              >
                {/* Bungkus Typewriter dalam block agar tidak "meloncat" */}
<Typewriter
  words={[
    'Booking Nail Art Cantik Sekarang, Mudah & Cepat!'
  ]}
  loop={0}
  cursor
  cursorStyle="_"
  typeSpeed={60}
  deleteSpeed={30}
  delaySpeed={1400}
/>



              </h1>
            </motion.div>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6, ease: "easeOut" }}
              className="text-lg md:text-xl text-gray-700 mb-10 max-w-lg md:max-w-xl"
              style={{

              }}
            >
              <span style={{
                color: '#fe019a',
                fontWeight: 600,
                textShadow: '0 0 6px #fe019a66',
              }}>
                Dapatkan perawatan kuku profesional
              </span>
              {" "}dengan desain eksklusif, hanya di studio kami.<br />
              <span style={{
                color: '#fe019a',
                fontWeight: 600,
                textShadow: '0 0 6px #fe019a66',
              }}>
                Pesan sekarang, tampil beda tiap hari!
              </span>
            </motion.p>

            {/* Buttons tetap */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="flex flex-col sm:flex-row gap-4"
            >
<a
  href="/booking"
  className="
    inline-flex items-center justify-center px-8 py-4
    font-semibold text-lg
    rounded-2xl
    bg-gradient-to-r from-pink-500 via-pink-400 to-pink-600
    shadow-xl
    transition-all duration-200
    hover:scale-105 hover:shadow-[0_6px_32px_#fe019a55]
    hover:from-pink-600 hover:to-pink-400
    group
  "
  style={{
    color: '#fff',
    boxShadow: "0 4px 24px #fe019a55"
  }}
>
  <span
    className="
      inline-flex items-center justify-center w-9 h-9 mr-3
      rounded-full bg-white/20
      transition-transform duration-200
      group-hover:translate-x-1 group-hover:-rotate-12
    "
  >
    <AiOutlineCalendar size={28} />
  </span>
  Book Sekarang
</a>
            </motion.div>
          </div>
          <div className="hidden md:block w-1/2"></div>
        </div>
      </div>
    </section>
  );
}
