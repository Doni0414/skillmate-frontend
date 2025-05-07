import { useEffect } from "react";
import { useState } from "react";
import { getAdsByUserId, getPublicationsByCategoriesAndUserIdAndPageAndPageSize, getPublicationsByUserId } from "../../api";

export function useProfileBodyState(user) {
    const [postsToggled, setPostsToggled] = useState(true);
    const [favouritesToggled, setFavouritesToggled] = useState(false);
    const [adsToggled, setAdsToggled] = useState(false);
    const [publications, setPublications] = useState([]);
    const [ads, setAds] = useState([]);
    const [isCreateAdPopupOpen, setIsCreateAdPopupOpen] = useState(false);

    const handlePostsToggle = () => {
        setPostsToggled(true);
        setFavouritesToggled(false);
        setAdsToggled(false);
    }
    const handleFavouritesToggle = () => {
        setPostsToggled(false);
        setFavouritesToggled(true);
        setAdsToggled(false);
    }
    const handleAdsToggle = () => {
        setPostsToggled(false);
        setFavouritesToggled(false);
        setAdsToggled(true);
    }

    useEffect(() => {
        if (postsToggled && user) {
            getPublicationsByUserId(user.id, 0, 10000000)
            .then(response => {
                setPublications(response.data);
            })
            .catch(error => {
                console.error("Error fetching publications:", error);
            });
        }

        if (adsToggled && user) {
            getAdsByUserId(user.id)
            .then(response => {
                setAds(response.data);
            })
            .catch(error => {
                console.error("Error fetching ads:", error);
            });
        }
    }, [postsToggled, adsToggled, user]);

    const handleClickOnCreateNewAdButton = () => {
        setIsCreateAdPopupOpen(true);
    }

    const closeCreateAdPopup = () => {
        setIsCreateAdPopupOpen(false);
    }

    return {
        postsToggled, 
        favouritesToggled, 
        adsToggled, 
        ads,
        handlePostsToggle, 
        handleFavouritesToggle, 
        handleAdsToggle,
        publications,
        handleClickOnCreateNewAdButton,
        isCreateAdPopupOpen,
        closeCreateAdPopup
    };
}