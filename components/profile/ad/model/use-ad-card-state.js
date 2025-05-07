import { useState } from "react";

export function useAdCardState(ad) {
    const [seeRequestsPopupOpen, setSeeRequestsPopupOpen] = useState(false);
    const handleClickOnSeeRequestsButton = () => {
        setSeeRequestsPopupOpen(true);
    }

    const closeSeeRequestsPopup = () => {
        setSeeRequestsPopupOpen(false);
    }

    return {
        seeRequestsPopupOpen,
        handleClickOnSeeRequestsButton,
        closeSeeRequestsPopup
    }
}