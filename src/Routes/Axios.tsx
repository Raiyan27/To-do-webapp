import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://todo-backend-le3i.onrender.com",
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;
