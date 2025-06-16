import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "../utils/axios";
import { useCart } from "../context/CartContext";

export default function UploadProofPage() {
  const { orderId } = useParams();
  const navigate = useNavigate();

  const [proofFile, setProofFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState('');
  const [uploadSuccess, setUploadSuccess] = useState('');

  const { setCart } = useCart();

  const handleUploadProof = async (e) => {
    e.preventDefault();
    setUploading(true);
    setUploadError('');
    setUploadSuccess('');

    if (!proofFile) {
      setUploadError("Silakan pilih file gambar bukti pembayaran.");
      setUploading(false);
      return;
    }

    try {
      const formData = new FormData();
      formData.append("payment_proof", proofFile);

      await axios.patch(`orders/${orderId}/upload_proof/`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setUploadSuccess("Bukti pembayaran berhasil di-upload! Silakan menunggu konfirmasi admin.");
      setProofFile(null);
      setCart([]);
      setTimeout(() => navigate("/order-history"), 1600);
    } catch (err) {
      setUploadError(
        err?.response?.data?.detail ||
        err?.response?.data?.payment_proof?.[0] ||
        err.message ||
        "Gagal upload bukti pembayaran."
      );
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F9F5F6] flex flex-col justify-center items-center px-4 sm:px-6 font-sans">
      
      {/* --- Elegant Form Card --- */}
      <form
        onSubmit={handleUploadProof}
        className="w-full max-w-md bg-white/70 backdrop-blur-xl rounded-3xl shadow-2xl shadow-[#FBA1B7]/20 border border-white px-8 pt-16 pb-10 animate-fade-in relative"
      >
        {/* --- Redesigned Top Accent --- */}
        <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gradient-to-br from-[#FBA1B7] to-[#FFD1DA] w-16 h-16 rounded-full shadow-lg flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"/>
          </svg>
        </div>

        <h3 className="text-3xl font-serif text-center text-[#FBA1B7] mb-6 tracking-tight select-none">
          Upload Proof
        </h3>
        
        {/* --- Redesigned Success/Error Messages --- */}
        <div className="h-14">
            {uploadSuccess && (
            <div className="p-3 mb-4 text-green-800 bg-green-100 border border-green-200 rounded-lg text-center font-medium animate-fade-in flex items-center justify-center gap-2">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                <span className="text-sm">{uploadSuccess}</span>
            </div>
            )}
            {uploadError && (
            <div className="p-3 mb-4 text-red-800 bg-red-100 border border-red-200 rounded-lg text-center font-medium animate-fade-in flex items-center justify-center gap-2">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                <span className="text-sm">{uploadError}</span>
            </div>
            )}
        </div>

        {/* --- Redesigned File Input --- */}
        <div className="mb-6">
            <div className="relative group">
                <input
                    type="file"
                    accept="image/*"
                    className="absolute inset-0 w-full h-full opacity-0 z-10 cursor-pointer"
                    onChange={(e) => setProofFile(e.target.files[0])}
                    required
                    disabled={uploading || uploadSuccess}
                />
                <div className={`w-full h-36 flex flex-col items-center justify-center px-5 py-4 rounded-2xl border-2 border-dashed
                    transition-all duration-300
                    ${proofFile ? "border-[#FBA1B7] bg-[#FFD1DA]/30" : "border-[#FFD1DA] bg-transparent"}
                    group-hover:border-[#FBA1B7] group-hover:bg-[#FFD1DA]/20
                `}>
                    <svg className={`w-8 h-8 mb-2 transition-colors ${proofFile ? 'text-[#FBA1B7]' : 'text-[#FFD1DA]'}`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                    </svg>
                    <p className={`font-semibold text-sm ${proofFile ? 'text-[#5D434C]' : 'text-[#B38C9C]'}`}>
                        {proofFile ? proofFile.name : "Drag & drop or click to upload"}
                    </p>
                    {proofFile && <span className="text-xs text-[#B38C9C] mt-1">Click again to change file</span>}
                </div>
            </div>
        </div>


        {/* --- Redesigned Upload Button --- */}
        <button
          type="submit"
          className={`w-full py-4 rounded-xl font-bold text-lg text-white transition-all duration-300 ease-in-out shadow-lg
            bg-gradient-to-r from-[#FBA1B7] to-[#fec1d0]
            hover:shadow-xl hover:shadow-[#FBA1B7]/40 hover:-translate-y-1
            focus:outline-none focus:ring-4 focus:ring-[#FFD1DA]
            active:scale-[0.98]
            ${uploading || !proofFile || uploadSuccess ? "opacity-50 cursor-not-allowed" : "hover:from-[#f88fab] hover:to-[#FBA1B7]"}`}
          disabled={uploading || !proofFile || uploadSuccess}
        >
          {uploading ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
              Uploading...
            </span>
          ) : "Upload & Confirm"}
        </button>

        {/* --- Redesigned Back Button --- */}
        <button
          type="button"
          className="w-full py-3 mt-4 rounded-xl text-[#FBA1B7] font-semibold
            bg-transparent hover:bg-[#FFD1DA]/30 transition-all duration-200 active:scale-95 disabled:opacity-50"
          onClick={() => navigate('/checkout')}
          disabled={uploading}
        >
          Back to Checkout
        </button>
      </form>

      {/* --- Custom Animations & Fonts --- */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=Poppins:wght@400;500;600&display=swap');
        .font-serif { font-family: 'Playfair Display', serif; }
        .font-sans { font-family: 'Poppins', sans-serif; }
        .animate-fade-in {
          animation: fade-in 0.8s cubic-bezier(0.4, 0, 0.2, 1) both;
        }
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(24px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
