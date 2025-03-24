import clsx from "clsx";
import { Fira_Sans, Poppins } from "next/font/google";
import { FormField } from "../common/FormField";
import { FormTextArea } from "../common/form-text-area";
import { useEffect, useRef, useState } from "react";
import apiClient from "../api-client";
import { Select } from "../common/select";
import { UploadIcon } from "../common/icons/upload-icon";
import { SuccessMessage } from "../common/success-message";

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
  const [formData, setFormData] = useState({
    skillName: "",
    description: "",
  });
  const [adImage, setAdImage] = useState(null);

  const handleOnSkillNameSelect = (value) => {
    setFormData((lastFormData) => ({
      ...lastFormData,
      skillName: value,
    }));
  };

  const handleDescriptionInput = (value) => {
    setFormData((lastFormData) => ({
      ...lastFormData,
      description: value,
    }));
  };
  const [skills, setSkills] = useState([]);

  const skillsValues = skills.map((skill) => skill.name);

  const imageInputRef = useRef(null);
  const handleUploadImageClick = (e) => {
    e.preventDefault();
    imageInputRef.current.click();
  };

  const handleImageInputRefOnChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      setAdImage(file);
    }
  };

  const [successMessage, setSuccessMessage] = useState(null);

  const handleOnSubmit = (e) => {
    e.preventDefault();
    const imageFormData = new FormData();
    imageFormData.append("imageResource", adImage);
    apiClient
      .post(
        `/ads?userId=${user.id}&skillName=${formData.skillName}&description=${formData.description}`,
        imageFormData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      )
      .then((response) => {
        setSuccessMessage("Ad was successfully created!");
        setTimeout(() => {
          setSuccessMessage(null);
        }, 3000);
        closePopup();
      })
      .catch((error) => {
        console.log("Error while creating ad", error);
      });
  };

  useEffect(() => {
    apiClient
      .get(`/skills?userId=${user.id}`)
      .then((response) => {
        setSkills(response.data);
        setFormData((lastFormData) => ({
          ...lastFormData,
          skillName: response.data[0].name,
        }));
      })
      .catch((error) => {
        console.log(
          "Error while obtaining skills list in CreateAdPopup",
          error,
        );
      });
  }, []);

  return (
    <form
      onSubmit={handleOnSubmit}
      className={clsx(
        "px-[66px] py-[50px] border-4 border-[#FFC107] rounded-[20px] bg-white",
        firaSans.className,
      )}
    >
      {successMessage && (
        <SuccessMessage
          showMessage={successMessage}
          successMessage={successMessage}
        />
      )}
      <div className="mb-10 w-fit mx-auto text-black/70 text-[26px] font-semibold leading-[24px]">
        Create ad
      </div>
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
        className="block mb-10 w-[609px] h-[130px] pl-[12px] pt-[17px] bg-[#F9F9F9] text-black/70 text-[15px] border border-black/10 rounded-[7px] focus:outline-none resize-none"
      />
      <button
        onClick={handleUploadImageClick}
        className="mb-[53px] flex items-center gap-[6px] px-[30px] py-[10px] bg-[#FFEDB8] rounded-[20px] cursor-pointer"
      >
        <div className={clsx(firaSans.className, "text-[20px]")}>
          Upload image
        </div>
        <UploadIcon />
      </button>
      <input
        type="file"
        className="hidden"
        ref={imageInputRef}
        onChange={handleImageInputRefOnChange}
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
