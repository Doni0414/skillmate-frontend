import clsx from "clsx";

export function AuthButton({ text, className, variant, handleClick }) {
  const computedClassName = clsx(
    "cursor-pointer w-[78px] h-10",
    className,
    {
      signin: "bg-white",
    }[variant],
  );
  return (
    <button className={computedClassName} onClick={handleClick}>
      {text}
    </button>
  );
}
