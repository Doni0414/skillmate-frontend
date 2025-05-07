import clsx from "clsx";
import { firaSans } from "../../../fonts";

export function SeeRequestsPopupLayout({ requests }) {
  return (
    <div
      className={clsx(
        "border-2 border-[#FFC107] rounded-[20px] pt-[50px] pb-[140px] px-[76px] flex flex-col items-center justify-center",
        firaSans.className,
      )}
    >
      <div className="font-semibold text-black/70 text-[26px]">Requests</div>
      {requests}
    </div>
  );
}
