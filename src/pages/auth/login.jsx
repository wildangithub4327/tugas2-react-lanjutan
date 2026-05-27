import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  // 1. Logika State untuk merekam input form email dan password
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  // State untuk menampung pesan error jika login gagal
  const [error, setError] = useState("");

  // Fungsi untuk menangani perubahan teks di setiap kolom input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // 2. Logika Submit Form dan Penyimpanan Hak Akses (localStorage)
  const handleSubmit = (e) => {
    e.preventDefault(); // Mencegah reload halaman browser bawaan
    setError("");

    // Simulasi Akun Pengujian Hak Akses (Role-Based Access)
    if (formData.email === "admin@booksales.com" && formData.password === "admin123") {
      // Jika masuk sebagai Admin, simpan token dan role 'admin' ke localStorage
      localStorage.setItem("token", "dummy-jwt-token-admin");
      localStorage.setItem("role", "admin");
      
      // Alihkan otomatis ke halaman dashboard admin
      navigate("/admin");
    } else if (formData.email === "user@booksales.com" && formData.password === "user123") {
      // Jika masuk sebagai User biasa, simpan token dan role 'user' ke localStorage
      localStorage.setItem("token", "dummy-jwt-token-user");
      localStorage.setItem("role", "user");
      
      // Alihkan otomatis ke beranda publik
      navigate("/");
    } else {
      // Jika input tidak sesuai dengan akun simulasi di atas
      setError("Email atau password salah! (Gunakan: admin@booksales.com / admin123)");
    }
  };

  return (
    <>
      <section className="bg-gray-50 dark:bg-gray-900">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Sign in to your account
              </h1>

              {/* Menampilkan kotak pesan error merah jika login gagal */}
              {error && (
                <div className="p-3 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800">
                  {error}
                </div>
              )}

              {/* Hubungkan fungsi handleSubmit ke dalam form */}
              <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Your email
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-indigo-600 focus:border-indigo-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="admin@booksales.com atau user@booksales.com"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="••••••••"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-indigo-600 focus:border-indigo-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required
                  />
                </div>
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="terms"
                      aria-describedby="terms"
                      type="checkbox"
                      className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-indigo-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-indigo-600 dark:ring-offset-gray-800"
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label
                      htmlFor="terms"
                      className="font-light text-gray-500 dark:text-gray-300"
                    >
                      I accept the{" "}
                      <a
                        className="font-medium text-indigo-600 hover:underline dark:text-indigo-500"
                        href="#"
                      >
                        Terms and Conditions
                      </a>
                    </label>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full text-white bg-indigo-600 hover:bg-indigo-700 focus:ring-4 focus:outline-none focus:ring-indigo-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-indigo-600 dark:hover:bg-indigo-700 dark:focus:ring-indigo-800"
                >
                  Sign In
                </button>
                
                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                  Don’t have an account yet?{" "}
                  <a
                    href="register"
                    className="font-medium text-indigo-600 hover:underline dark:text-indigo-500"
                  >
                    Sign up
                  </a>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}