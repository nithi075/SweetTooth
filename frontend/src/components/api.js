import axios from "axios";

const API = axios.create({
  baseURL: "https://sweettooth-backend.onrender.com/api",
  timeout: 50000, // 🔥 MUST (20 seconds)
});

export default API;
