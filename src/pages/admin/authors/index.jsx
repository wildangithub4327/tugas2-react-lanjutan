import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default function AdminAuthors() {
  const [authors, setAuthors] = useState([]);

  useEffect(() => {
    // Ambil data dari json-server port 8000
    axios.get("http://localhost:8000/authors")
      .then((res) => setAuthors(res.data))
      .catch((err) => console.error("Gagal memuat data author:", err));
  }, []);

  return (
    <div className="p-6 bg-white dark:bg-gray-800 shadow-md rounded-lg">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Admin Authors</h1>
        <Link 
          to="/admin/authors/create" 
          className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-4 py-2"
        >
          + Add Author
        </Link>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th className="px-4 py-3">ID</th>
              <th className="px-4 py-3">AUTHOR NAME</th>
              <th className="px-4 py-3">PHOTO</th>
              {/* === 1. HEADER UNTUK KOLOM AKSI === */}
              <th className="px-4 py-3 text-center">ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {authors.length === 0 ? (
              <tr>
                {/* colSpan diganti ke 4 karena kolomnya sekarang ada 4 */}
                <td colSpan="4" className="text-center py-4 text-gray-500">
                  Tidak ada data author atau sedang memuat...
                </td>
              </tr>
            ) : (
              authors.map((author) => (
                <tr key={author.id} className="border-b dark:border-gray-700">
                  <td className="px-4 py-3 font-medium text-gray-900 dark:text-white">{author.id}</td>
                  <td className="px-4 py-3">{author.name}</td>
                  <td className="px-4 py-3">{author.photo || "default_author.png"}</td>
                  {/* === 2. TOMBOL EDIT DI SETIAP BARIS === */}
                  <td className="px-4 py-3 text-center">
                    <Link 
                      to={`/admin/authors/edit/${author.id}`} 
                      className="text-white bg-green-600 hover:bg-green-700 font-medium rounded-lg text-xs px-3 py-1.5"
                    >
                      Edit
                    </Link>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}