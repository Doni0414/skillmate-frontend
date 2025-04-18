import clsx from "clsx";

export function NavigationButton({ text, handleClick, className }) {
  return (
    <button onClick={handleClick} className={clsx("cursor-pointer", className)}>
      {text}
    </button>
  );
}
