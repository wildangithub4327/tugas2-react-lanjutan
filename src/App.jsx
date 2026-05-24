import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/public";
import Books from "./pages/public/books";
import PublicLayout from "./layouts/public";

// === IMPORT COMPONENT AUTH & ADMIN ===
import Login from "./pages/auth/login.jsx";
import Register from "./pages/auth/register.jsx";
import AdminLayout from "./layouts/admin.jsx";
import Dashboard from "./pages/admin"; 
import AdminBooks from "./pages/admin/books";
import BookCreate from "./pages/admin/books/create.jsx";

// === IMPORT FITUR GENRE ===
import AdminGenres from "./pages/admin/genres/index.jsx";
import GenreCreate from "./pages/admin/genres/create.jsx";

// === IMPORT FITUR AUTHOR ===
import AdminAuthors from "./pages/admin/authors/index.jsx";
import AuthorCreate from "./pages/admin/authors/create.jsx";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>

          {/* Public */}
          <Route element={<PublicLayout />}>
            <Route index element={<Home />} />
            <Route path="books" element={<Books />} />
          </Route>

          {/* Auth */}
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />

          {/* Admin */}
          <Route path="admin" element={<AdminLayout />}>
            <Route index element={<Dashboard />} />
            
            {/* Fitur Books */}
            <Route path="books">
              <Route index element={<AdminBooks />} />
              <Route path="create" element={<BookCreate />} />
            </Route>

            {/* Fitur Genres */}
            <Route path="genres">
              <Route index element={<AdminGenres />} />
              <Route path="create" element={<GenreCreate />} />
            </Route>

            {/* Fitur Authors (Udah ditaruh di dalem blok admin dengan bener) */}
            <Route path="authors">
              <Route index element={<AdminAuthors />} />
              <Route path="create" element={<AuthorCreate />} />
            </Route>

          </Route> {/* <--- Penutup Utama Route Admin */}

        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;