import clsx from "clsx";
import { ReviewIcon } from "./icon/review-icon";
import {
  ClickableStarsContainer,
  StarsContainer,
} from "../common/stars-container";
import { Modal } from "../common/modal";
import { useEffect, useState } from "react";
import { Fira_Sans } from "next/font/google";
import { FormTextArea } from "../common/form-text-area";
import Image from "next/image";
import { EmptyStarIcon } from "../profile/icon/empty-star";
import apiClient from "../api-client";
import { SuccessMessage } from "../common/success-message";
import { FailureMessage } from "../common/failure-message";
import { getResourceURLById } from "../api";

const firaSans = Fira_Sans({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export function ReviewsContent({ user, reviews, setReviews }) {
  const [currentUser, setCurrentUser] = useState();

  useEffect(() => {
    apiClient
      .get("/users/profile")
      .then((response) => {
        setCurrentUser(response.data);
      })
      .catch((error) => {
        console.log("error while obtaining current user", error);
      });
  }, []);

  if (!user || !currentUser) return <p></p>;

  return (
    <div className="mx-auto w-fit">
      <HorizontalBar className="w-[935px] !h-[2px] bg-[#DBDBDB]" />
      <div className="my-[18px] mx-auto w-fit flex gap-1 items-center text-[#8E8E8E] font-semibold text-[11px]">
        <ReviewIcon /> REVIEWS
      </div>
      <HorizontalBar className="mx-auto w-[849px] bg-[#DBDBDB]" />
      <ReviewStatistics reviews={reviews} user={user} />
      {currentUser.id !== user.id && (
        <WriteReviewButton
          currentUserId={currentUser.id}
          setReviews={setReviews}
          user={user}
          className="mb-[96px]"
        />
      )}
      <ReviewsContainer reviews={reviews} user={user} />
    </div>
  );
}

function WriteReviewButton({ className, user, setReviews, currentUserId }) {
  const [isReviewPopupOpen, setIsReviewPopupOpen] = useState(false);
  const handleOnClick = () => {
    setIsReviewPopupOpen(true);
  };
  const closeReviewPopup = () => {
    setIsReviewPopupOpen(false);
  };

  return (
    <div className={clsx("flex justify-center mt-6", className)}>
      <Modal isOpen={isReviewPopupOpen} onClose={closeReviewPopup}>
        <CreateReviewPopup
          currentUserId={currentUserId}
          setReviews={setReviews}
          user={user}
          closeReviewPopup={closeReviewPopup}
        />
      </Modal>
      <button
        onClick={handleOnClick}
        className="px-[45px] py-1 bg-[#3C5AA5] font-medium text-[24px] text-[#F9F9F9] rounded-[30px] cursor-pointer"
      >
        Write a review
      </button>
    </div>
  );
}

function CreateReviewPopup({
  user,
  closeReviewPopup,
  currentUserId,
  setReviews,
}) {
  const [formData, setFormData] = useState({
    rating: 0,
    text: "",
    recipientId: user.id,
    reviewerId: currentUserId,
  });

  const [formErrors, setFormErrors] = useState({});

  const [successfulMessage, setSuccessfulMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const handleClickOnStar = (stars) => {
    setFormData((lastFormData) => ({
      ...lastFormData,
      rating: stars,
    }));
  };

  const handleWriteComment = (text) => {
    setFormData((lastFormData) => ({
      ...lastFormData,
      text: text,
    }));
  };
  const handleSendClick = () => {
    if (formData.text.trim().length === 0) {
      setFormErrors((lastFormErrors) => ({
        ...lastFormErrors,
        textError: "Please, fill the text",
      }));
      return;
    }
    if (formData.rating === 0) {
      setErrorMessage("Please, specify rating");
      setTimeout(() => {
        setErrorMessage(null);
      }, 3000);
      return;
    }
    apiClient
      .post("/reviews", formData, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        console.log("review was successfully sent!");
        setReviews((lastReviews) => [...lastReviews, formData]);
        setSuccessfulMessage("Review was successfully sent!");
        setTimeout(() => {
          setSuccessfulMessage(null);
        }, 3000);
        setTimeout(() => {
          closeReviewPopup();
        }, 500);
      })
      .catch((error) => {
        if (error.response.data.errorMessage.endsWith("does already exists")) {
          setErrorMessage("You have already sent review to this user!");
        } else {
          setErrorMessage("Error while sending review");
        }
        console.log("error while sending review", error);
        setTimeout(() => {
          setErrorMessage(null);
        }, 3000);
      });
  };
  return (
    <div
      className={clsx(
        "px-16 pt-[50px] pb-6 bg-white border border-[#E1F6FF] rounded-[20px]",
        firaSans.className,
      )}
    >
      <SuccessMessage
        showMessage={successfulMessage}
        successMessage={successfulMessage}
      />
      <FailureMessage
        showMessage={errorMessage}
        failureMessage={errorMessage}
      />
      <div className="mx-auto w-fit font-semibold mb-[46px] text-[26px] text-black/70">
        Rate
      </div>
      <ClickableStarsContainer
        className="mb-[70px] w-fit mx-auto"
        onClick={handleClickOnStar}
        rating={formData.rating}
        size={"lg"}
      />
      <FormTextArea
        outerContainerClassName="mb-[70px]"
        className="w-[609px] h-[130px] px-[22px] py-[17px] bg-[#E1F6FF] rounded-[8px] focus:outline-none resize-none"
        value={formData.text}
        placeholder="Type your comment..."
        onChange={handleWriteComment}
        errorText={formErrors.textError}
      />
      <div className="flex justify-end">
        <button
          onClick={handleSendClick}
          className="px-8 py-3 rounded-[30px] bg-[#4182F9] font-medium text-white text-[20px] cursor-pointer"
        >
          Send
        </button>
      </div>
    </div>
  );
}

function ReviewStatistics({ user, reviews }) {
  const computeRating = (reviews) => {
    if (!reviews || reviews.length === 0) return 0;
    return (
      reviews
        .map((review, index) => review.rating)
        .reduce((acc, curr) => acc + curr, 0) / reviews.length
    ).toFixed(2);
  };

  const rating = computeRating(reviews);
  return (
    <div className="mx-auto w-[913px] px-8 flex items-center gap-[60px]">
      <div className="w-[230px]">
        <div className="w-fit mx-auto text-[57px] text-black/80 mb-2">
          {rating}
        </div>
        <div className="mx-auto w-fit mb-7">
          <StarsContainer rating={rating} />
        </div>
        <div className="w-fit mx-auto font-medium text-[14px] text-[#5F5F5F]">
          Based on {reviews.length} reviews
        </div>
      </div>
      <div>
        <div className="space-y-[5px]">
          {Array.from({ length: 5 }).map((i, index) => (
            <StarsStatistic stars={index + 1} reviews={reviews} />
          ))}
        </div>
      </div>
    </div>
  );
}

function StarsStatistic({ stars, reviews }) {
  const overall = reviews.length;
  const neededReviewsCount = reviews
    .map((review, index) => review.rating)
    .filter((rating) => Math.round(rating) === stars).length;

  const percentage = neededReviewsCount / overall;

  const W = 393;

  const computedWidth = Math.round(W * percentage);

  return (
    <div className="flex gap-3 items-center">
      <StarsContainer rating={stars} />
      <div className="relative">
        <div className="w-[393px] h-[10px] bg-[#EFEFEF] rounded-[12px]"></div>
        <div
          style={{
            width: computedWidth + "px",
          }}
          className={clsx(
            "absolute h-[10px] top-0 left-0 bg-[#F4D778] rounded-[12px]",
            `!w-[${computedWidth}px]`,
          )}
        ></div>
      </div>
    </div>
  );
}

function ReviewsContainer({ user, reviews }) {
  return (
    <div className="grid grid-cols-2 gap-y-5">
      {reviews.map((review) => (
        <Review review={review} />
      ))}
    </div>
  );
}

function Review({ review }) {
  const [author, setAuthor] = useState({});

  useEffect(() => {
    apiClient
      .get("/users/profile/" + review.reviewerId)
      .then((response) => {
        setAuthor(response.data);
      })
      .catch((error) => {
        console.log("error while obtaining review author", error);
      });
  }, []);

  return (
    <div className="pl-5 py-5 pr-14 w-[400px]">
      <div className="mb-3 w-[366px] flex items-center justify-between">
        <div className="flex items-center gap-[18px]">
          <Image
            src={getResourceURLById(author.imageResourceId)}
            width={40}
            height={40}
            className="w-10 h-10 rounded-full"
          />
          <div className="font-medium text-[14px]">{author.fullName}</div>
        </div>
        <div className="flex items-center font-medium text-[12px] gap-2">
          <div>{review.rating}</div>
          <EmptyStarIcon />
        </div>
      </div>
      <div className="text-[12px] text-[#5F5F5F]">{review.text}</div>
    </div>
  );
}

function HorizontalBar({ className }) {
  return <div className={clsx("h-[1px]", className)}></div>;
}
