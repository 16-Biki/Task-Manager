import axios from "axios";

const API = axios.create({
  baseURL: "https://task-manager-ugo7.onrender.com/api",
});

// Attach token to each request
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) req.headers.Authorization = `Bearer ${token}`;
  return req;
});

export default API;
