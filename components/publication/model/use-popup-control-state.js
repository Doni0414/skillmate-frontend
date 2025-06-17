import { useState } from "react";

export function usePopupControlState() {
    const [isPopupOpen, setIsPopupOpen] = useState(false);

    const handleClickOnComments = () => {
        setIsPopupOpen(true);
    }

    const closePopup = () => {
        setIsPopupOpen(false);
    }

    return {
        isPopupOpen,
        handleClickOnComments,
        closePopup
    }
}