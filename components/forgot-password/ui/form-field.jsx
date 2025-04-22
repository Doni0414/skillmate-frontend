import clsx from "clsx";

export function FormField({
  labelText,
  onChange,
  className,
  fieldValue,
  errorText,
  type,
}) {
  return (
    <div>
      <div className="mb-2">
        {labelText} <span className="text-red-800">*</span>
      </div>
      <input
        value={fieldValue}
        onChange={onChange}
        type={type}
        className={clsx(
          className,
          "w-[520px] text-black/70 py-2 pl-2.5 text-[17px] border border-black/20 focus:outline-none",
        )}
      />
      <div className="text-red-800">{errorText}</div>
    </div>
  );
}
