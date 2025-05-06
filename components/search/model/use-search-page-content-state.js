import { useEffect, useState } from "react";
import { getUserSkillsByUserId, searchAds, searchUsers } from "../../api";
import { fetchUsersAndSkills } from "./fetch-users-and-skills";

export function useSearchPageContentState() {
    const page = 1;
    const size = 10000;
    const [adsActive, setAdsActive] = useState(true);
    const handleOnAdsClick = () => {
    setAdsActive(true);
    };
    const handleOnUsersClick = () => {
    setAdsActive(false);
    };

    const [ads, setAds] = useState([]);
    const [selectedCountries, setSelectedCountries] = useState([]);
    const [selectedCities, setSelectedCities] = useState([]);
    const [selectedLevels, setSelectedLevels] = useState([]);
    const [searchInputValue, setSearchInputValue] = useState("");
    const handleOnSearchInputChange = (event) => {
    setSearchInputValue(event.target.value);
    };

    useEffect(() => {
    const timeout = setTimeout(() => {
        searchAds(
        searchInputValue,
        selectedCountries,
        selectedCities,
        selectedLevels.map((level) => level.toUpperCase()),
        page,
        size,
        )
        .then((response) => {
            setAds(response.data.content);
        })
        .catch((error) => {
            console.log("Error while searching ads", error);
        });
    }, 500);

    return () => {
        clearTimeout(timeout);
    };
    }, [selectedCountries, selectedCities, selectedLevels]);
    const handleClickOnSearch = () => {
    searchAds(
        searchInputValue,
        selectedCountries,
        selectedCities,
        selectedLevels.map((level) => level.toUpperCase()),
        page,
        size,
    )
        .then((response) => {
        setAds(response.data.content);
        })
        .catch((error) => {
        console.log("Error while searching ads", error);
        });
    };

    const [users, setUsers] = useState([]);
    useEffect(() => {
        const timeout = setTimeout(() => {
            fetchUsersAndSkills(searchInputValue, page, size, setUsers);
        }, 500);

        return () => {
            clearTimeout(timeout);
        };
    }, []);

    const handleClickOnUsersSearch = () => {
        fetchUsersAndSkills(searchInputValue, page, size, setUsers);
    }

    return {
        adsActive,
        handleOnAdsClick,
        handleOnUsersClick,
        searchInputValue,
        handleOnSearchInputChange,
        handleClickOnSearch,
        ads,
        selectedCountries,
        setSelectedCountries,
        selectedLevels,
        setSelectedLevels,
        selectedCities,
        setSelectedCities,
        setSearchInputValue,
        handleClickOnUsersSearch,
        users,
    }
}