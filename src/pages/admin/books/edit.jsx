import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

export default function BookEdit() {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [genreId, setGenreId] = useState("");
  
  const navigate = useNavigate();
  const { id } = useParams(); // Ini buat nangkep ID buku dari URL browser

  // 1. Ambil data buku lama dari json-server pas halaman dibuka
  useEffect(() => {
    axios.get(`http://localhost:8000/books/${id}`)
      .then((res) => {
        setTitle(res.data.title);
        setPrice(res.data.price);
        setStock(res.data.stock);
        setGenreId(res.data.genre_id || ""); // Menyesuaikan input genre_id lu
      })
      .catch((err) => {
        console.error("Gagal mengambil data buku:", err);
        alert("Data buku tidak ditemukan!");
        navigate("/admin/books");
      });
  }, [id, navigate]);

  // 2. Kirim update data ke json-server pas tombol update diklik
  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = {
      title,
      price: Number(price),
      stock: Number(stock),
      genre_id: genreId
    };

    axios.put(`http://localhost:8000/books/${id}`, payload)
      .then(() => {
        alert("Buku berhasil diperbarui!");
        navigate("/admin/books"); // Otomatis balik ke frame tabel buku
      })
      .catch((err) => {
        alert("Gagal memperbarui data buku.");
        console.error(err);
      });
  };

  return (
    <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md max-w-md mx-auto mt-5">
      <h2 className="text-xl font-bold mb-6 text-gray-900 dark:text-white text-center">Edit Book</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">Title</label>
          <input 
            type="text" 
            value={title} 
            onChange={(e) => setTitle(e.target.value)} 
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:text-white" 
            required 
          />
        </div>
        <div>
          <label className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">Price</label>
          <input 
            type="number" 
            value={price} 
            onChange={(e) => setPrice(e.target.value)} 
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:text-white" 
            required 
          />
        </div>
        <div>
          <label className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">Stock</label>
          <input 
            type="number" 
            value={stock} 
            onChange={(e) => setStock(e.target.value)} 
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:text-white" 
            required 
          />
        </div>
        <div>
          <label className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">Genre ID</label>
          <input 
            type="text" 
            value={genreId} 
            onChange={(e) => setGenreId(e.target.value)} 
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:text-white" 
          />
        </div>
        <div className="flex space-x-2 pt-2">
          <button 
            type="submit" 
            className="w-full text-white bg-green-600 hover:bg-green-700 font-medium rounded-lg text-sm px-5 py-2.5"
          >
            Update Book
          </button>
          <button 
            type="button" 
            onClick={() => navigate("/admin/books")} 
            className="w-full text-gray-900 bg-white border border-gray-300 hover:bg-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-gray-600 dark:text-white"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}