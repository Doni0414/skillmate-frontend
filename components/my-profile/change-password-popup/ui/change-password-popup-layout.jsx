import clsx from "clsx";
import { FieldErrorMessage } from "../../../common/field-error-message";
import { firaSans } from "../../../fonts";

export function ChangePasswordPopupLayout({
  oldPasswordField,
  newPasswordField,
  confirmNewPasswordField,
  saveButton,
}) {
  return (
    <form className="pl-10 pr-16 py-12 border border-[#FFC107] bg-white rounded-[20px]">
      <div
        className={clsx(
          firaSans.className,
          "mx-auto w-fit text-black/70 font-semibold text-[26px] mb-9",
        )}
      >
        Change password
      </div>
      <div className="space-y-10 mb-10">
        {oldPasswordField}
        {newPasswordField}
        {confirmNewPasswordField}
      </div>
      <div className="flex justify-end">{saveButton}</div>
    </form>
  );
}
