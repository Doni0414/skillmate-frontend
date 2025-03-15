import axios from "axios";
import Router from "next/router";
import { defaultProps } from "react-select/base";

const apiClient = axios.create({
    baseURL: "http://localhost:8080/api",
    withCredentials: true
})

apiClient.interceptors.response.use(
    response => response,
    error => {
        if (error.response && (error.response.status === 401 || error.response.status === 403)) {
            Router.push("/auth");
        }
        return Promise.reject(error);
    }
)

export default apiClient;