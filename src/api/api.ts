import axios from "axios";

export function updateApiToken(token: string){
  localStorage.setItem('app_tocken', token)
}

const api = axios.create({
  baseURL: "http://localhost:7000",
});

// Interceptor: agrega el token automáticamente a cada request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("app_tocken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;