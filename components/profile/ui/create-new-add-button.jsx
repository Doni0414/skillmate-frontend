import clsx from "clsx";
import { PlusIcon } from "../icon/plus-icon";
import { poppins } from "../../fonts";

export function CreateNewAddButton({ onClick }) {
  return (
    <button
      onClick={onClick}
      className={clsx(
        "flex items-center gap-2 px-2.5 py-1 rounded-[10px] bg-[#4182F9] cursor-pointer text-[#F9F9F9] text-[15px] hover:bg-[#4182F9]/90 transition-colors",
        poppins.className,
      )}
    >
      <div>Create new ad</div> <PlusIcon />
    </button>
  );
}
