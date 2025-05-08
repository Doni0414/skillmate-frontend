import { useEffect } from "react";
import { changeExchangeRequestStatus, getUserById } from "../../../api";
import { useState } from "react";
import Router from "next/router";

export function useRequestCardState(request, setRequests) {
    const [requester, setRequester] = useState();

    const fetchUser = () => {
        getUserById(request.requesterId)
                .then((response) => {
                    setRequester(response.data);
                })
                .catch((error) => {
                    console.error("Error fetching user:", error);
                });
    }

    useEffect(() => {
        if (request) {
            fetchUser();
        }
    }, [request]);

    const handleAcceptClick = () => {
        changeExchangeRequestStatus(request.id, "ACCEPTED")
        .then(response => {
            Router.push("/chat");
        })
        .catch(error => {
            console.error("Error accepting request:", error);
        })
    }

    const handleDeclineClick = () => {
        changeExchangeRequestStatus(request.id, "DECLINED")
        .then(response => {
            setRequests(prevRequests => prevRequests.filter(r => r.id !== request.id));
        })
        .catch(error => {
            console.error("Error declining request:", error);
        })
    }

    return {requester, handleAcceptClick, handleDeclineClick};
}