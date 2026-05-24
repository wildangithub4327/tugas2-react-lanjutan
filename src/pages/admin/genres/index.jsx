import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default function AdminGenres() {
  const [genres, setGenres] = useState([]);

  useEffect(() => {
    // Ngambil data genre dari json-server port 8000
    axios.get("http://localhost:8000/genres")
      .then((res) => setGenres(res.data))
      .catch((err) => console.error("Gagal memuat data genre:", err));
  }, []);

  return (
    <div className="p-6 bg-white dark:bg-gray-800 shadow-md rounded-lg">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Admin Genres</h1>
        <Link 
          to="/admin/genres/create" 
          className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-4 py-2"
        >
          + Add Genre
        </Link>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th className="px-4 py-3">ID</th>
              <th className="px-4 py-3">GENRE NAME</th>
            </tr>
          </thead>
          <tbody>
            {genres.length === 0 ? (
              <tr>
                <td colSpan="2" className="text-center py-4 text-gray-500">
                  Tidak ada data genre atau sedang memuat...
                </td>
              </tr>
            ) : (
              genres.map((genre) => (
                <tr key={genre.id} className="border-b dark:border-gray-700">
                  <td className="px-4 py-3 font-medium text-gray-900 dark:text-white">{genre.id}</td>
                  <td className="px-4 py-3">{genre.name}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}