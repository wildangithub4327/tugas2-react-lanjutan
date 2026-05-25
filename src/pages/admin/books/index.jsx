import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default function AdminBooks() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = () => {
    setLoading(true);
    axios.get("http://localhost:8000/books")
      .then((res) => {
        setBooks(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Gagal konek ke json-server:", err);
        setLoading(false);
      });
  };

  const handleDelete = (id) => {
    if (window.confirm("Yakin hapus buku ini?")) {
      axios.delete(`http://localhost:8000/books/${id}`)
        .then(() => {
          fetchBooks();
        })
        .catch((err) => console.error(err));
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 shadow-md sm:rounded-lg p-4">
      {/* Top Bar */}
      <div className="flex justify-between items-center pb-4 mb-4 border-b">
        <h1 className="text-xl font-bold text-gray-900 dark:text-white">Admin Books</h1>
        <Link to="/admin/books/create" className="text-white bg-indigo-700 hover:bg-indigo-800 font-medium rounded-lg text-sm px-4 py-2">
          + Add product
        </Link>
      </div>

      {/* Tabel */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th className="px-4 py-3">Title</th>
              <th className="px-4 py-3">Price</th>
              <th className="px-4 py-3">Stock</th>
              <th className="px-4 py-3">Cover</th>
              <th className="px-4 py-3">Genre</th>
              <th className="px-4 py-3">Author ID</th>
              <th className="px-4 py-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan="7" className="text-center py-4">Memuat data...</td></tr>
            ) : books.length === 0 ? (
              <tr><td colSpan="7" className="text-center py-4 text-gray-400">Belum ada data buku. Silakan tambah produk baru!</td></tr>
            ) : (
              books.map((book) => (
                <tr key={book.id} className="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                  <td className="px-4 py-3 font-medium text-gray-900 dark:text-white">{book.title || "-"}</td>
                  <td className="px-4 py-3">Rp {book.price || 0}</td>
                  <td className="px-4 py-3">{book.stock || 0}</td>
                  <td className="px-4 py-3 text-indigo-600">{book.cover_photo || "default.jpg"}</td>
                  {/* Cek jika isi genre berupa nama langsung atau ID */}
                  <td className="px-4 py-3">{book.genre || book.genre_id || "-"}</td>
                  <td className="px-4 py-3">{book.author_id || "-"}</td>
                  
                  {/* Tombol Aksi */}
                  <td className="px-4 py-3 text-center flex justify-center space-x-2">
                    <Link 
                      to={`/admin/books/edit/${book.id}`} 
                      className="text-white bg-green-600 hover:bg-green-700 font-medium rounded-lg text-xs px-3 py-1.5"
                    >
                      Edit
                    </Link>
                    <button 
                      onClick={() => handleDelete(book.id)} 
                      className="text-white bg-red-600 hover:bg-red-700 font-medium rounded-lg text-xs px-3 py-1.5"
                    >
                      Delete
                    </button>
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