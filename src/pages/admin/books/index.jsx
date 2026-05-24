import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default function AdminBooks() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeDropdown, setActiveDropdown] = useState(null);

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
        console.error(err);
        setLoading(false);
      });
  };

  const handleDelete = (id) => {
    if (window.confirm("Yakin hapus buku ini?")) {
      axios.delete(`http://localhost:8000/books/${id}`)
        .then(() => {
          fetchBooks();
          setActiveDropdown(null);
        });
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
              <th className="px-4 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan="7" className="text-center py-4">Memuat data...</td></tr>
            ) : (
              books.map((book) => (
                <tr key={book.id} className="border-b dark:border-gray-700">
                  <td className="px-4 py-3 font-medium text-gray-900 dark:text-white">{book.title}</td>
                  <td className="px-4 py-3">Rp {book.price}</td>
                  <td className="px-4 py-3">{book.stock}</td>
                  <td className="px-4 py-3 text-indigo-600">{book.cover_photo}</td>
                  <td className="px-4 py-3">{book.genre}</td>
                  <td className="px-4 py-3">{book.author_id}</td>
                  <td className="px-4 py-3 relative text-right">
                    <button onClick={() => setActiveDropdown(activeDropdown === book.id ? null : book.id)} className="text-gray-500 font-bold p-1">
                      ...
                    </button>
                    {activeDropdown === book.id && (
                      <div className="absolute right-0 mt-2 w-28 bg-white border rounded shadow-lg z-50 text-left dark:bg-gray-700">
                        <Link to={`/admin/books/edit/${book.id}`} className="block px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-600">Edit</Link>
                        <button onClick={() => handleDelete(book.id)} className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 dark:hover:bg-gray-600">Delete</button>
                      </div>
                    )}
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