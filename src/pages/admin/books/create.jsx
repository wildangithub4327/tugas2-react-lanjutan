import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function CreateBook() {
  const navigate = useNavigate();
  
  // State untuk menampung value form sesuai field di screenshot lu
  const [formData, setFormData] = useState({
    title: "",
    price: "",
    stock: "",
    genre: "Fiksi", // default value select
    genre_id: "",
    cover_photo: "", // diisi nama file simulasi
    description: ""
  });

  // Handler input change biasa
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handler khusus fake input file biar dapet nama filenya aja
  const handleFileChange = (e) => {
    if (e.target.files[0]) {
      setFormData({ ...formData, cover_photo: e.target.files[0].name });
    }
  };

  // Fungsi submit data ke db.json permanen
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validasi sederhana agar data tidak kosong
    if (!formData.title || !formData.price || !formData.stock) {
      alert("Harap isi Title, Price, dan Stock terlebih dahulu!");
      return;
    }

    const payload = {
      title: formData.title,
      price: Number(formData.price),
      stock: Number(formData.stock),
      cover_photo: formData.cover_photo || "default_cover.jpg",
      genre: formData.genre,
      author_id: Number(formData.genre_id) || 1 // simulasi author_id dari field genre_id
    };

    // Tembak data baru ke json-server
    axios.post("http://localhost:8000/books", payload)
      .then(() => {
        alert("Buku baru berhasil ditambahkan!");
        navigate("/admin/books"); // Balik ke halaman utama tabel admin buku
      })
      .catch((err) => {
        console.error("Gagal menambahkan buku:", err);
        alert("Gagal menyimpan data ke database server.");
      });
  };

  return (
    <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Create New Book</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Input: Title */}
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Title</label>
          <input 
            type="text" name="title" value={formData.title} onChange={handleChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            placeholder="Book Title" required 
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          {/* Input: Price */}
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Price</label>
            <input 
              type="number" name="price" value={formData.price} onChange={handleChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              placeholder="e.g. 150000" required 
            />
          </div>
          {/* Input: Stock */}
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Stock</label>
            <input 
              type="number" name="stock" value={formData.stock} onChange={handleChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              placeholder="e.g. 20" required 
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {/* Select: Genre */}
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Genre</label>
            <select 
              name="genre" value={formData.genre} onChange={handleChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            >
              <option value="Fiksi">Fiksi</option>
              <option value="Horror">Horror</option>
              <option value="Romance">Romance</option>
              <option value="Electronics">Electronics</option>
            </select>
          </div>
          {/* Input: Genre ID / Author ID */}
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Genre ID</label>
            <input 
              type="text" name="genre_id" value={formData.genre_id} onChange={handleChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              placeholder="e.g. 1" 
            />
          </div>
        </div>

        {/* Input: Cover Photo */}
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Cover Photo</label>
          <input 
            type="file" onChange={handleFileChange}
            className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
          />
        </div>

        {/* Input: Description */}
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Description</label>
          <textarea 
            name="description" value={formData.description} onChange={handleChange} rows="4"
            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            placeholder="Write a description of the book..."
          ></textarea>
        </div>

        {/* Tombol Aksi */}
        <div className="flex space-x-3 pt-2">
          <button 
            type="submit"
            className="text-white bg-indigo-700 hover:bg-indigo-800 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-indigo-600 dark:hover:bg-indigo-700"
          >
            Create Book
          </button>
          <button 
            type="button" onClick={() => setFormData({ title: "", price: "", stock: "", genre: "Fiksi", genre_id: "", cover_photo: "", description: "" })}
            className="text-gray-500 bg-white hover:bg-gray-100 border border-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:bg-gray-600"
          >
            Reset
          </button>
        </div>
      </form>
    </div>
  );
}