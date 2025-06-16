import { useEffect, useState } from "react";
import axios from "../utils/axios";
import { useNavigate } from "react-router-dom";
import BookingStatusCard from "../components/BookingStatusCard";

export default function MyAppointments() {
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("/booking/my/").then(res => setData(res.data));
  }, []);

  const handleReupload = id => {
    navigate(`/booking-payment/${id}`);
  };

  return (
    <div className="min-h-screen bg-[#F9F5F6] py-14 px-4 animate-fadeIn">
      <div className="max-w-2xl mx-auto bg-[#FFD1DA]/60 backdrop-blur-md rounded-[2rem] border border-[#FBA1B7]/40 shadow-[0_8px_32px_0_rgba(251,161,183,0.15)] p-10 md:p-14 transition-all duration-700 ease-in-out">
        <h1 className="text-4xl font-bold text-center text-[#FBA1B7] mb-10 tracking-wide font-playfair animate-fadeInUp">
          Booking Saya
        </h1>

        <div className="space-y-6">
          {data.length === 0 ? (
            <div className="text-center text-base text-[#FBA1B7] py-8 italic animate-pulse font-inter">
              Belum ada booking.
            </div>
          ) : (
            data.map((booking, i) => (
              <div className="animate-fadeInUp animation-delay-[${i * 100}ms]" key={booking.id}>
                <BookingStatusCard
                  booking={booking}
                  onReupload={handleReupload}
                />
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
