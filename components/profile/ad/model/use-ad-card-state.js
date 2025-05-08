import { useEffect } from "react";
import { useState } from "react";
import { getRequestsByAdId } from "../../../api";

export function useAdCardState(ad) {
    const [seeRequestsPopupOpen, setSeeRequestsPopupOpen] = useState(false);
    const [requests, setRequests] = useState([]);
    const handleClickOnSeeRequestsButton = () => {
        setSeeRequestsPopupOpen(true);
    }

    const closeSeeRequestsPopup = () => {
        setSeeRequestsPopupOpen(false);
    }

    useEffect(() => {
        if (ad) {
            getRequestsByAdId(ad.id)
                .then((response) => {
                    setRequests(response.data.filter(request => request.exchangeStatus === "PENDING"));
                })
                .catch((error) => {
                    console.error("Error fetching requests:", error);
                });
        }
    }, [ad]);

    return {
        requests,
        setRequests,
        seeRequestsPopupOpen,
        handleClickOnSeeRequestsButton,
        closeSeeRequestsPopup
    }
}