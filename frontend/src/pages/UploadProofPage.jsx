import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "../utils/axios";
import { useCart } from "../context/CartContext"; // ← Tambahkan ini

export default function UploadProofPage() {
  const { orderId } = useParams(); // Pastikan route: /upload-proof/:orderId
  const navigate = useNavigate();

  const [proofFile, setProofFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState('');
  const [uploadSuccess, setUploadSuccess] = useState('');

  const { setCart } = useCart(); // ← Tambahkan ini

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
      setCart([]); // ← Kosongkan cart hanya setelah bukti berhasil di-upload!
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
    <div className="p-8">
      <form onSubmit={handleUploadProof} className="max-w-md mx-auto bg-white p-6 rounded shadow mt-8">
        <h3 className="text-lg font-bold mb-3 text-center">Upload Bukti Pembayaran</h3>
        {uploadSuccess && <div className="mb-3 text-green-600 text-center">{uploadSuccess}</div>}
        {uploadError && <div className="mb-3 text-red-500 text-center">{uploadError}</div>}

        <input
          type="file"
          accept="image/*"
          className="block mb-4 w-full"
          onChange={(e) => setProofFile(e.target.files[0])}
          required
          disabled={uploading}
        />

        <button
          type="submit"
          className="w-full py-2 rounded bg-[#fe019a] text-white font-semibold"
          disabled={uploading || !proofFile}
        >
          {uploading ? "Mengupload..." : "Upload Bukti"}
        </button>
        <button
          type="button"
          className="w-full py-2 mt-3 rounded border border-[#fe019a] text-[#fe019a] font-semibold hover:bg-[#fe019a]/10 transition-colors"
          onClick={() => navigate('/checkout')}
          disabled={uploading}
        >
          Kembali ke Checkout
        </button>
      </form>
    </div>
  );
}
