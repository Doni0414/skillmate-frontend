import { FieldErrorMessage } from "./field-error-message";

export function FormField({
  placeholder,
  value,
  errorText,
  onChange,
  className,
}) {
  return (
    <div>
      <input
        className={className}
        placeholder={placeholder}
        value={value}
        type="text"
        onChange={onChange}
      />
      {errorText && <FieldErrorMessage className="mt-1" text={errorText} />}
    </div>
  );
}
