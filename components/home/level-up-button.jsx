import { ArrowRightIcon } from "./icon/arrow-right-icon";

export function LevelUpButton({}) {
  return (
    <a href="/auth?authType=signup">
      <button className="flex items-center gap-3 bg-[#FFEDB8] border-4 border-white rounded-[30px] px-[75px] py-6 text-[#B98F0F] cursor-pointer">
        Level Up Now <ArrowRightIcon />
      </button>
    </a>
  );
}
