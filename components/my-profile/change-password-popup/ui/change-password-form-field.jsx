import { FieldErrorMessage } from "../../../common/field-error-message";

export function ChangePasswordFormField({
  name,
  value,
  onChange,
  placeholder,
  errorText,
}) {
  return (
    <div>
      <input
        className="w-[609px] pl-[12px] py-[17px] bg-[#F9F9F9] text-black/70 text-[15px] border border-black/10 rounded-[7px] focus:outline-none"
        placeholder={placeholder}
        value={value}
        name={name}
        type="password"
        onChange={onChange}
      />
      {errorText && <FieldErrorMessage className="mt-1" text={errorText} />}
    </div>
  );
}
