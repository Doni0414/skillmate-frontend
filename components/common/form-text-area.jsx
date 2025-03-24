import { FieldErrorMessage } from "./field-error-message";

export function FormTextArea({
  className,
  value,
  placeholder,
  onChange,
  errorText,
  outerContainerClassName,
}) {
  return (
    <div className={outerContainerClassName}>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={className}
        placeholder={placeholder}
      ></textarea>
      {errorText && <FieldErrorMessage className="mt-1" text={errorText} />}
    </div>
  );
}
