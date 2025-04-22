import clsx from "clsx";

export function InfoHeader({ text, fontClassName }) {
  return <div className={clsx(fontClassName, "text-[15px]")}>{text}</div>;
}
