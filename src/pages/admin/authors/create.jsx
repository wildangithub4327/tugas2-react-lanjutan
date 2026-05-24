import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function CreateAuthor() {
  const [authorName, setAuthorName] = useState("");
  const [photoName, setPhotoName] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!authorName.trim()) {
      alert("Nama author tidak boleh kosong!");
      return;
    }

    const payload = {
      name: authorName,
      photo: photoName || "default_author.png"
    };

    // Post data ke json-server
    axios.post("http://localhost:8000/authors", payload)
      .then(() => {
        alert("Author baru berhasil ditambahkan!");
        navigate("/admin/authors"); // balik ke tabel author
      })
      .catch((err) => {
        alert("Gagal menyimpan data author.");
        console.error(err);
      });
  };

  return (
    <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md max-w-md mx-auto mt-10">
      <h2 className="text-xl font-bold mb-6 text-gray-900 dark:text-white text-center">Create New Author</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Author Name</label>
          <input 
            type="text" 
            value={authorName} 
            onChange={(e) => setAuthorName(e.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:text-white"
            placeholder="Contoh: Tere Liye, J.K. Rowling" 
            required 
          />
        </div>
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Photo File Name (Optional)</label>
          <input 
            type="text" 
            value={photoName} 
            onChange={(e) => setPhotoName(e.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:text-white"
            placeholder="Contoh: tereliye.jpg" 
          />
        </div>
        <div className="flex space-x-2 pt-2">
          <button 
            type="submit" 
            className="w-full text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5"
          >
            Create Author
          </button>
          <button 
            type="button" 
            onClick={() => navigate("/admin/authors")}
            className="w-full text-gray-900 bg-white border border-gray-300 hover:bg-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-gray-600 dark:text-white dark:hover:bg-gray-700"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}