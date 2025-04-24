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
import { EditSkillPopup } from "./edit-skill-popup";
import { ChangePasswordButton } from "./ui/change-password-button";
import { ChangePasswordPopup } from "./change-password-popup/change-password-popup";

export const PROFICIENCY_LEVELS = ["Beginner", "Intermediate", "Pro"];
export const PROFICIENCY_LEVELS_VALUES = ["BEGINNER", "INTERMEDIATE", "PRO"];

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
    addAchievementInputRefInEditPopup,
    handleAddAchievementInputRefInEditPopupOnChange,
    handleClickOnAttachAchievementInEditSkillPopup,
    handleClickOnSaveButtonInEditSkillPopup,
    skillOnEditErrors,
    handleClickOnDeleteAchievementInEditSkillPopup,
    isChangePasswordPopupOpen,
    handleClickOnChangePasswordButton,
    closeChangePasswordPopup,
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
        changePasswordButton={
          <ChangePasswordButton onClick={handleClickOnChangePasswordButton} />
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
      <EditSkillPopup
        isOpen={skillOnEdit}
        skill={skillOnEdit}
        onClose={closeEditSkill}
        proficiencyLevels={PROFICIENCY_LEVELS}
        proficiencyLevelValues={PROFICIENCY_LEVELS_VALUES}
        handleSkillOnEditFieldChange={handleSkillOnEditFieldChange}
        handleClickOnAttachAchievement={
          handleClickOnAttachAchievementInEditSkillPopup
        }
        addAchievementInputRef={addAchievementInputRefInEditPopup}
        handleAddAchievementInputRefOnChange={
          handleAddAchievementInputRefInEditPopupOnChange
        }
        handleClickOnSave={handleClickOnSaveButtonInEditSkillPopup}
        errors={skillOnEditErrors}
        deleteAchievement={handleClickOnDeleteAchievementInEditSkillPopup}
      />
      <ChangePasswordPopup
        isOpen={isChangePasswordPopupOpen}
        onClose={closeChangePasswordPopup}
      />
    </>
  );
}
