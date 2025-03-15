import { useEffect, useState } from "react";
import apiClient from "../api-client";

export function useHeaderState() {
    const [isCreateAdPopupOpen, setIsCreateAdPopupOpen] = useState(false);

    const handleClickOnCloseCreateAdPopup = () => {
        setIsCreateAdPopupOpen(false);
    }

    const [user, setUser] = useState({});

    useEffect(() => {
        apiClient.get("/users/profile")
        .then(response => {
            setUser(response.data);
        }).catch(error => {
            console.log("Error while obtaining user in header", error);
        });
    }, []);

    return {
        user,
        isCreateAdPopupOpen,
        setIsCreateAdPopupOpen,
        handleClickOnCloseCreateAdPopup
    }
}