import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const response = await fetch('http://localhost:8000/api/login/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });
      if (!response.ok) throw new Error('Username atau password salah');
      const data = await response.json();
      localStorage.setItem('token', data.access); // Simpan JWT di localStorage
      navigate('/'); // Redirect ke homepage
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <form className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md" onSubmit={handleLogin}>
        <h2 className="text-2xl font-bold mb-4 text-[#fe019a]">Login</h2>
        {error && <div className="mb-3 text-red-500 text-sm">{error}</div>}
        <input
          type="text"
          placeholder="Username"
          className="mb-3 w-full px-4 py-2 border rounded"
          value={username}
          onChange={e => setUsername(e.target.value)}
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
          Login
        </button>
        <p className="mt-4 text-sm text-center">
          Belum punya akun?{' '}
          <span
            className="text-[#fe019a] underline cursor-pointer"
            onClick={() => navigate('/register')}
          >
            Daftar di sini
          </span>
        </p>
      </form>
    </div>
  );
}
