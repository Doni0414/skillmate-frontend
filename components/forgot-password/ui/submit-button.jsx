import clsx from "clsx";

export function SubmitButton({ text, onClick, className }) {
  return (
    <button
      onClick={onClick}
      className={clsx(
        className,
        "w-[520px] py-2.5 bg-[#3C5AA5] text-white text-[17px] cursor-pointer hover:bg-[#4f6db9] transition-colors",
      )}
    >
      {text}
    </button>
  );
}
