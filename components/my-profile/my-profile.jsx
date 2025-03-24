import clsx from "clsx";
import { UserAccountIcon } from "../common/icons/user-account-icon";
import { PlusIcon } from "../common/icons/plus-icon";
import { Fira_Sans, Poppins } from "next/font/google";
import { FieldErrorMessage } from "../common/field-error-message";
import { Select } from "../common/select";
import { CountrySelector } from "../common/country-selector";
import { RESOURCES_PREFIX, useMyProfileState } from "./use-my-profile-state";
import Image from "next/image";
import { AddIcon } from "../common/icons/add-icon";
import { Modal } from "../common/modal";
import { UploadIcon } from "../common/icons/upload-icon";
import { DocumentIcon } from "../common/icons/document-icon";
import { PdfIcon } from "../common/icons/pdf-icon";
import { PictureIcon } from "../common/icons/picture-icon";
import { SuccessMessage } from "../common/success-message";
import { FormField } from "../common/FormField";
import { FormTextArea } from "../common/form-text-area";
import { ViewSkillPopup } from "../common/view-skill-popup";

export const PROFICIENCY_LEVELS = ["Beginner", "Intermediate", "Pro"];
export const PROFICIENCY_LEVELS_VALUES = ["BEGINNER", "INTERMEDIATE", "PRO"];

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

export function MyProfile({ className }) {
  const {
    addSkillForm,
    addSkillFormErrors,
    addAchievementInputRef,
    downloadResource,
    fileToAchievement,
    handleChangeOfAddSkillForm,
    handleClickOnAttachAchievementsButtonInAddSkillForm,
    handleAddAchievementInputRefOnChange,
    handleClickOnSaveButtonInAddSkillPopup,
    deleteAchievementInAddSkillPopup,
    showSuccessMessage,
    successMessage,
    isLoading,
    imageInputRef,
    userInfo,
    editableUserInfo,
    handleClickOnEditButton,
    userInfoFieldErrors,
    handleUserInfoChange,
    handleImageChange,
    isAddSkillPopupOpen,
    handleClickOnAddSkillButton,
    closeAddSkillPopup,
    skillOnView,
    handleClickOnViewSkillButton,
    closeViewSkill,
    skillOnEdit,
    handleClickOnEditSkillButton,
    handleSkillOnEditFieldChange,
    closeEditSkill,
    handleClickOnDeleteSkillButton,
  } = useMyProfileState();
  if (isLoading) {
    return <></>;
  }
  return (
    <div
      className={clsx(
        className,
        poppins.className,
        "w-[1200px] pb-16 border border-[#3C5AA5] bg-white",
      )}
    >
      <SuccessMessage
        showMessage={showSuccessMessage}
        successMessage={successMessage}
      />
      <Rectangle className="w-[1200px] h-[94px] bg-[#3C5AA5]" />
      <div className="flex justify-between items-center mt-16 mx-[53px]">
        <UserEmailContainer
          fullName={userInfo.fullName}
          email={userInfo.email}
          imageId={userInfo.imageResourceId}
          imageInputRef={imageInputRef}
          handleImageChange={handleImageChange}
        />
        <button
          onClick={handleClickOnEditButton}
          className="bg-[#4182F9] w-[95px] h-[50px] text-[14px] text-white rounded-[7px] cursor-pointer"
        >
          Edit
        </button>
      </div>

      <UserInfoForm
        userInfo={editableUserInfo}
        userInfoFieldErrors={userInfoFieldErrors}
        handleUserInfoChange={handleUserInfoChange}
      />

      <SkillsContainer
        handleClickOnAddSkillButton={handleClickOnAddSkillButton}
        skills={userInfo.skills}
        className="mt-10 mx-8"
        handleClickOnViewSkillButton={handleClickOnViewSkillButton}
        handleClickOnEditSkillButton={handleClickOnEditSkillButton}
        handleClickOnDeleteSkillButton={handleClickOnDeleteSkillButton}
      />
      <Modal isOpen={isAddSkillPopupOpen} onClose={closeAddSkillPopup}>
        <AddSkillPopup
          addSkillForm={addSkillForm}
          addSkillFormErrors={addSkillFormErrors}
          addAchievementInputRef={addAchievementInputRef}
          handleAddAchievementInputRefOnChange={
            handleAddAchievementInputRefOnChange
          }
          handleChangeOfAddSkillForm={handleChangeOfAddSkillForm}
          handleClickOnAttachAchievementsButtonInAddSkillForm={
            handleClickOnAttachAchievementsButtonInAddSkillForm
          }
          handleClickOnSaveButtonInAddSkillPopup={
            handleClickOnSaveButtonInAddSkillPopup
          }
          deleteAchievementInAddSkillPopup={deleteAchievementInAddSkillPopup}
        />
      </Modal>
      <Modal isOpen={skillOnView} onClose={closeViewSkill}>
        <ViewSkillPopup
          skill={skillOnView}
          downloadResource={downloadResource}
          fileToAchievement={fileToAchievement}
        />
      </Modal>
      <Modal isOpen={skillOnEdit} onClose={closeEditSkill}>
        <EditSkillPopup
          skill={skillOnEdit}
          handleSkillOnEditFieldChange={handleSkillOnEditFieldChange}
        />
      </Modal>
    </div>
  );
}

function Rectangle({ className }) {
  return <div className={clsx(className)}></div>;
}

function UserImageContainer({ className, onClick, children }) {
  return (
    <div className={clsx(className)} onClick={onClick}>
      {children}
    </div>
  );
}

function EditImageContainer() {
  return (
    <div className="bg-[#F9F9F9] rounded-full w-[30px] h-[30px] flex justify-center items-center absolute bottom-0 right-0">
      <PlusIcon />
    </div>
  );
}

function UserEmailContainer({
  fullName,
  email,
  imageId,
  handleImageChange,
  imageInputRef,
}) {
  return (
    <div className="flex items-center gap-[18px]">
      <UserImageContainer
        onClick={() => imageInputRef.current.click()}
        className="cursor-pointer w-fit relative"
      >
        {imageId ? (
          <Image
            width={80}
            height={80}
            className="rounded-full w-20 h-20"
            src={RESOURCES_PREFIX + imageId}
            alt="profile-image"
          />
        ) : (
          <UserAccountIcon className="w-20 h-20" />
        )}
        <EditImageContainer />
        <input
          type="file"
          ref={imageInputRef}
          onChange={handleImageChange}
          className="hidden"
        />
      </UserImageContainer>
      <div>
        <div className="mb-1 font-medium text-[18px]">{fullName}</div>
        <div className="text-[14px] opacity-50">{email}</div>
      </div>
    </div>
  );
}

function UserInfoForm({ userInfo, userInfoFieldErrors, handleUserInfoChange }) {
  const genderLabels = ["Male", "Female"];
  const genderValues = ["MALE", "FEMALE"];
  return (
    <div className="grid grid-cols-2 grid-rows-2 gap-y-[30px] gap-x-[33px] w-fit mx-auto mt-[77px]">
      <UserInfoField labelInfo="Full Name">
        <FormField
          className="bg-[#F9F9F9] text-black/70 text-[15px] w-[550px] pl-5 py-4 border border-black/10 rounded-[7px] focus:outline-none"
          placeholder="Your Full Name"
          value={userInfo.fullName}
          onChange={(e) => handleUserInfoChange("fullName", e.target.value)}
          errorText={userInfoFieldErrors.fullNameErrorMessage}
        />
      </UserInfoField>
      <UserInfoField labelInfo="Nickname">
        <FormField
          className="bg-[#F9F9F9] text-black/70 text-[15px] w-[550px] pl-5 py-4 border border-black/10 rounded-[7px] focus:outline-none"
          placeholder="Your nickname"
          value={userInfo.nickname}
          onChange={(e) => handleUserInfoChange("nickname", e.target.value)}
          errorText={userInfoFieldErrors.nicknameErrorMessage}
        />
      </UserInfoField>
      <UserInfoField labelInfo="Gender">
        <Select
          labels={genderLabels}
          values={genderValues}
          value={userInfo.gender}
          className="bg-[#F9F9F9] text-black/70 text-[15px] w-[550px] pl-5 pr-4 py-4 border border-black/10 rounded-[7px] cursor-pointer focus:outline-none"
          onSelect={(value) => handleUserInfoChange("gender", value)}
        />
      </UserInfoField>
      <UserInfoField labelInfo="Country">
        <CountrySelector
          selectedCountry={userInfo.country}
          className="bg-[#F9F9F9] text-black/70 text-[15px] w-[550px] pl-5 pr-4 py-4 border border-black/10 rounded-[7px] cursor-pointer focus:outline-none"
          selectCountry={(value) => handleUserInfoChange("country", value)}
        />
      </UserInfoField>
      <UserInfoField labelInfo="City">
        <FormField
          className="bg-[#F9F9F9] text-black/70 text-[15px] w-[550px] pl-5 py-4 border border-black/10 rounded-[7px] focus:outline-none"
          placeholder="Your city"
          value={userInfo.city}
          onChange={(e) => handleUserInfoChange("city", e.target.value)}
          errorText={userInfoFieldErrors.cityErrorMessage}
        />
      </UserInfoField>
    </div>
  );
}

function UserInfoField({ labelInfo, children }) {
  return (
    <div className="w-fit">
      <div className="mb-2 text-[15px] opacity-80">{labelInfo}</div>
      {children}
    </div>
  );
}

function SkillsContainer({
  className,
  skills,
  handleClickOnAddSkillButton,
  handleClickOnViewSkillButton,
  handleClickOnEditSkillButton,
  handleClickOnDeleteSkillButton,
}) {
  return (
    <div className={clsx(className, "")}>
      <button
        className={clsx(
          "flex justify-center items-center gap-[7px] rounded-[30px] w-[198px] py-2 bg-[#3C5AA5] text-white text-[20px] cursor-pointer",
          firaSans.className,
        )}
        onClick={handleClickOnAddSkillButton}
      >
        <div>Add a new skill</div> <AddIcon />
      </button>
      <SkillsList
        skills={skills}
        className="mt-[47px] space-y-5"
        handleClickOnViewSkillButton={handleClickOnViewSkillButton}
        handleClickOnEditSkillButton={handleClickOnEditSkillButton}
        handleClickOnDeleteSkillButton={handleClickOnDeleteSkillButton}
      />
    </div>
  );
}

function SkillsList({
  skills,
  className,
  handleClickOnViewSkillButton,
  handleClickOnEditSkillButton,
  handleClickOnDeleteSkillButton,
}) {
  return (
    <div className={className}>
      {skills.map((skill, index) => (
        <SkillCard
          key={index}
          skill={skill}
          handleClickOnViewSkillButton={handleClickOnViewSkillButton}
          handleClickOnEditSkillButton={handleClickOnEditSkillButton}
          handleClickOnDeleteSkillButton={handleClickOnDeleteSkillButton}
        />
      ))}
    </div>
  );
}

function SkillCard({
  skill,
  handleClickOnViewSkillButton,
  handleClickOnEditSkillButton,
  handleClickOnDeleteSkillButton,
}) {
  return (
    <div className="flex items-center w-fit px-8 py-5 gap-9 rounded-[20px] bg-[#F9F9F9] text-[15px]">
      <div className="w-[300px] text-ellipsis whitespace-nowrap overflow-hidden">
        {skill.name}
      </div>
      <button
        onClick={() => handleClickOnViewSkillButton(skill)}
        className="px-[14px] py-1 rounded-[10px] bg-[#E1F6FF] cursor-pointer"
      >
        View
      </button>
      <button
        onClick={() => handleClickOnEditSkillButton(skill)}
        className="px-[14px] py-1 rounded-[10px] bg-[#E1F6FF] cursor-pointer"
      >
        Edit
      </button>
      <button
        onClick={() => handleClickOnDeleteSkillButton(skill.id)}
        className="px-[10px] py-1 rounded-[10px] bg-[#BE2424] text-white cursor-pointer"
      >
        Delete
      </button>
    </div>
  );
}

function AddSkillPopup({
  addSkillForm,
  addSkillFormErrors,
  addAchievementInputRef,
  handleChangeOfAddSkillForm,
  handleClickOnAttachAchievementsButtonInAddSkillForm,
  handleAddAchievementInputRefOnChange,
  handleClickOnSaveButtonInAddSkillPopup,
  deleteAchievementInAddSkillPopup,
}) {
  const formFieldClassName =
    "mb-[53px] w-[609px] pl-[12px] py-[17px] bg-[#F9F9F9] text-black/70 text-[15px] border border-black/10 rounded-[7px] focus:outline-none";
  return (
    <form className="pl-10 pr-16 py-12 border border-[#FFC107] bg-white rounded-[20px]">
      <div
        className={clsx(
          firaSans.className,
          "mx-auto w-fit text-black/70 font-semibold text-[26px] mb-[93px]",
        )}
      >
        Add new skill
      </div>
      <FormField
        value={addSkillForm.name}
        onChange={(e) => handleChangeOfAddSkillForm("name", e.target.value)}
        placeholder="Skill name"
        className={formFieldClassName}
        errorText={addSkillFormErrors.name}
      />
      <FormTextArea
        value={addSkillForm.description}
        onChange={(value) => {
          handleChangeOfAddSkillForm("description", value);
        }}
        className="block mb-[53px] w-[609px] h-[130px] pl-[12px] pt-[17px] bg-[#F9F9F9] text-black/70 text-[15px] border border-black/10 rounded-[7px] focus:outline-none resize-none"
        placeholder="Description"
        errorText={addSkillFormErrors.description}
      />
      <Select
        value={addSkillForm.level}
        values={PROFICIENCY_LEVELS_VALUES}
        labels={PROFICIENCY_LEVELS}
        className="mb-[77px] w-[609px] pl-[12px] py-[17px] bg-[#F9F9F9] text-black/70 text-[15px] border border-black/10 rounded-[7px] focus:outline-none"
        onSelect={(value) => {
          handleChangeOfAddSkillForm("level", value);
        }}
      />
      <AchievementsList
        achievements={addSkillForm.achievements}
        isEditable
        className="mb-10"
        handleDeleteAchievement={deleteAchievementInAddSkillPopup}
      />
      <button
        onClick={handleClickOnAttachAchievementsButtonInAddSkillForm}
        className="mb-12 flex items-center gap-[6px] px-[30px] py-[10px] bg-[#FFEDB8] rounded-[20px] cursor-pointer"
      >
        <div className={clsx(firaSans.className, "text-[20px]")}>
          Attach achievements
        </div>
        <UploadIcon />
      </button>
      <input
        type="file"
        className="hidden"
        ref={addAchievementInputRef}
        onChange={handleAddAchievementInputRefOnChange}
      />
      <div className="flex justify-end">
        <button
          onClick={handleClickOnSaveButtonInAddSkillPopup}
          className={clsx(
            firaSans.className,
            "px-9 py-3 bg-[#4182F9] rounded-[30px] cursor-pointer text-[20px] text-white font-medium",
          )}
        >
          Save
        </button>
      </div>
    </form>
  );
}

function EditSkillPopup({ skill, handleSkillOnEditFieldChange }) {
  const formFieldClassName =
    "mb-[53px] w-[609px] pl-[12px] py-[17px] bg-[#F9F9F9] text-black/70 text-[15px] border border-black/10 rounded-[7px] focus:outline-none";
  return (
    <form className="pl-10 pr-16 py-12 border border-[#FFC107] bg-white rounded-[20px]">
      <div
        className={clsx(
          firaSans.className,
          "mx-auto w-fit text-black/70 font-semibold text-[26px] mb-[93px]",
        )}
      >
        Edit skill
      </div>
      <FormField
        value={skill.name}
        placeholder="Skill name"
        className={formFieldClassName}
        onChange={(e) => handleSkillOnEditFieldChange("name", e.target.value)}
      />
      <textarea
        value={skill.description}
        className="block mb-[53px] w-[609px] h-[130px] pl-[12px] pt-[17px] bg-[#F9F9F9] text-black/70 text-[15px] border border-black/10 rounded-[7px] focus:outline-none resize-none"
        placeholder="Description"
        onChange={(e) =>
          handleSkillOnEditFieldChange("description", e.target.value)
        }
      ></textarea>
      <Select
        value={skill.level}
        values={PROFICIENCY_LEVELS}
        className="mb-[77px] w-[609px] pl-[12px] py-[17px] bg-[#F9F9F9] text-black/70 text-[15px] border border-black/10 rounded-[7px] focus:outline-none"
        onSelect={(e) => handleSkillOnEditFieldChange("level", e.target.value)}
      />
      <AchievementsList
        achievements={skill.achievements}
        isEditable
        className="mb-10"
      />
      <button className="mb-12 flex items-center gap-[6px] px-[30px] py-[10px] bg-[#FFEDB8] rounded-[20px] cursor-pointer">
        <div className={clsx(firaSans.className, "text-[20px]")}>
          Attach achievements
        </div>
        <UploadIcon />
      </button>
      <div className="flex justify-end">
        <button
          className={clsx(
            firaSans.className,
            "px-9 py-3 bg-[#4182F9] rounded-[30px] cursor-pointer text-[20px] text-white font-medium",
          )}
        >
          Save
        </button>
      </div>
    </form>
  );
}
