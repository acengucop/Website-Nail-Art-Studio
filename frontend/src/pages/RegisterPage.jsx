import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function RegisterPage() {
  const [username, setUsername] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
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
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <form className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md" onSubmit={handleRegister}>
        <h2 className="text-2xl font-bold mb-4 text-[#fe019a]">Daftar Akun</h2>
        {error && <div className="mb-3 text-red-500 text-sm">{error}</div>}
        {success && <div className="mb-3 text-green-600 text-sm">{success}</div>}
        <input
          type="text"
          placeholder="Username"
          className="mb-3 w-full px-4 py-2 border rounded"
          value={username}
          onChange={e => setUsername(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Nomor HP"
          className="mb-3 w-full px-4 py-2 border rounded"
          value={phone}
          onChange={e => setPhone(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="mb-5 w-full px-4 py-2 border rounded"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />
        <button
          type="submit"
          className="w-full py-2 rounded bg-[#fe019a] text-white font-semibold hover:bg-[#c90077] transition-colors"
        >
          Register
        </button>
        <p className="mt-4 text-sm text-center">
          Sudah punya akun?{' '}
          <span
            className="text-[#fe019a] underline cursor-pointer"
            onClick={() => navigate('/login')}
          >
            Login di sini
          </span>
        </p>
      </form>
    </div>
  );
}
