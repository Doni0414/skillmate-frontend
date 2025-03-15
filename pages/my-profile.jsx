import { Header } from "../components/header/header";
import { MyProfile } from "../components/my-profile/my-profile";

export default function MyProfilePage() {
  return (
    <div className="bg-[#E1F6FF] min-h-screen">
      <Header />
      <MyProfile className="mt-12 mx-auto" />
    </div>
  );
}
