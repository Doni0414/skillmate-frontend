import Image from "next/image";
import { getResourceURLById, logout } from "../../api";
import { ArrowHeaderIcon } from "../icons/arrow-header-icon";
import { useState } from "react";
import { NavigationLink } from "./navigation-link";
import { HeaderProfileContainerLayout } from "./header-profile-container-layout";
import { PopupNavigationButtons } from "./popup-navigation-buttons";
import { NavigationButton } from "./navigation-button";
import Router from "next/router";

export function HeaderProfileContainer({ user }) {
  const [isAdditionalNavigationPopupOpen, setIsAdditionalNavigationPopupOpen] =
    useState(false);
  const handleOnMouseEnter = () => {
    console.log("enter");
    setIsAdditionalNavigationPopupOpen(true);
  };

  const handleOnMouseLeave = () => {
    setIsAdditionalNavigationPopupOpen(true);
  };

  const handleClickOnLogout = () => {
    logout();
    Router.push("/auth");
  };

  return (
    <HeaderProfileContainerLayout
      user={user}
      profileImage={
        <Image
          src={getResourceURLById(user.imageResourceId)}
          width={28}
          height={28}
          className="w-9 h-9 rounded-full"
        />
      }
      arrowDownIcon={<ArrowHeaderIcon />}
      isAdditionalNavigationPopupOpen={isAdditionalNavigationPopupOpen}
      handleOnMouseEnter={handleOnMouseEnter}
      handleOnMouseLeave={handleOnMouseLeave}
      popupNavigationButtons={
        <PopupNavigationButtons
          isAdditionalNavigationPopupOpen={isAdditionalNavigationPopupOpen}
        >
          <NavigationLink link="/my-profile" text="Profile" />
          <NavigationButton handleClick={handleClickOnLogout} text="Logout" />
        </PopupNavigationButtons>
      }
    />
  );
}
