import { useRouter } from "next/router";
import apiClient from "../../components/api-client";
import { withAuth } from "../../components/auth";
import { Header } from "../../components/header/header";
import { ProfileHeader } from "../../components/profile/profile-header";
import { useProfilePageState } from "../../components/profile/model/use-profile-page-state";
import { ProfileBody } from "../../components/profile/profile-body";

function ProfilePage() {
  const router = useRouter();
  const { userId } = router.query;

  const { user, reviews, currentUser, isOwn } = useProfilePageState(userId);
  if (!user || !currentUser || !reviews) return null;
  return (
    <ProfilePageLayout
      header={<Header />}
      profileHeader={<ProfileHeader user={user} reviews={reviews} />}
      profileBody={
        <ProfileBody isOwn={isOwn} currentUser={currentUser} user={user} />
      }
    />
  );
}

function ProfilePageLayout({ header, profileHeader, profileBody }) {
  return (
    <div>
      {header}
      <div className="mt-12">{profileHeader}</div>
      <div className="flex justify-center">{profileBody}</div>
    </div>
  );
}

export default withAuth(ProfilePage, apiClient);
