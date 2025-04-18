import { useEffect, useState } from "react";
import { me } from "../api";

export function useHeaderState() {
    const [isCreateAdPopupOpen, setIsCreateAdPopupOpen] = useState(false);

    const handleClickOnCloseCreateAdPopup = () => {
        setIsCreateAdPopupOpen(false);
    }

    const [user, setUser] = useState();

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await me();
            setUser(response.data);
        } catch (error) {

        }
    }

    return {
        user,
        isCreateAdPopupOpen,
        setIsCreateAdPopupOpen,
        handleClickOnCloseCreateAdPopup
    }
}