// components/BookingStatusCard.jsx
import React from "react";

// SVG Icons for a more elegant UI
const CalendarIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="text-gray-400"
  >
    <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
    <line x1="16" x2="16" y1="2" y2="6" />
    <line x1="8" x2="8" y1="2" y2="6" />
    <line x1="3" x2="21" y1="10" y2="10" />
  </svg>
);

const ClockIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="text-gray-400"
  >
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
);

export default function BookingStatusCard({ booking, onReupload }) {
  // --- LOGIC IS UNCHANGED ---
  // A new color mapping object aligned with the nail salon theme.
  // We retain universal UX colors like red for "rejected" and gray for "cancelled"
  // to ensure clarity, while integrating the new palette for other states.
  const statusColors = {
    pending: "bg-[#FFD1DA] text-[#FBA1B7]",
    confirmed: "bg-[#FBA1B7] text-white",
    waiting: "border border-[#FBA1B7] text-[#FBA1B7]",
    rejected: "bg-red-500 text-white", // A clear, universal color for errors is crucial for user experience.
    cancelled: "bg-gray-200 text-gray-500",
    done: "border border-gray-300 text-gray-500",
  };
  // --- END OF UNCHANGED LOGIC ---

  return (
    // Main card container with new background, padding, shadow, and hover animations
    <div className="bg-[#F9F5F6] rounded-2xl p-5 sm:p-6 flex justify-between items-center transition-all duration-300 ease-in-out shadow-[0_4px_14px_0_rgba(0,0,0,0.03)] hover:shadow-[0_6px_24px_0_rgba(251,161,183,0.15)] hover:-translate-y-1">
      <div className="flex flex-col gap-2">
        {/* Service name with updated typography */}
        <div className="font-semibold text-lg text-gray-700">{booking.service?.name || "No Service Name"}</div>
        
        {/* Date and time display with icons for better visual structure */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:gap-4 text-sm text-gray-500">
            <div className="flex items-center gap-2">
                <CalendarIcon />
                <span>{booking.date}</span>
            </div>
            <div className="flex items-center gap-2">
                <ClockIcon />
                <span>{booking.time}</span>
            </div>
        </div>

        {/* Status badges container with updated spacing */}
        <div className="flex flex-wrap gap-2 mt-2">
          {/* Badge styling updated to be more pill-shaped and elegant */}
          <span className={`capitalize px-3 py-1 rounded-full text-xs font-medium tracking-wide ${statusColors[booking.status] || "bg-gray-100 text-gray-700"}`}>
            {booking.status}
          </span>
          <span className={`capitalize px-3 py-1 rounded-full text-xs font-medium tracking-wide ${statusColors[booking.payment_status] || "bg-gray-100 text-gray-700"}`}>
            Payment {booking.payment_status}
          </span>
        </div>
      </div>

      {/* --- LOGIC IS UNCHANGED --- */}
      {/* Conditional rendering for the re-upload button */}
      {booking.payment_status === "rejected" && onReupload && (
        // Button is redesigned with the new color palette and hover effects
        <button
          className="ml-4 bg-[#FBA1B7] text-white px-4 py-2 rounded-lg shadow-sm hover:bg-opacity-80 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#FBA1B7] focus:ring-offset-[#F9F5F6] flex-shrink-0"
          onClick={() => onReupload(booking.id)}
        >
          Re-upload Proof
        </button>
      )}
      {/* --- END OF UNCHANGED LOGIC --- */}
    </div>
  );
}
