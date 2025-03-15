import clsx from "clsx";
import { Fira_Sans } from "next/font/google";

const firaSans = Fira_Sans({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export function ToggleButtonContainer({
  adsActive,
  handleOnAdsClick,
  handleOnUsersClick,
}) {
  return (
    <div className="ml-[226px] mb-[54px] flex gap-[46px]">
      <ToggleButton
        text="Ads"
        isActive={adsActive}
        handleOnClick={handleOnAdsClick}
      />
      <ToggleButton
        text="Users"
        isActive={!adsActive}
        handleOnClick={handleOnUsersClick}
      />
    </div>
  );
}

function ToggleButton({ className, text, isActive, handleOnClick }) {
  return (
    <button
      onClick={handleOnClick}
      className={clsx(
        className,
        "px-8 py-2 rounded-[10px] text-[25px] bg-transparent text-[#1E1E1E] cursor-pointer",
        isActive && "!bg-[#3C5AA5] !text-[#F5F5F5]/70",
        firaSans.className,
      )}
    >
      {text}
    </button>
  );
}
