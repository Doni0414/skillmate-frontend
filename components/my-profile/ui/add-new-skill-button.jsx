import clsx from "clsx";
import { firaSans } from "../../fonts";
import { AddIcon } from "../../common/icons/add-icon";

export function AddNewSkillButton({ handleClickOnAddSkillButton }) {
  return (
    <button
      className={clsx(
        "flex justify-center items-center gap-[7px] rounded-[30px] w-[198px] py-2 bg-[#3C5AA5] text-white text-[20px] cursor-pointer",
        firaSans.className,
      )}
      onClick={handleClickOnAddSkillButton}
    >
      <div>Add a new skill</div> <AddIcon />
    </button>
  );
}
