// components/DatePicker.jsx
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useEffect } from "react";

export default function DatePicker({ value, onChange, label }) {
  useEffect(() => {
    // Apply custom Tailwind-based styles to the react-datepicker popup
    const styleCalendar = () => {
      const popper = document.querySelector(".react-datepicker-popper");
      const calendar = document.querySelector(".react-datepicker");
      if (popper && calendar) {
        calendar.classList.add(
          "bg-[#F9F5F6]",
          "rounded-2xl",
          "shadow-lg",
          "border",
          "border-[#FFD1DA]",
          "p-4",
          "animate-fadeIn"
        );
        const dayNames = calendar.querySelectorAll(".react-datepicker__day-name");
        const days = calendar.querySelectorAll(".react-datepicker__day");
        [...dayNames, ...days].forEach(el => {
          el.classList.add(
            "text-[#FBA1B7]",
            "hover:bg-[#FFD1DA]",
            "hover:text-white",
            "transition",
            "duration-300",
            "rounded-full",
            "w-8",
            "h-8",
            "flex",
            "items-center",
            "justify-center",
            "mx-auto"
          );
        });
      }
    };
    styleCalendar();
  }, [value]);

  return (
    <div className="flex flex-col gap-1 mb-4">
      {label && (
        <label className="text-sm font-semibold text-[#FBA1B7] tracking-wide mb-1">
          {label}
        </label>
      )}
      <ReactDatePicker
        selected={value ? new Date(value) : null}
        onChange={date => onChange(date.toISOString().slice(0, 10))}
        dateFormat="yyyy-MM-dd"
        minDate={new Date()}
        className="w-full px-4 py-2 rounded-xl border border-[#FFD1DA] bg-[#F9F5F6] text-[#FBA1B7] placeholder-[#FBA1B7] focus:outline-none focus:ring-2 focus:ring-[#FBA1B7] transition-all duration-300 shadow-sm hover:shadow-md"
        placeholderText="Pilih tanggal"
      />
    </div>
  );
}
