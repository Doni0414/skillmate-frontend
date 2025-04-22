import clsx from "clsx";

export function HiddenFileInput({ className, ref, onChange }) {
  return (
    <input
      type="file"
      ref={ref}
      onChange={onChange}
      className={clsx("hidden", className)}
    />
  );
}
