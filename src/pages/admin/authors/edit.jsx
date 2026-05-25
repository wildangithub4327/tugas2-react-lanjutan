import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

export default function AuthorEdit() {
  const [authorName, setAuthorName] = useState("");
  const [photo, setPhoto] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();

  // 1. Ambil data author yang lama dari server
  useEffect(() => {
    axios.get(`http://localhost:8000/authors/${id}`)
      .then((res) => {
        setAuthorName(res.data.name);
        setPhoto(res.data.photo || "default_author.png");
      })
      .catch((err) => {
        console.error("Gagal mengambil data author:", err);
        alert("Data author tidak ditemukan!");
        navigate("/admin/authors");
      });
  }, [id, navigate]);

  // 2. Simpan perubahan ke server lewat method PUT
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!authorName.trim()) {
      alert("Nama author tidak boleh kosong!");
      return;
    }

    axios.put(`http://localhost:8000/authors/${id}`, { name: authorName, photo })
      .then(() => {
        alert("Author berhasil diperbarui!");
        navigate("/admin/authors"); // Kembali ke frame tabel author
      })
      .catch((err) => {
        alert("Gagal memperbarui data author.");
        console.error(err);
      });
  };

  return (
    <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md max-w-md mx-auto mt-10">
      <h2 className="text-xl font-bold mb-6 text-gray-900 dark:text-white text-center">Edit Author</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Author Name</label>
          <input 
            type="text" 
            value={authorName} 
            onChange={(e) => setAuthorName(e.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:text-white"
            required 
          />
        </div>
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Photo File Name</label>
          <input 
            type="text" 
            value={photo} 
            onChange={(e) => setPhoto(e.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:text-white"
          />
        </div>
        <div className="flex space-x-2 pt-2">
          <button type="submit" className="w-full text-white bg-green-600 hover:bg-green-700 font-medium rounded-lg text-sm px-5 py-2.5">
            Update Author
          </button>
          <button type="button" onClick={() => navigate("/admin/authors")} className="w-full text-gray-900 bg-white border border-gray-300 hover:bg-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-gray-600 dark:text-white">
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}