import { Modal } from "../common/modal";
import { CreateAdPopup } from "../create-ad/create-ad";
import { Publication } from "../publication/publication";
import { AdCard } from "./ad/ad-card";
import { AdsIcon } from "./icon/ads-icon";
import { PostsIcon } from "./icon/posts-icon";
import { useProfileBodyState } from "./model/use-profile-body-state";
import { AdsLayout } from "./ui/ads-layout";
import { CreateNewAddButton } from "./ui/create-new-add-button";
import { ProfileBodyLayout } from "./ui/profile-body-layout";
import { ProfileBodyMenuButton } from "./ui/profile-body-menu-button";
import { PublicationsLayout } from "./ui/publications-layout";

export function ProfileBody({ currentUser, user, isOwn }) {
  const {
    postsToggled,
    adsToggled,
    handlePostsToggle,
    handleAdsToggle,
    publications,
    ads,
    handleClickOnCreateNewAdButton,
    isCreateAdPopupOpen,
    closeCreateAdPopup,
  } = useProfileBodyState(user);
  return (
    <>
      <Modal isOpen={isCreateAdPopupOpen} onClose={closeCreateAdPopup}>
        <CreateAdPopup
          user={currentUser}
          closePopup={handleClickOnCreateNewAdButton}
        />
      </Modal>
      <ProfileBodyLayout
        menuButtons={[
          <ProfileBodyMenuButton
            text="POSTS"
            icon={<PostsIcon />}
            toggled={postsToggled}
            onClick={handlePostsToggle}
          />,
          <ProfileBodyMenuButton
            text="MY ADS"
            icon={<AdsIcon />}
            toggled={adsToggled}
            onClick={handleAdsToggle}
          />,
        ]}
        items={
          postsToggled ? (
            <PublicationsLayout
              publications={publications.map((publication) => (
                <Publication publication={publication} />
              ))}
            />
          ) : (
            <AdsLayout
              isOwn={isOwn}
              createNewAddButton={
                <CreateNewAddButton onClick={handleClickOnCreateNewAdButton} />
              }
              ads={ads.map((ad) => (
                <AdCard isOwn={isOwn} ad={ad} />
              ))}
            />
          )
        }
      />
    </>
  );
}
