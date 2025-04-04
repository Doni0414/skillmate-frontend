import clsx from "clsx";
import { CreatePostIcon } from "./icons/create-post-icon";
import { Fira_Sans, Poppins } from "next/font/google";
import { SearchIcon } from "../search/icons/search-icon";
import { useEffect, useState } from "react";
import { Publications } from "./publications";
import { Modal } from "../common/modal";
import { CreatePostPopup } from "./create-post-popup";
import apiClient from "../api-client";
import { getPublicationsByCategoriesAndUserIdAndPageAndPageSize } from "../api";

const firaSans = Fira_Sans({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export function PublicationsContent({ user }) {
  const [publications, setPublications] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const categories = [];
    const userId = null;
    const page = 0;
    const pageSize = 100000;

    const fetchedPublicationsResponse =
      await getPublicationsByCategoriesAndUserIdAndPageAndPageSize(
        categories,
        userId,
        page,
        pageSize,
      );

    setPublications(fetchedPublicationsResponse.data);
  };
  return (
    <div className="w-fit mx-auto flex flex-col items-center">
      <CreatePostButton
        user={user}
        className={clsx("my-10", firaSans.className)}
      />
      <SearchPublicationsBar
        className={clsx("mb-[82px]", firaSans.className)}
      />
      <Publications publications={publications} user={user} />
    </div>
  );
}

function CreatePostButton({ className, user }) {
  const [popupOpen, setPopupOpen] = useState(false);

  const handleClickOnCreatePostButton = () => {
    setPopupOpen(true);
  };

  const closePopup = () => {
    setPopupOpen(false);
  };
  return popupOpen ? (
    <Modal isOpen={popupOpen} onClose={closePopup}>
      <CreatePostPopup user={user} closePopup={closePopup} />
    </Modal>
  ) : (
    <button
      onClick={handleClickOnCreatePostButton}
      className={clsx(
        className,
        "flex gap-[15px] justify-center items-center w-[198px] h-[48px] bg-[#4A6DC5] text-white text-[20px] rounded-[10px] cursor-pointer",
      )}
    >
      <div>Create post</div> <CreatePostIcon className="text-[#E5E5E5]" />
    </button>
  );
}

function SearchPublicationsBar({ className }) {
  return (
    <div className="flex relative">
      <input
        placeholder="I am interested in..."
        className={clsx(
          "w-[664px] pl-[58px] h-[70px] text-white text-[22px] bg-[#4A6DC5] rounded-[15px] focus:outline-none placeholder:text-white/80",
          className,
        )}
      />
      <button className="px-10 h-[70px] bg-[#4470E2] rounded-[15px] cursor-pointer absolute right-0">
        <SearchIcon />
      </button>
    </div>
  );
}
