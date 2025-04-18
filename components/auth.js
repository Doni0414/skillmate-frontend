import Router, { useRouter } from "next/router"
import { useEffect } from "react";
import Cookies from "js-cookie"

export const withAuth = (Component, apiClient) => {
    return (props) => {
        const router = useRouter();
        useEffect(() => {
            apiClient.get("/users/profile")
            .then(response => {
                
            }).catch(error => {
                Router.push("/auth")
            });
        }, []);

        return <Component {...props} /> 
    }
}