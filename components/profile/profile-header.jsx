import clsx from "clsx";
import Image from "next/image";
import { GoBackIcon } from "./icon/go-back-icon";
import { useEffect, useState } from "react";
import { Modal } from "../common/modal";
import { StarsContainer } from "../common/stars-container";
import apiClient from "../api-client";
import { ViewSkillPopup } from "../common/view-skill-popup/view-skill-popup";
import { getResourceURLById } from "../api";
import defaultAvaSrc from "../header/images/ava.png";

export function ProfileHeader({ user, className, reviews, isReviewsPage }) {
  return (
    <div className={className}>
      <div className="ml-[349px] w-fit flex gap-[98px]">
        <Image
          width={100}
          height={100}
          src={
            user.imageResourceId
              ? getResourceURLById(user.imageResourceId)
              : defaultAvaSrc
          }
          alt="ava"
          className="w-[100px] h-[100px] rounded-full object-cover"
        />
        <UserInfoContainer
          reviews={reviews}
          user={user}
          className="mt-5"
          isReviewsPage={isReviewsPage}
        />
      </div>
    </div>
  );
}

function UserInfoContainer({ user, className, reviews, isReviewsPage }) {
  const rating =
    reviews.length > 0
      ? (
          reviews
            .map((review) => review.rating)
            .reduce((acc, curr) => acc + curr, 0) / reviews.length
        ).toFixed(2)
      : 0;
  return (
    <div className={clsx(className, "w-fit")}>
      <div className="flex items-center">
        <div className="mr-[128px] text-[20px] text-[#262626]">
          {user.fullName}
        </div>
        <div className="flex items-center gap-2 mr-[46px]">
          <div className="text-[17px]">{rating}</div>
          <StarsContainer rating={rating} />
        </div>
        {isReviewsPage ? (
          <a href={`/profile/${user.id}`}>
            <button className="cursor-pointer">
              <GoBackIcon />
              <div className="font-semibold text-[13px]">Go back</div>
            </button>
          </a>
        ) : (
          <a href={`/reviews/${user.id}`}>
            <button className="cursor-pointer w-[110px] h-[32px] font-semibold text-[13px] rounded-[8px] bg-[#EFEFEF]">
              View reviews
            </button>
          </a>
        )}
      </div>
      <div>
        <div className="font-semibold text-[14px]">{user.fullName}</div>
        <div className="text-[14px]">
          {user.country} | {user.city}
        </div>
      </div>
      <SkillsContainer user={user} />
      <div className="my-[30px] mx-auto w-fit flex items-center gap-10 text-[#262626] text-[15px]">
        <div>
          <strong>{user.postsCount}</strong> posts
        </div>
        <div>
          <strong>{user.adsCount}</strong> ads
        </div>
      </div>
    </div>
  );
}

function SkillsContainer({ user }) {
  const [skills, setSkills] = useState([]);

  useEffect(() => {
    if (user) {
      apiClient
        .get("/skills?userId=" + user.id)
        .then((response) => {
          setSkills(response.data);
        })
        .catch((error) => {
          console.log("error while obtaining user skills", error);
        });
    }
  }, [user]);

  return (
    <div className="mt-[22px] flex items-center gap-[18px]">
      <div className="font-bold text-[20px]">Skills:</div>
      <div className="flex items-center gap-4">
        {skills.map((skill, index) => (
          <SkillCard skill={skill} key={index} />
        ))}
      </div>
    </div>
  );
}

function SkillCard({ skill }) {
  const [showViewSkillPopup, setShowViewSkillPopup] = useState(false);
  const handleClick = () => {
    setShowViewSkillPopup(true);
  };
  const closeViewSkillPopup = () => {
    setShowViewSkillPopup(false);
  };

  return (
    <div>
      {showViewSkillPopup ? (
        <ViewSkillPopup
          skill={skill}
          isOpen={showViewSkillPopup}
          onClose={closeViewSkillPopup}
        />
      ) : (
        <button
          onClick={handleClick}
          className="px-4 py-2 rounded-[8px] bg-[#EFEFEF] text-[13px] font-semibold cursor-pointer"
        >
          <Modal isOpen={showViewSkillPopup} onClose={closeViewSkillPopup}>
            <ViewSkillPopup skill={skill} />
          </Modal>
          {skill.name}
        </button>
      )}
    </div>
  );
}
