import clsx from "clsx";
import { ProfileHeader } from "../../../components/profile/profile-header";
import { Roboto } from "next/font/google";
import { Header } from "../../../components/header/header";
import { ReviewsContent } from "../../../components/reviews/reviews";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "700", "900"],
});

export default async function ReviewsPage({ params }) {
  const { userId } = await params;

  console.log(userId);
  return (
    <div className={clsx(roboto.className, "")}>
      <Header />
      <ProfileHeader userId={userId} className="mt-[75px]" />
      <ReviewsContent userId={userId} />
    </div>
  );
}
