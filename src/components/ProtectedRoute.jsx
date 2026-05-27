import { Navigate, Outlet } from "react-router-dom";

export default function ProtectedRoute() {
  // Mengambil data token dan role dari localStorage browser
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  // 1. Jika pengguna belum login (tidak ada token), tendang ke halaman login
  if (!token) {
    alert("Akses ditolak! Anda harus login terlebih dahulu.");
    return <Navigate to="/login" replace />;
  }

  // 2. Jika sudah login tetapi perannya bukan admin, tendang ke halaman beranda/publik
  if (role !== "admin") {
    alert("Akses ditolak! Halaman ini hanya dapat diakses oleh Administrator.");
    return <Navigate to="/" replace />; // Atau arahkan ke halaman utama user biasa
  }

  // 3. Jika lolos pengecekan (sudah login & admin), izinkan masuk ke halaman admin
  return <Outlet />;
}