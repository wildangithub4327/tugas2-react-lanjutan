import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8000", // <--- PASTIKAN PORTNYA 8000 SESUAI TERMINAL KAMU
});

export default API;
