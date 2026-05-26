import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Register() {
  const navigate = useNavigate();

  // State untuk menampung input form registrasi (Minimal 4 field sesuai tugas)
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    username: '',
    password: '',
  });

  // State untuk menampung error validasi
  const [errors, setErrors] = useState({});
  const [isSuccess, setIsSuccess] = useState(false);

  // Fungsi mengangani perubahan input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Fungsi Validasi Form Sederhana (Kriteria Tugas 3)
  const validateForm = () => {
    let newErrors = {};

    if (!formData.fullName.trim()) newErrors.fullName = 'Nama lengkap wajib diisi';
    if (!formData.username.trim()) newErrors.username = 'Username wajib diisi';
    
    if (!formData.password) {
      newErrors.password = 'Password wajib diisi';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password minimal harus 6 karakter';
    }

    // Validasi format email menggunakan regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = 'Email wajib diisi';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Format email tidak valid';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Fungsi saat form di-submit
  const handleSubmit = (e) => {
    e.preventDefault(); // Mencegah reload halaman browser

    if (validateForm()) {
      console.log('Data Registrasi Berhasil Disimpan:', formData);
      setIsSuccess(true);
      
      // Reset form setelah sukses
      setFormData({ fullName: '', email: '', username: '', password: '' });
      setErrors({});

      // Opsional: Setelah beberapa detik, arahkan pengguna ke halaman login
      setTimeout(() => {
        navigate('/auth/login'); // Sesuaikan rute login Anda jika diperlukan
      }, 2000);
    } else {
      setIsSuccess(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-2">BookSales</h2>
        <p className="text-center text-gray-500 mb-6">Pendaftaran Akun Baru</p>

        {isSuccess && (
          <div className="mb-4 p-3 bg-green-100 text-green-700 rounded-md text-center text-sm font-medium">
            Registrasi Berhasil! Mengalihkan ke halaman login...
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Field Nama Lengkap */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Nama Lengkap</label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.fullName ? 'border-red-500' : 'border-gray-300'}`}
              placeholder="Nama Lengkap Anda"
            />
            {errors.fullName && <p className="text-red-500 text-xs mt-1">{errors.fullName}</p>}
          </div>

          {/* Field Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="text"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
              placeholder="nama@email.com"
            />
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
          </div>

          {/* Field Username */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.username ? 'border-red-500' : 'border-gray-300'}`}
              placeholder="Username"
            />
            {errors.username && <p className="text-red-500 text-xs mt-1">{errors.username}</p>}
          </div>

          {/* Field Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.password ? 'border-red-500' : 'border-gray-300'}`}
              placeholder="••••••••"
            />
            {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
          </div>

          {/* Tombol Submit */}
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition duration-200"
          >
            Daftar Sekarang
          </button>
        </form>
      </div>
    </div>
  );
}