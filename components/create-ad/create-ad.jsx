import clsx from "clsx";
import { Fira_Sans, Poppins } from "next/font/google";
import { FormField } from "../common/FormField";
import { FormTextArea } from "../common/form-text-area";
import { useEffect, useRef, useState } from "react";
import apiClient from "../api-client";
import { Select } from "../common/select";
import { UploadIcon } from "../common/icons/upload-icon";
import { SuccessMessage } from "../common/success-message";
import { useCreateAdState } from "./model/use-create-ad-state";
import { FailureMessage } from "../common/failure-message";
import { UploadImageBox } from "../common/upload-image-box";

const poppins = Poppins({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-poppins",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

const firaSans = Fira_Sans({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export function CreateAdPopup({ user, closePopup }) {
  const {
    formData,
    formErrors,
    handleOnSubmit,
    successMessage,
    skillsValues,
    handleOnSkillNameSelect,
    handleDescriptionInput,
    failureMessage,
    isFailureMessageVisible,
    adImage,
    setAdImage,
  } = useCreateAdState(user, closePopup);
  return (
    <form
      onSubmit={handleOnSubmit}
      className={clsx(
        "px-[66px] py-[50px] overflow-y-auto border-4 border-[#FFC107] rounded-[20px] bg-white",
        firaSans.className,
      )}
    >
      {
        <SuccessMessage
          showMessage={successMessage}
          successMessage={successMessage}
        />
      }
      {
        <FailureMessage
          failureMessage={failureMessage}
          showMessage={isFailureMessageVisible}
        />
      }
      <div className="mb-10 w-fit mx-auto text-black/70 text-[26px] font-semibold leading-[24px]">
        Create ad
      </div>
      <UploadImageBox
        className="mx-auto w-fit mb-10"
        image={adImage}
        setImage={setAdImage}
      />
      <Select
        className="mb-10 w-[609px] pl-[12px] py-[17px] bg-[#F9F9F9] text-black/70 text-[15px] border border-black/10 rounded-[7px] focus:outline-none"
        values={skillsValues}
        labels={skillsValues}
        onSelect={handleOnSkillNameSelect}
      />
      <FormTextArea
        value={formData.description}
        onChange={handleDescriptionInput}
        placeholder="Description"
        className="block w-[609px] h-[130px] pl-[12px] pt-[17px] bg-[#F9F9F9] text-black/70 text-[15px] border border-black/10 rounded-[7px] focus:outline-none resize-none"
        outerContainerClassName="mb-10"
        errorText={formErrors.skillDescriptionError}
      />
      <div className="flex justify-end">
        <button
          className={clsx(
            "px-9 py-3 bg-[#4182F9] rounded-[30px] cursor-pointer text-[20px] text-white font-medium",
          )}
        >
          Save
        </button>
      </div>
    </form>
  );
}
