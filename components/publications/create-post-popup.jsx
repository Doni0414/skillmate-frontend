import { Poppins } from "next/font/google";
import { useState } from "react";
import { UploadImageBox } from "../common/upload-image-box";
import { FieldErrorMessage } from "../common/field-error-message";
import clsx from "clsx";
import { AddCategoryIcon } from "./icons/add-category-icon";
import apiClient from "../api-client";
import { SuccessMessage } from "../common/success-message";
import { FailureMessage } from "../common/failure-message";

const poppins = Poppins({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-poppins",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export function CreatePostPopup({ user, closePopup }) {
  const [postToBeCreated, setPostToBeCreated] = useState({
    text: "",
  });

  const [postErrors, setPostErrors] = useState({});
  const [image, setImage] = useState(null);
  const [categories, setCategories] = useState(["Topic"]);
  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const handleSendClick = () => {
    // validate fields
    if (postToBeCreated.text.trim() === "") {
      setPostErrors({
        descriptionError: "Please, enter post description",
      });
      return;
    }

    // prepare data for sending
    const formData = new FormData();
    formData.append("image", image);

    // send data
    apiClient
      .post("/posts", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        params: {
          text: postToBeCreated.text,
          categories: categories,
        },
        paramsSerializer: {
          indexes: null,
        },
      })
      .then((response) => {
        setSuccessMessage("You have successfully created the post!");

        setTimeout(() => {
          setSuccessMessage(null);
        }, 3000);

        setTimeout(() => {
          closePopup();
        }, 3500);
      })
      .catch((error) => {
        console.log("error while creating post", error);
        setErrorMessage("Error while creating post");

        setTimeout(() => {
          setErrorMessage(null);
        }, 5000);
      });
  };

  const changePostFields = (field, value) => {
    setPostToBeCreated((lastPostToBeCreated) => ({
      ...lastPostToBeCreated,
      [field]: value,
    }));
  };
  return (
    <div className="flex flex-col items-center w-[716px] pt-[38px] pb-[72px] rounded-[20px] border-4 border-[#9747FF] bg-white">
      <SuccessMessage
        showMessage={successMessage}
        successMessage={successMessage}
      />
      <FailureMessage
        failureMessage={errorMessage}
        showMessage={errorMessage}
      />
      <div className="font-semibold text-[26px] text-black/70 mb-9">
        Create Post
      </div>
      <UploadImageBox className="mb-7" image={image} setImage={setImage} />
      <div className="mb-4">
        <textarea
          onChange={(e) => changePostFields("text", e.target.value)}
          className={clsx(
            "w-[609px] min-h-[130px] px-5 py-4 bg-[#F9F9F9] text-black/40 text-[15px] rounded-[8px] focus:outline-none placeholder:text-black/40 resize-none",
            poppins.className,
          )}
          placeholder="Description"
        ></textarea>
        {postErrors.descriptionError && (
          <FieldErrorMessage
            text={postErrors.descriptionError}
            className="mt-1"
          />
        )}
      </div>
      <Categories categories={categories} setCategories={setCategories} />
      <div className="w-[609px] flex justify-end">
        <button
          onClick={handleSendClick}
          className="w-[113px] h-12 bg-[#4182F9] text-white font-medium text-[20px] rounded-[30px] cursor-pointer"
        >
          Safe
        </button>
      </div>
    </div>
  );
}

function Categories({ categories, setCategories }) {
  const handleClickAddCategory = () => {
    setCategories((lastCategories) => [...lastCategories, "Topic"]);
  };
  return (
    <div className="w-[609px] flex flex-wrap items-center gap-4 mb-[57px]">
      {categories.map((category, idx) => (
        <Category idx={idx} category={category} setCategories={setCategories} />
      ))}
      <button onClick={handleClickAddCategory} className="cursor-pointer">
        <AddCategoryIcon />
      </button>
    </div>
  );
}

function Category({ idx, category, setCategories }) {
  const handleOnChange = (e) => {
    const newCategoryName = e.target.value;
    setCategories((lastCategories) =>
      lastCategories.map((category, i) =>
        i == idx ? newCategoryName : category,
      ),
    );
  };

  const handleDeleteCategory = () => {
    setCategories((lastCategories) =>
      lastCategories.filter((category, index) => index != idx),
    );
  };

  const [showDeleteCategoryButton, setShowDeleteCateoryButton] =
    useState(false);

  return (
    <div
      className="relative"
      onMouseEnter={() => setShowDeleteCateoryButton(true)}
      onMouseLeave={() => setShowDeleteCateoryButton(false)}
    >
      <input
        onChange={handleOnChange}
        className={clsx(
          poppins.className,
          "w-[98px] h-[43px] text-center bg-[#E1F6FF] rounded-[8px] text-[15px] focus:outline-none text-black/40 placeholder:text-black/40",
        )}
        value={category}
      />
      {showDeleteCategoryButton && (
        <button
          className="outline-none text-gray-500 hover:text-black cursor-pointer absolute -right-[10px] -top-[10px]"
          onClick={handleDeleteCategory}
        >
          ✖
        </button>
      )}
    </div>
  );
}
