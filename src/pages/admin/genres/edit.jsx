import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios"; // Cukup import axios dari "axios" saja, jangan double!

export default function GenreEdit() {
  const [genreName, setGenreName] = useState("");
  const navigate = useNavigate();
  const { id } = useParams(); // Mengambil ID genre dari URL browser

  // 1. Ambil data nama genre lama dari json-server saat komponen dimuat
  useEffect(() => {
    axios.get(`http://localhost:8000/genres/${id}`)
      .then((res) => {
        setGenreName(res.data.name || res.data.genre);
      })
      .catch((err) => {
        console.error("Gagal mengambil data genre:", err);
        alert("Data genre tidak ditemukan!");
        navigate("/admin/genres");
      });
  }, [id, navigate]);

  // 2. Kirim perubahan data ke json-server memakai method PUT
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!genreName.trim()) {
      alert("Nama genre tidak boleh kosong!");
      return;
    }

    axios.put(`http://localhost:8000/genres/${id}`, { name: genreName })
      .then(() => {
        alert("Data Genre berhasil diperbarui!");
        navigate("/admin/genres"); // Otomatis balik ke frame tabel genre tanpa refresh halaman penuh
      })
      .catch((err) => {
        alert("Gagal memperbarui data genre.");
        console.error(err);
      });
  };

  return (
    <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md max-w-md mx-auto mt-10">
      <h2 className="text-xl font-bold mb-6 text-gray-900 dark:text-white text-center">Edit Genre</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Genre Name</label>
          <input 
            type="text" 
            value={genreName} 
            onChange={(e) => setGenreName(e.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:text-white"
            placeholder="Contoh: Romance, Horror, Fiction" 
            required 
          />
        </div>
        <div className="flex space-x-2 pt-2">
          <button 
            type="submit" 
            className="w-full text-white bg-green-600 hover:bg-green-700 font-medium rounded-lg text-sm px-5 py-2.5"
          >
            Update Genre
          </button>
          <button 
            type="button" 
            onClick={() => navigate("/admin/genres")}
            className="w-full text-gray-900 bg-white border border-gray-300 hover:bg-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-gray-600 dark:text-white dark:hover:bg-gray-700"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}