import axios from "axios";

declare module 'axios' {
    interface AxiosRequestConfig {
      _isAuthCheck?: boolean;
    }
  }
  

const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    withCredentials: true,
});

api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401 && !error.config._isAuthCheck) {
            window.location.href = "/"
        }
        return Promise.reject(error)
    }
)

export default api;