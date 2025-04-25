import clsx from "clsx";
import { firaSans } from "../../fonts";
import { UploadIcon } from "../../common/icons/upload-icon";
import { AchievementsList } from "../../common/achievements/achievements-list";
import { FieldErrorMessage } from "../../common/field-error-message";

export function AddSkillPopupLayout({
  onSearchFocus,
  onSearchUnFocus,
  skillName,
  handleSkillNameChange,
  skillNameErrorText,
  skillDescription,
  handleDescriptionChange,
  skillDescriptionErrorText,
  proficiencyLevelField,
  achievements,
  handleClickOnAttachAchievementsButtonInAddSkillForm,
  hiddenAchievementInput,
  handleClickOnSaveButtonInAddSkillPopup,
  suggestedSkills,
}) {
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
      <div className="mb-[53px]">
        <input
          onFocus={onSearchFocus}
          onBlur={onSearchUnFocus}
          className="w-[609px] pl-[12px] py-[17px] bg-[#F9F9F9] text-black/70 text-[15px] border border-black/10 rounded-[7px] focus:outline-none"
          placeholder="Skill name"
          value={skillName}
          type="text"
          onChange={handleSkillNameChange}
        />
        <div className="relative">
          {skillNameErrorText && (
            <FieldErrorMessage className="mt-1" text={skillNameErrorText} />
          )}
          <div className="absolute top-0 bg-[#F9F9F9] border border-black/10 border-t-transparent rounded-b-2xl">
            {suggestedSkills}
          </div>
        </div>
      </div>
      <div className="mb-[53px]">
        <textarea
          value={skillDescription}
          onChange={handleDescriptionChange}
          className={
            "block w-[609px] h-[130px] pl-[12px] pt-[17px] bg-[#F9F9F9] text-black/70 text-[15px] border border-black/10 rounded-[7px] focus:outline-none resize-none"
          }
          placeholder="Skill description"
        ></textarea>
        {skillDescriptionErrorText && (
          <FieldErrorMessage
            className="mt-1"
            text={skillDescriptionErrorText}
          />
        )}
      </div>
      {proficiencyLevelField}
      <AchievementsList className="mb-10" achievements={achievements} />

      <button
        onClick={handleClickOnAttachAchievementsButtonInAddSkillForm}
        className="mb-12 flex items-center gap-[6px] px-[30px] py-[10px] bg-[#FFEDB8] rounded-[20px] cursor-pointer"
      >
        <div className={clsx(firaSans.className, "text-[20px]")}>
          Attach achievements
        </div>
        <UploadIcon />
      </button>
      {hiddenAchievementInput}
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
