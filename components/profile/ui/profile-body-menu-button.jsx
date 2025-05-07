import clsx from "clsx";

export function ProfileBodyMenuButton({ toggled, text, icon, onClick }) {
  return (
    <button
      onClick={onClick}
      className={clsx(
        "flex gap-1 items-center w-fit h-[52px] text-[11px] font-semibold text-[#8E8E8E] cursor-pointer",
        toggled && "border-t border-t-[#262626] !text-[#262626]",
      )}
    >
      {icon}
      <div>{text}</div>
    </button>
  );
}
