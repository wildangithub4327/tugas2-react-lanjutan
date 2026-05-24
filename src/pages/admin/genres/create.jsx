import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function CreateGenre() {
  const [genreName, setGenreName] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!genreName.trim()) {
      alert("Nama genre tidak boleh kosong!");
      return;
    }

    // Kirim data baru ke json-server
    axios.post("http://localhost:8000/genres", { name: genreName })
      .then(() => {
        alert("Genre baru berhasil ditambahkan!");
        navigate("/admin/genres"); // Pindah ke halaman list genre setelah sukses
      })
      .catch((err) => {
        alert("Gagal menyimpan data ke database server.");
        console.error(err);
      });
  };

  return (
    <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md max-w-md mx-auto mt-10">
      <h2 className="text-xl font-bold mb-6 text-gray-900 dark:text-white text-center">Create New Genre</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Genre Name</label>
          <input 
            type="text" 
            value={genreName} 
            onChange={(e) => setGenreName(e.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:text-white"
            placeholder="Contoh: Fantasy, Fiction, Biography" 
            required 
          />
        </div>
        <div className="flex space-x-2 pt-2">
          <button 
            type="submit" 
            className="w-full text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5"
          >
            Create Genre
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