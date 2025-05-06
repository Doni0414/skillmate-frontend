import clsx from "clsx";
import { ToggleButtonContainer } from "./toggle-button-container";
import { useEffect, useRef, useState } from "react";
import { Fira_Sans, Inter } from "next/font/google";
import { SearchIcon } from "./icons/search-icon";
import { FiltersContainer } from "./filters-container";
import { AdsContainer } from "./ads-container";
import apiClient from "../api-client";
import { searchAds } from "../api";

export const inter = Inter({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

const firaSans = Fira_Sans({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export function SearchPageContent({ className }) {
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

  return (
    <div className={clsx(className, "px-[110px]")}>
      <ToggleButtonContainer
        adsActive={adsActive}
        handleOnAdsClick={handleOnAdsClick}
        handleOnUsersClick={handleOnUsersClick}
      />
      <SearchContainer
        searchInputValue={searchInputValue}
        handleOnSearchInputChange={handleOnSearchInputChange}
        handleClickOnSearch={handleClickOnSearch}
      />
      <div className="flex gap-x-[114px]">
        <FiltersContainer
          className={inter.className}
          selectedCountries={selectedCountries}
          setSelectedCountries={setSelectedCountries}
          selectedLevels={selectedLevels}
          setSelectedLevels={setSelectedLevels}
          selectedCities={selectedCities}
          setSelectedCities={setSelectedCities}
        />
        <AdsContainer ads={ads} className={firaSans.className} />
      </div>
    </div>
  );
}

function SearchContainer({
  searchInputValue,
  handleOnSearchInputChange,
  searchBarInputRef,
  handleClickOnSearch,
}) {
  const handleOnKeyDown = (event) => {
    if (event.key === "Enter") {
      handleClickOnSearch();
    }
  };
  return (
    <div className="ml-[393px] mb-[38px] flex gap-6">
      <input
        onKeyDown={handleOnKeyDown}
        value={searchInputValue}
        onChange={handleOnSearchInputChange}
        placeholder="What you want to learn?"
        className={clsx(
          "w-[693px] pl-[61px] py-4 rounded-[25px] bg-[#F0F0F0]/60 text-[22px] text-black/[57] shadow-md focus:outline-none",
          inter.className,
        )}
      />
      <button
        onClick={handleClickOnSearch}
        className="px-[42px] py-5 bg-[#3C5AA5] rounded-[15px] cursor-pointer shadow-md hover:bg-[#3C5AA5]/90 transition-colors"
      >
        <SearchIcon />
      </button>
    </div>
  );
}
