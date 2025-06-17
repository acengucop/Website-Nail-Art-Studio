import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function RegisterPage() {
  const [username, setUsername] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    try {
      const response = await fetch('http://localhost:8000/api/register/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, phone, password })
      });
      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.username?.[0] || errData.phone?.[0] || errData.password?.[0] || 'Registrasi gagal');
      }
      setSuccess('Registrasi berhasil! Silakan login.');
      setTimeout(() => navigate('/login'), 1500);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-50 via-white to-rose-100 relative">
      {/* Decorative Background */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <svg width="100%" height="100%">
          <ellipse cx="80%" cy="10%" rx="220" ry="120" fill="#fe019a11" />
          <ellipse cx="0%" cy="90%" rx="180" ry="90" fill="#fe019a22" />
        </svg>
      </div>
      <form
        className="
          relative z-10
          bg-white/95
          px-8 py-10
          rounded-3xl
          shadow-xl
          w-full max-w-md
          border border-pink-100
          flex flex-col gap-2
          backdrop-blur-sm
          ring-1 ring-pink-50
        "
        onSubmit={handleRegister}
      >
        <div className="flex flex-col items-center mb-6">
          {/* Logo/Salon Icon */}
          <span className="mb-2">
            <svg width="44" height="44" viewBox="0 0 44 44" fill="none">
              <ellipse cx="22" cy="22" rx="22" ry="22" fill="#fe019a18"/>
              <path d="M18 30c4-5 7-11 7-15.5 0-3-1.5-4.5-4-4.5s-4 2-4 4.5c0 4.5 3 10.5 7 15.5z" stroke="#fe019a" strokeWidth="1.8" fill="#fff"/>
            </svg>
          </span>
          <h2 className="text-3xl font-serif font-semibold tracking-wide text-pink-500 mb-1 drop-shadow-sm">
            Daftar Akun
          </h2>
          <span className="text-sm text-gray-400 font-light italic">
            Mulai perjalanan cantikmu
          </span>
        </div>
        {error && (
          <div className="mb-3 px-4 py-2 bg-rose-50 border border-pink-100 rounded-lg text-rose-600 text-sm font-medium text-center shadow">
            {error}
          </div>
        )}
        {success && (
          <div className="mb-3 px-4 py-2 bg-emerald-50 border border-emerald-100 rounded-lg text-emerald-600 text-sm font-medium text-center shadow">
            {success}
          </div>
        )}
        <div className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Username"
            className="
              w-full px-5 py-3
              border border-pink-200
              rounded-xl
              bg-pink-50/40
              text-gray-800
              font-medium
              shadow-sm
              placeholder-gray-400
              focus:outline-none
              focus:ring-2 focus:ring-pink-300
              transition-all
              duration-150
            "
            value={username}
            onChange={e => setUsername(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Nomor HP"
            className="
              w-full px-5 py-3
              border border-pink-200
              rounded-xl
              bg-pink-50/40
              text-gray-800
              font-medium
              shadow-sm
              placeholder-gray-400
              focus:outline-none
              focus:ring-2 focus:ring-pink-300
              transition-all
              duration-150
            "
            value={phone}
            onChange={e => setPhone(e.target.value)}
            required
          />
          <div className="relative w-full">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="
                w-full px-5 py-3
                border border-pink-200
                rounded-xl
                bg-pink-50/40
                text-gray-800
                font-medium
                shadow-sm
                placeholder-gray-400
                focus:outline-none
                focus:ring-2 focus:ring-pink-300
                transition-all
                duration-150
                pr-12
              "
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(v => !v)}
              className="
                absolute right-3 top-1/2 -translate-y-1/2
                bg-white/70 hover:bg-pink-50
                rounded-full
                p-1.5
                border border-pink-100
                transition
                focus:outline-none
                shadow
              "
              tabIndex={-1}
              aria-label={showPassword ? "Sembunyikan password" : "Tampilkan password"}
            >
              {showPassword ? (
                // Eye-off Icon
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-pink-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.94 17.94A10.01 10.01 0 0112 20c-5.523 0-10-4.477-10-10 0-2.08.636-4.011 1.724-5.605m15.492 15.492A9.955 9.955 0 0022 12c0-5.523-4.477-10-10-10-1.931 0-3.743.545-5.265 1.486m12.175 12.175l-13-13" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.88 9.88A3 3 0 0114.12 14.12" />
                </svg>
              ) : (
                // Eye Icon
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-pink-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0zm6 0c0 5.523-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2s10 4.477 10 10z" />
                </svg>
              )}
            </button>
          </div>
        </div>
        <button
          type="submit"
          className="
            mt-6 w-full py-3 rounded-xl
            bg-gradient-to-r from-pink-400 via-[#fe019a] to-rose-400
            text-white font-bold
            text-lg tracking-wide shadow-lg
            hover:brightness-110 hover:scale-[1.02]
            transition-all
            duration-150
            ring-1 ring-pink-200
          "
        >
          Register
        </button>
        <div className="flex items-center my-6">
          <hr className="flex-grow border-pink-100" />
          <span className="mx-3 text-gray-300 text-sm font-light">or</span>
          <hr className="flex-grow border-pink-100" />
        </div>
        <p className="text-center text-sm text-gray-500 font-light">
          Sudah punya akun?{' '}
          <span
            className="text-[#fe019a] font-semibold underline underline-offset-2 cursor-pointer hover:text-pink-600 transition"
            onClick={() => navigate('/login')}
          >
            Login di sini
          </span>
        </p>
      </form>
    </div>
  );
}
