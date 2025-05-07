import { useState } from "react";

export function useProfileBodyState(user) {
    const [postsToggled, setPostsToggled] = useState(true);
    const [favouritesToggled, setFavouritesToggled] = useState(false);
    const [adsToggled, setAdsToggled] = useState(false);

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
    return {
        postsToggled, 
        favouritesToggled, 
        adsToggled, 
        handlePostsToggle, 
        handleFavouritesToggle, 
        handleAdsToggle
    };
}