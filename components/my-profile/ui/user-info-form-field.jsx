import clsx from "clsx";

export function UserInfoFormField({ className, placeholder, value, onChange }) {
  return (
    <input
      className={clsx(
        className,
        "bg-[#F9F9F9] text-black/70 text-[15px] w-[550px] pl-5 py-4 border border-black/10 rounded-[7px] focus:outline-none",
      )}
      placeholder={placeholder}
      value={value}
      type="text"
      onChange={onChange}
    />
  );
}
