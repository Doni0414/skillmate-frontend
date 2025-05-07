import { Publication } from "../publication/publication";
import { AdsIcon } from "./icon/ads-icon";
import { HeartIcon } from "./icon/heart-icon";
import { PostsIcon } from "./icon/posts-icon";
import { useProfileBodyState } from "./model/use-profile-body-state";
import { ProfileBodyLayout } from "./ui/profile-body-layout";
import { ProfileBodyMenuButton } from "./ui/profile-body-menu-button";
import { PublicationsLayout } from "./ui/publications-layout";

export function ProfileBody({ currentUser, user }) {
  const {
    postsToggled,
    favouritesToggled,
    adsToggled,
    handlePostsToggle,
    handleFavouritesToggle,
    handleAdsToggle,
    publications,
    ads,
  } = useProfileBodyState(user);
  return (
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
        ) : null
      }
    />
  );
}
