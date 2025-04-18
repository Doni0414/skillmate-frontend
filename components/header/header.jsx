import logoSrc from "./images/logo.svg";
import Image from "next/image";
import { useHeaderState } from "./use-header-state";
import { Modal } from "../common/modal";
import { CreateAdPopup } from "../create-ad/create-ad";
import {
  HeaderLayout,
  UnauthenticatedUserHeaderLayout,
} from "./ui/header-layout";
import { NavigationLinks } from "./ui/navigation-links";
import { HeaderProfileContainer } from "./ui/header-profile-container";
import { AuthButtonsLayout } from "./ui/auth-buttons-layout";
import { NavigationButton } from "./ui/navigation-button";
import { AuthButton } from "./ui/auth-button";
import Router from "next/router";

export function Header() {
  const {
    user,
    isCreateAdPopupOpen,
    setIsCreateAdPopupOpen,
    handleClickOnCloseCreateAdPopup,
  } = useHeaderState();

  const logo = <Image src={logoSrc} alt="logo" width={70} height={70} />;
  const companyName = "Skillmate";

  const handleClickOnSignin = () => {
    Router.push("/auth?authType=signin");
  };

  const handleClickOnSignup = () => {
    Router.push("/auth?authType=signup");
  };

  return (
    <>
      {user ? (
        <HeaderLayout
          logo={logo}
          companyName={companyName}
          navigationButtons={
            <NavigationLinks setIsCreateAdPopupOpen={setIsCreateAdPopupOpen} />
          }
          headerProfileContainer={<HeaderProfileContainer user={user} />}
        />
      ) : (
        <UnauthenticatedUserHeaderLayout
          logo={logo}
          companyName={companyName}
          authButtons={
            <AuthButtonsLayout
              signupButton={
                <AuthButton text="Sign up" handleClick={handleClickOnSignup} />
              }
              loginButton={
                <AuthButton
                  text="Sign in"
                  variant="signin"
                  handleClick={handleClickOnSignin}
                />
              }
            />
          }
        />
      )}
      <Modal
        isOpen={isCreateAdPopupOpen}
        onClose={handleClickOnCloseCreateAdPopup}
      >
        <CreateAdPopup
          user={user}
          closePopup={handleClickOnCloseCreateAdPopup}
        />
      </Modal>
    </>
  );
}
