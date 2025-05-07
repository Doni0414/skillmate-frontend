import Image from "next/image";
import { getResourceURLById, logout } from "../../api";
import { ArrowHeaderIcon } from "../icons/arrow-header-icon";
import { useState } from "react";
import { NavigationLink } from "./navigation-link";
import { HeaderProfileContainerLayout } from "./header-profile-container-layout";
import { PopupNavigationButtons } from "./popup-navigation-buttons";
import { NavigationButton } from "./navigation-button";
import Router from "next/router";
import defaultAvaSrc from "../images/ava.png";

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
          src={
            user.imageResourceId
              ? getResourceURLById(user.imageResourceId)
              : defaultAvaSrc
          }
          width={28}
          height={28}
          className="w-9 h-9 rounded-full object-cover"
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
          <NavigationLink link={`/profile/${user.id}`} text="My profile" />
          <NavigationLink link="/my-profile" text="Profile settings" />
          <NavigationButton handleClick={handleClickOnLogout} text="Log out" />
        </PopupNavigationButtons>
      }
    />
  );
}
