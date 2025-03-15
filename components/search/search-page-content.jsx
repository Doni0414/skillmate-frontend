import clsx from "clsx";
import { ToggleButtonContainer } from "./toggle-button-container";
import { useEffect, useRef, useState } from "react";
import { Fira_Sans, Inter } from "next/font/google";
import { SearchIcon } from "./icons/search-icon";
import { FiltersContainer } from "./filters-container";
import { AdsContainer } from "./ads-container";
import apiClient from "../api-client";

export const inter = Inter({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

const firaSans = Fira_Sans({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export function SearchPageContent({ className }) {
  const [adsActive, setAdsActive] = useState(true);
  const handleOnAdsClick = () => {
    setAdsActive(true);
  };
  const handleOnUsersClick = () => {
    setAdsActive(false);
  };

  const searchBarInputRef = useRef(null);

  const [ads, setAds] = useState([]);
  useEffect(() => {
    const searchValue = searchBarInputRef.current?.value;
    apiClient
      .get(`/ads?searchValue=${searchValue}`)
      .then((response) => {
        setAds(response.data.content);
      })
      .catch((error) => {
        console.log("Error while searching ads", error);
      });
  }, []);
  const handleClickOnSearch = () => {
    const page = 1;
    const size = 10000;
    const searchValue = searchBarInputRef.current?.value;
    apiClient
      .get(`/ads?searchValue=${searchValue}`)
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
        searchBarInputRef={searchBarInputRef}
        handleClickOnSearch={handleClickOnSearch}
      />
      <div className="flex gap-x-[114px]">
        <FiltersContainer className={inter.className} />
        <AdsContainer ads={ads} className={firaSans.className} />
      </div>
    </div>
  );
}

function SearchContainer({ searchBarInputRef, handleClickOnSearch }) {
  return (
    <div className="ml-[393px] mb-[38px] flex gap-6">
      <input
        ref={searchBarInputRef}
        placeholder="What you want to learn?"
        className={clsx(
          "w-[693px] pl-[61px] py-4 rounded-[25px] bg-[#F0F0F0]/60 text-[22px] text-black/[57] shadow-md focus:outline-none",
          inter.className,
        )}
      />
      <button
        onClick={handleClickOnSearch}
        className="px-[42px] py-5 bg-[#3C5AA5] rounded-[15px] cursor-pointer shadow-md"
      >
        <SearchIcon />
      </button>
    </div>
  );
}
