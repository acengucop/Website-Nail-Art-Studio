import { useEffect, useState } from "react";
import axios from "../utils/axios";

export default function ServiceSelector({ value, onChange }) {
  const [services, setServices] = useState([]);

  useEffect(() => {
    axios.get("/services/")
      .then(res => setServices(res.data))
      .catch(() => setServices([]));
  }, []);

  return (
    <div className="mb-4">
      <label className="block text-sm font-semibold text-[#FBA1B7] mb-2">
        Pilih Layanan
      </label>
      <select
        value={value}
        onChange={e => onChange(e.target.value)}
        className={`
          w-full rounded-xl border border-[#FFD1DA] bg-[#F9F5F6] px-4 py-2 text-[#FBA1B7]
          focus:outline-none focus:ring-2 focus:ring-[#FBA1B7]
          transition-all duration-300 shadow-sm hover:shadow-md
        `}
      >
        <option value="">Pilih layanan</option>
        {services.map(s => (
          <option key={s.id} value={s.id}>
            {s.name} - Rp {Number(s.price).toLocaleString()}
          </option>
        ))}
      </select>
    </div>
  );
}
