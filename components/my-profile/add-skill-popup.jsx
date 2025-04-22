import { AchievementsList } from "../common/achievements/achievements-list";
import { DeletableAchievementCard } from "../common/achievements/deletable-achievement-card";
import { FormTextArea } from "../common/form-text-area";
import { FormField } from "../common/FormField";
import { HiddenFileInput } from "../common/hidden-file-input";
import { Modal } from "../common/modal";
import { Select } from "../common/select";
import { AddSkillPopupLayout } from "./ui/add-skill-popup-layout";
import { ProficiencyLevelSelect } from "./ui/proficiency-level-selector";

export function AddSkillPopup({
  isOpen,
  onClose,
  addSkillForm,
  addSkillFormErrors,
  proficiencyLevels,
  proficiencyLevelValues,
  addAchievementInputRef,
  handleChangeOfAddSkillForm,
  handleClickOnAttachAchievementsButtonInAddSkillForm,
  handleAddAchievementInputRefOnChange,
  handleClickOnSaveButtonInAddSkillPopup,
  deleteAchievementInAddSkillPopup,
}) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <AddSkillPopupLayout
        skillName={addSkillForm.name}
        handleSkillNameChange={(e) =>
          handleChangeOfAddSkillForm("name", e.target.value)
        }
        skillNameErrorText={addSkillFormErrors.skillNameError}
        skillDescription={addSkillForm.description}
        handleDescriptionChange={(e) => {
          handleChangeOfAddSkillForm("description", e.target.value);
        }}
        skillDescriptionErrorText={addSkillFormErrors.skillDescriptionError}
        proficiencyLevelField={
          <ProficiencyLevelSelect
            value={addSkillForm.level}
            labels={proficiencyLevels}
            values={proficiencyLevelValues}
            onSelect={(e) => handleChangeOfAddSkillForm("level", e)}
          />
        }
        handleClickOnAttachAchievementsButtonInAddSkillForm={
          handleClickOnAttachAchievementsButtonInAddSkillForm
        }
        handleClickOnSaveButtonInAddSkillPopup={
          handleClickOnSaveButtonInAddSkillPopup
        }
        hiddenAchievementInput={
          <HiddenFileInput
            ref={addAchievementInputRef}
            onChange={handleAddAchievementInputRefOnChange}
          />
        }
        achievements={addSkillForm.achievements.map((achievement, index) => (
          <DeletableAchievementCard
            handleDeleteAchievement={deleteAchievementInAddSkillPopup}
            achievement={achievement}
            index={index}
          />
        ))}
      />
    </Modal>
  );
}
