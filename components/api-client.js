import axios from "axios";

const apiClient = axios.create({
    baseURL: "http://213.109.146.203:8080/api",
    withCredentials: true
})

apiClient.interceptors.response.use(
    response => response,
    error => {
        return Promise.reject(error);
    }
)

export default apiClient;