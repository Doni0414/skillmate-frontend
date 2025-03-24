import logoSrc from "./images/logo.svg";
import Image from "next/image";
import { clsx } from "clsx";
import { Raleway, Red_Hat_Display } from "next/font/google";
import profileSrc from "./images/profile.png";
import { ArrowHeaderIcon } from "./icons/arrow-header-icon";
import { useHeaderState } from "./use-header-state";
import { Modal } from "../common/modal";
import { CreateAdPopup } from "../create-ad/create-ad";
import { useState } from "react";
import { RESOURCES_PREFIX } from "../my-profile/use-my-profile-state";

const redHatDisplay = Red_Hat_Display({ subsets: ["latin"] });
const raleway = Raleway({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export function Header() {
  const {
    user,
    isCreateAdPopupOpen,
    setIsCreateAdPopupOpen,
    handleClickOnCloseCreateAdPopup,
  } = useHeaderState();
  return (
    <header
      className={clsx(
        "flex items-center px-[100px] h-24 bg-[#E1F6FF]",
        raleway.className,
      )}
    >
      <Modal
        isOpen={isCreateAdPopupOpen}
        onClose={handleClickOnCloseCreateAdPopup}
      >
        <CreateAdPopup
          user={user}
          closePopup={handleClickOnCloseCreateAdPopup}
        />
      </Modal>
      <a href="/" className="flex items-center mr-[264px]">
        <Image src={logoSrc} alt="logo" width={70} height={70} />
        <span
          className={clsx(
            "text-[#3C5AA5] font-extrabold text-4xl ml-2.5",
            redHatDisplay,
          )}
        >
          SkillMate
        </span>
      </a>
      <NavigationButtons setIsCreateAdPopupOpen={setIsCreateAdPopupOpen} />

      <HeaderProfileContainer user={user} />
    </header>
  );
}

function NavigationButtons({ setIsCreateAdPopupOpen }) {
  const handleClickOnCreateAdButton = () => {
    setIsCreateAdPopupOpen(true);
  };

  return (
    <div className="flex items-center gap-[77px] text-[18px] text-black/70 font-medium mr-[167px]">
      <a href="/chat">Chat</a>
      <a href="#">Posts</a>
      <button onClick={handleClickOnCreateAdButton} className="cursor-pointer">
        Create ad
      </button>
      <a href="/">Discover ad</a>
    </div>
  );
}

function HeaderProfileContainer({ user }) {
  const [isAdditionalNavigationPopupOpen, setIsAdditionalNavigationPopupOpen] =
    useState(false);
  const handleOnMouseEnter = () => {
    setIsAdditionalNavigationPopupOpen(true);
  };

  const handleOnMouseLeave = () => {
    setIsAdditionalNavigationPopupOpen(false);
  };

  return (
    <button
      onMouseEnter={handleOnMouseEnter}
      onMouseLeave={handleOnMouseLeave}
      className="relative flex items-center gap-3 cursor-pointer"
    >
      <div className="text-black/90 text-[15px] font-semibold leading-7">
        {user.fullName}
      </div>
      <Image
        src={RESOURCES_PREFIX + user.imageResourceId}
        width={28}
        height={28}
        className="w-9 h-9 rounded-full"
      />
      <ArrowHeaderIcon />
      {isAdditionalNavigationPopupOpen && (
        <div className="absolute top-9 left-6 px-3 py-2 bg-white text-semibold text-[18px]">
          <a href="/my-profile" className="block">
            Profile
          </a>
          <a href="#" className="block">
            Logout
          </a>
        </div>
      )}
    </button>
  );
}
