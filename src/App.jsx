import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/public";
import Books from "./pages/public/books";
import PublicLayout from "./layouts/public";

// === IMPORT COMPONENT AUTH & ADMIN ===
import Login from "./pages/auth/login.jsx";
import Register from "./pages/auth/register.jsx";
import AdminLayout from "./layouts/admin.jsx";
import Dashboard from "./pages/admin"; 

// === IMPORT FITUR BOOKS ===
import AdminBooks from "./pages/admin/books/index.jsx"; 
import CreateBook from "./pages/admin/books/create.jsx"; 
import BookEdit from "./pages/admin/books/edit.jsx"; 

// === IMPORT FITUR GENRES ===
import AdminGenres from "./pages/admin/genres/index.jsx";
import GenreCreate from "./pages/admin/genres/create.jsx"; 
import GenreEdit from "./pages/admin/genres/edit.jsx"; 

// === IMPORT FITUR AUTHORS ===
import AdminAuthors from "./pages/admin/authors/index.jsx";
import CreateAuthor from "./pages/admin/authors/create.jsx"; 
import AuthorEdit from "./pages/admin/authors/edit.jsx"; 

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>

          {/* Public Routing */}
          <Route element={<PublicLayout />}>
            <Route index element={<Home />} />
            <Route path="books" element={<Books />} />
          </Route>

          {/* Auth Routing */}
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />

          {/* Admin Routing */}
          <Route path="admin" element={<AdminLayout />}>
            <Route index element={<Dashboard />} />
            
            {/* Fitur Books */}
            <Route path="books">
              <Route index element={<AdminBooks />} />
              <Route path="create" element={<CreateBook />} />
              <Route path="edit/:id" element={<BookEdit />} />
            </Route>

            {/* Fitur Genres */}
            <Route path="genres">
              <Route index element={<AdminGenres />} />
              <Route path="create" element={<GenreCreate />} />
              <Route path="edit/:id" element={<GenreEdit />} />
            </Route>

            {/* Fitur Authors */}
            <Route path="authors">
              <Route index element={<AdminAuthors />} />
              <Route path="create" element={<CreateAuthor />} />
              <Route path="edit/:id" element={<AuthorEdit />} />
            </Route>

          </Route>

        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;