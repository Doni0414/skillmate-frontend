import { useRouter } from "next/router";
import apiClient from "../../components/api-client";
import { withAuth } from "../../components/auth";
import { Header } from "../../components/header/header";

function ProfilePage() {
  const router = useRouter();
  const { userId } = router.query;
  if (!userId) return null;
  return <ProfilePageLayout header={<Header />} body={<div>{userId}</div>} />;
}

function ProfilePageLayout({ header, body }) {
  return (
    <div>
      {header}
      {body}
    </div>
  );
}

export default withAuth(ProfilePage, apiClient);
