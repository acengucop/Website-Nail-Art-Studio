export default function SlotGrid({ slots, selected, onSelect }) {
  const now = new Date();
  const nowHour = now.getHours();
  const nowMin = now.getMinutes();

  return (
    <div className="grid grid-cols-3 gap-4">
      {Object.entries(slots).map(([jam, status]) => {
        const [slotHour, slotMin] = jam.split(":").map(Number);

        let isExpired = false;
        if (status === "available") {
          const todayStr = now.toISOString().slice(0, 10);
          const isToday =
            document.querySelector('input[type="date"]')?.value === todayStr;
          if (
            isToday &&
            (slotHour < nowHour ||
              (slotHour === nowHour && slotMin <= nowMin))
          ) {
            isExpired = true;
          }
        }

        let bg = "";
        let label = "";
        let textColor = "text-[#FBA1B7]";
        let showStatus = status;

        if (status === "booked") {
          bg = "bg-[#FFD1DA]";
          label = "Sudah dibooking";
          textColor = "text-[#a1a1aa]"; // gray-400
        } else if (status === "expired" || isExpired) {
          bg = "bg-[#F9F5F6]";
          label = "Expired";
          textColor = "text-[#d4d4d8]"; // gray-300
          showStatus = "expired";
        } else if (status === "available") {
          bg =
            "bg-white hover:bg-[#FFD1DA] hover:shadow-lg border border-[#FBA1B7]";
          label = "Tersedia";
        }

        return (
          <button
            key={jam}
            disabled={showStatus !== "available"}
            onClick={() => onSelect(jam)}
            title={label}
            className={`
              rounded-2xl p-3 text-md font-semibold transition-all duration-300 ease-in-out
              flex flex-col items-center justify-center text-center
              ${bg}
              ${selected === jam ? "ring-2 ring-[#FBA1B7] shadow-md" : ""}
              ${textColor}
              ${showStatus !== "available" ? "cursor-not-allowed opacity-60" : ""}
            `}
          >
            <div className="text-lg">{jam}</div>
            <div className="text-xs font-light">{label}</div>
          </button>
        );
      })}
    </div>
  );
}
