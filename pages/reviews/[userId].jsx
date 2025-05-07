import clsx from "clsx";
import { ProfileHeader } from "../../components/profile/profile-header";
import { Roboto } from "next/font/google";
import { Header } from "../../components/header/header";
import { ReviewsContent } from "../../components/reviews/reviews";
import { useEffect, useState } from "react";
import apiClient from "../../components/api-client";
import { useRouter } from "next/router";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "700", "900"],
});

export default function ReviewsPage({ params }) {
  const router = useRouter();
  const { userId } = router.query;
  const [user, setUser] = useState();

  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    if (!userId) {
      return;
    }
    apiClient
      .get("/users/profile/" + userId)
      .then((response) => {
        setUser(response.data);
      })
      .catch((error) => {
        console.log("error while obtaining user", error);
      });

    apiClient
      .get("/reviews/recipient/" + userId)
      .then((response) => {
        setReviews(response.data);
      })
      .catch((error) => {
        console.log("error while obtaining user reviews", error);
      });
  }, [userId]);

  if (!userId || !user) return <p></p>;
  return (
    <div className={clsx(roboto.className, "")}>
      <Header />
      <ProfileHeader
        reviews={reviews}
        user={user}
        className="mt-[75px]"
        isReviewsPage={true}
      />
      <ReviewsContent reviews={reviews} setReviews={setReviews} user={user} />
    </div>
  );
}
