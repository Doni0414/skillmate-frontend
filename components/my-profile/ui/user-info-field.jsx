export function UserInfoField({ labelInfo, field, errorText }) {
  return (
    <div className="w-fit">
      <div className="mb-2 text-[15px] opacity-80">{labelInfo}</div>
      {field}
      {errorText && <div className="text-red-700 mt-1">{errorText}</div>}
    </div>
  );
}
