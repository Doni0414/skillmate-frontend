import axios from "axios";
import Router, { useRouter } from "next/router";
import { defaultProps } from "react-select/base";

const apiClient = axios.create({
    baseURL: "http://localhost:8080/api",
    withCredentials: true
})

apiClient.interceptors.response.use(
    response => response,
    error => {
        return Promise.reject(error);
    }
)

export default apiClient;