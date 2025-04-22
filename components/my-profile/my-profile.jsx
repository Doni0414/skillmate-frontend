import clsx from "clsx";
import { PlusIcon } from "../common/icons/plus-icon";
import { Fira_Sans, Poppins } from "next/font/google";
import { Select } from "../common/select";
import { useMyProfileState } from "./model/use-my-profile-state";
import { Modal } from "../common/modal";
import { UploadIcon } from "../common/icons/upload-icon";
import { SuccessMessage } from "../common/success-message";
import { FormField } from "../common/FormField";
import { ViewSkillPopup } from "../common/view-skill-popup/view-skill-popup";
import { MyProfileLayout } from "./ui/my-profile-layout";
import { EditProfileButton } from "./ui/edit-profile-button";
import { getResourceURLById } from "../api";
import { UserEmailContainerLayout } from "./ui/user-email-container-layout";
import { HiddenFileInput } from "../common/hidden-file-input";
import { UserProfileImage } from "./ui/user-profile-image";
import { UserInfoFormLayout } from "./ui/user-info-form-layout";
import { UserInfoFields } from "./user-info-fields";
import { genderLabels, genderValues } from "./constants";
import { AddNewSkillButton } from "./ui/add-new-skill-button";
import { SkillCard } from "./ui/skill-card";
import { AddSkillPopup } from "./add-skill-popup";

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
    <>
      <MyProfileLayout
        className={className}
        userEmailContainer={
          <UserEmailContainerLayout
            onUserImageClick={() => imageInputRef.current.click()}
            hiddenImageInput={
              <HiddenFileInput
                onChange={handleImageChange}
                ref={imageInputRef}
              />
            }
            email={userInfo.email}
            fullName={userInfo.fullName}
            editImageIcon={<PlusIcon />}
            userImage={
              <UserProfileImage
                imageResourceURL={getResourceURLById(userInfo.imageResourceId)}
              />
            }
          />
        }
        editProfileButton={
          <EditProfileButton
            handleClickOnEditButton={handleClickOnEditButton}
          />
        }
        userInfoForm={
          <UserInfoFormLayout
            userInfoFields={
              <UserInfoFields
                editableUserInfo={editableUserInfo}
                genderLabels={genderLabels}
                genderValues={genderValues}
                handleUserInfoChange={handleUserInfoChange}
                userInfo={userInfo}
                userInfoFieldErrors={userInfoFieldErrors}
              />
            }
          />
        }
        addSkillButton={
          <AddNewSkillButton
            handleClickOnAddSkillButton={handleClickOnAddSkillButton}
          />
        }
        skills={userInfo.skills.map((skill, index) => (
          <SkillCard
            key={index}
            skill={skill}
            handleClickOnViewSkillButton={handleClickOnViewSkillButton}
            handleClickOnEditSkillButton={handleClickOnEditSkillButton}
            handleClickOnDeleteSkillButton={handleClickOnDeleteSkillButton}
          />
        ))}
      />
      <SuccessMessage
        showMessage={showSuccessMessage}
        successMessage={successMessage}
      />
      <AddSkillPopup
        isOpen={isAddSkillPopupOpen}
        onClose={closeAddSkillPopup}
        addSkillForm={addSkillForm}
        addSkillFormErrors={addSkillFormErrors}
        addAchievementInputRef={addAchievementInputRef}
        proficiencyLevelValues={PROFICIENCY_LEVELS_VALUES}
        proficiencyLevels={PROFICIENCY_LEVELS}
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
      <ViewSkillPopup
        skill={skillOnView}
        isOpen={skillOnView}
        onClose={closeViewSkill}
      />
      <Modal isOpen={skillOnEdit} onClose={closeEditSkill}>
        <EditSkillPopup
          skill={skillOnEdit}
          handleSkillOnEditFieldChange={handleSkillOnEditFieldChange}
        />
      </Modal>
    </>
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
