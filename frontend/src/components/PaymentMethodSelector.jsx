import { useEffect, useState } from "react";
import axios from "../utils/axios";

export default function PaymentMethodSelector({ value, onChange }) {
  const [methods, setMethods] = useState([]);

  useEffect(() => {
    axios.get("/payment-method/")
      .then(res => setMethods(res.data))
      .catch(() => setMethods([]));
  }, []);

  return (
    <div className="mb-4">
      <label className="block text-sm font-semibold text-[#FBA1B7] mb-2">
        Pilih Metode Pembayaran
      </label>
      <select
        className={`
          w-full rounded-xl border border-[#FFD1DA] bg-[#F9F5F6] px-4 py-2 text-[#FBA1B7] 
          focus:outline-none focus:ring-2 focus:ring-[#FBA1B7] 
          transition-all duration-300 shadow-sm hover:shadow-md
        `}
        value={value}
        onChange={e => onChange(e.target.value)}
      >
        <option value="">Pilih metode pembayaran</option>
        {methods.map((method) => (
          <option key={method.id} value={method.id}>
            {method.name}
          </option>
        ))}
      </select>

      {value && (
        <div className="mt-4 text-center animate-fadeIn">
          {methods.find(m => String(m.id) === String(value))?.qr_image && (
            <img
              src={methods.find(m => String(m.id) === String(value)).qr_image}
              alt="QR Pembayaran"
              className="h-40 mx-auto rounded-xl shadow-md"
            />
          )}
          <p className="text-sm mt-2 text-[#FBA1B7] font-medium">
            {methods.find(m => String(m.id) === String(value))?.description}
          </p>
        </div>
      )}
    </div>
  );
}
