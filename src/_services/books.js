import API from "../_api"; // <-- Pastikan arah import ke file konfigurasi API kamu sudah benar

export const getBooks = async () => {
  try {
    const response = await API.get("/books");
    return response.data; // JSON Server langsung mengembalikan array data di dalam response.data
  } catch (error) {
    console.error("Error saat getBooks:", error);
    throw error;
  }
};
