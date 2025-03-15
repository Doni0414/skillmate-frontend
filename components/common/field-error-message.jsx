import clsx from "clsx";

export function FieldErrorMessage({ className, text }) {
  return <div className={clsx(className, "text-red-700")}>{text}</div>;
}
