import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "../utils/axios";
import ServiceSelector from "../components/ServiceSelector";
import SlotGrid from "../components/SlotGrid";
import DatePicker from "../components/DatePicker";
import PaymentMethodSelector from "../components/PaymentMethodSelector";
import { useNavigate } from "react-router-dom";



export default function BookingPage() {
  // --- LOGIC: All state and hooks are preserved ---
  const [service, setService] = useState("");
  const [date, setDate] = useState("");
  const [slots, setSlots] = useState({});
  const [selectedSlot, setSelectedSlot] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // --- LOGIC: All data fetching and side effects are preserved ---
  const fetchSlots = useCallback(async () => {
    if (!service || !date) {
      setSlots({});
      setSelectedSlot("");
      return;
    }
    try {
      const { data } = await axios.get("/booking/availability/", {
        params: { date, service_id: service },
      });
      setSlots(data);
      if (!data[selectedSlot]) setSelectedSlot("");
    } catch {
      setSlots({});
      setSelectedSlot("");
    }
  }, [service, date, selectedSlot]);

  useEffect(() => {
    if (!service || !date) return;
    
    // Initial fetch
    fetchSlots();

    // Interval fetching
    const interval = setInterval(fetchSlots, 30000);
    return () => clearInterval(interval);
  }, [service, date, fetchSlots]);

  const isValid = service && date && selectedSlot && paymentMethod && file;

  const handleBooking = async (e) => {
    e.preventDefault();
    if (!isValid) {
      alert("Semua field harus diisi dan bukti pembayaran dipilih!");
      return;
    }
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("service_id", service);
      formData.append("date", date);
      formData.append("time", selectedSlot);
      formData.append("payment_method_id", paymentMethod);
      formData.append("payment_proof", file);

      await axios.post("/booking/create/", formData);
      alert("Booking berhasil dikirim, menunggu verifikasi admin.");
      navigate("/my-appointments");
    } catch (err) {
      const msg = err.response?.data?.error || err.response?.data?.detail || err.message || "Terjadi kesalahan.";
      alert("Gagal booking: " + msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#F9F5F6] min-h-screen py-8 px-4 font-sans">
      <motion.form
        onSubmit={handleBooking}
        className="max-w-xl mx-auto px-6 sm:px-8 py-10 space-y-8 bg-white/70 backdrop-blur-xl rounded-3xl shadow-2xl shadow-[#FBA1B7]/20 border border-white"
        initial={{ opacity: 0, y: 50, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.6 }}
          className="text-center"
        >
          <h1 className="text-4xl font-serif text-[#FBA1B7] tracking-tight">
            Book a Treatment
          </h1>
          <p className="text-md text-[#B38C9C] mt-2">
            Select a service, choose your time, and upload proof of payment ✨
          </p>
        </motion.div>

        {/* --- All child components and their animation wrappers are preserved --- */}
        <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2, duration: 0.7 }}>
          <ServiceSelector value={service} onChange={setService} />
        </motion.div>

        <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3, duration: 0.7 }}>
          <DatePicker value={date} onChange={(d) => { setDate(d); setSelectedSlot(""); }} label="Choose Booking Date" />
        </motion.div>

        <AnimatePresence>
          {Object.keys(slots).length > 0 && (
            <motion.div
              key="slots"
              initial={{ opacity: 0, scale: 0.95, height: 0 }}
              animate={{ opacity: 1, scale: 1, height: 'auto' }}
              exit={{ opacity: 0, scale: 0.95, height: 0 }}
              transition={{ duration: 0.5, ease: 'easeInOut' }}
            >
              <SlotGrid slots={slots} selected={selectedSlot} onSelect={setSelectedSlot} />
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4, duration: 0.7 }}>
          <PaymentMethodSelector value={paymentMethod} onChange={setPaymentMethod} />
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 0.6 }}>
           <div>
              <label className="block mb-2 font-semibold text-[#5D434C] text-sm">Upload Payment Proof</label>
              <div className="relative">
                  <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => setFile(e.target.files[0] || null)}
                      className="relative z-10 w-full h-12 opacity-0 cursor-pointer"
                      disabled={loading}
                  />
                  <div className="absolute inset-0 flex items-center justify-between px-4 py-2 rounded-xl border-2 border-dashed border-[#FFD1DA] bg-white/60">
                      <span className="text-sm text-[#B38C9C] truncate pr-2">
                          {file ? file.name : 'No file chosen...'}
                      </span>
                      <span className="flex-shrink-0 px-4 py-1.5 rounded-lg bg-gradient-to-r from-[#FBA1B7] to-[#FFD1DA] text-white text-xs font-semibold shadow">
                          Choose File
                      </span>
                  </div>
              </div>
            </div>
        </motion.div>
        
        <motion.button
          type="submit"
          disabled={!isValid || loading}
          className="w-full py-4 rounded-xl font-bold text-lg text-white transition-all duration-300 ease-in-out shadow-lg
            bg-gradient-to-r from-[#FBA1B7] to-[#fec1d0]
            hover:shadow-xl hover:shadow-[#FBA1B7]/40 hover:-translate-y-1
            focus:outline-none focus:ring-4 focus:ring-[#FFD1DA]
            active:scale-[0.98]
            disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:-translate-y-0"
        >
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
              Submitting...
            </span>
          ) : "Book & Confirm Payment"}
        </motion.button>
      </motion.form>
       {/* --- Custom Fonts (Optional but recommended for theme) --- */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=Poppins:wght@400;500;600;700&display=swap');
        .font-serif { font-family: 'Playfair Display', serif; }
        .font-sans { font-family: 'Poppins', sans-serif; }
      `}</style>
    </div>
  );
}