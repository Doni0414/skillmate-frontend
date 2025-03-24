import clsx from "clsx";
import { ProfileHeader } from "../../components/profile/profile-header";
import { Roboto } from "next/font/google";
import { Header } from "../../components/header/header";
import { ReviewsContent } from "../../components/reviews/reviews";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import apiClient from "../../components/api-client";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "700", "900"],
});

export default function ReviewsPage() {
  const router = useRouter();
  const { userId } = router.query;

  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    apiClient
      .get("/reviews/recipient/" + userId)
      .then((response) => {
        setReviews(response.data);
      })
      .catch((error) => {
        console.log("error while obtaining user reviews", error);
      });
  }, [userId]);

  console.log(userId);

  if (!userId) return <p></p>;
  return (
    <div className={clsx(roboto.className, "")}>
      <Header />
      <ProfileHeader reviews={reviews} userId={userId} className="mt-[75px]" />
      <ReviewsContent
        reviews={reviews}
        setReviews={setReviews}
        userId={userId}
      />
    </div>
  );
}
