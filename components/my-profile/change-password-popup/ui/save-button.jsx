import clsx from "clsx";
import { firaSans } from "../../../fonts";

export function SaveButton({ onClick }) {
  return (
    <button
      onClick={onClick}
      className={clsx(
        firaSans.className,
        "px-9 py-3 bg-[#4182F9] rounded-[30px] cursor-pointer text-[20px] text-white font-medium",
      )}
    >
      Save
    </button>
  );
}
