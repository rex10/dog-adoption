import axios from "axios";


const api = axios.create({
    baseURL: 'https://frontend-take-home-service.fetch.com',
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