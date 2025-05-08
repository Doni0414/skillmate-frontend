import clsx from "clsx";
import { ToggleButtonContainer } from "./toggle-button-container";
import { Fira_Sans, Inter } from "next/font/google";
import { SearchIcon } from "./icons/search-icon";
import { AdsFiltersContainer } from "./ads-filters-container";
import { AdsContainer } from "./ads-container";
import { useSearchPageContentState } from "./model/use-search-page-content-state";
import { UserCard } from "./user-card";
import Image from "next/image";
import { getResourceURLById } from "../api";
import { ViewProfileButton } from "./view-profile-button";
import { SkillCard } from "./skill-card";
import defaultAvaSrc from "../header/images/ava.png";

export const inter = Inter({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

const firaSans = Fira_Sans({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export function SearchPageContent({ className }) {
  const {
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
    users,
    handleClickOnUsersSearch,
  } = useSearchPageContentState();
  return (
    <div className={clsx(className, "px-[110px]")}>
      <ToggleButtonContainer
        adsActive={adsActive}
        handleOnAdsClick={handleOnAdsClick}
        handleOnUsersClick={handleOnUsersClick}
      />
      {adsActive ? (
        <SearchContainer
          searchInputValue={searchInputValue}
          handleOnSearchInputChange={handleOnSearchInputChange}
          handleClickOnSearch={handleClickOnSearch}
        />
      ) : (
        <SearchContainer
          searchInputValue={searchInputValue}
          handleOnSearchInputChange={handleOnSearchInputChange}
          handleClickOnSearch={handleClickOnUsersSearch}
          placeholder="Search for users..."
        />
      )}
      <div className="flex gap-x-[114px]">
        {adsActive ? (
          <AdsFiltersContainer
            className={inter.className}
            selectedCountries={selectedCountries}
            setSelectedCountries={setSelectedCountries}
            selectedLevels={selectedLevels}
            setSelectedLevels={setSelectedLevels}
            selectedCities={selectedCities}
            setSelectedCities={setSelectedCities}
          />
        ) : (
          <></>
        )}
        {adsActive ? (
          <AdsContainer ads={ads} className={firaSans.className} />
        ) : (
          <div className="ml-[393px]">
            <div className="mb-[38px] font-medium text-[19px]">
              {users.length} results found
            </div>
            <div className="grid grid-cols-2 gap-x-[130px] gap-y-[140px]">
              {users.map((user) => (
                <UserCard
                  ProfileImage={
                    <Image
                      alt="ava"
                      src={
                        user.imageResourceId
                          ? getResourceURLById(user.imageResourceId)
                          : defaultAvaSrc
                      }
                      width={50}
                      height={50}
                      className="w-[50px] h-[50px] rounded-full"
                    />
                  }
                  fullName={user.fullName}
                  viewProfileButton={<ViewProfileButton userId={user.id} />}
                  skills={
                    user.skills &&
                    user.skills.map((skill) => <SkillCard skill={skill} />)
                  }
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function SearchContainer({
  searchInputValue,
  handleOnSearchInputChange,
  handleClickOnSearch,
  placeholder = "What you want to learn?",
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
        placeholder={placeholder}
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
