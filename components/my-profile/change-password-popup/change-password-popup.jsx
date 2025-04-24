import { FailureMessage } from "../../common/failure-message";
import { Modal } from "../../common/modal";
import { SuccessMessage } from "../../common/success-message";
import { useChangePasswordPopupState } from "./model/use-change-password-popup-state";
import { ChangePasswordFormField } from "./ui/change-password-form-field";
import { ChangePasswordPopupLayout } from "./ui/change-password-popup-layout";
import { SaveButton } from "./ui/save-button";

export function ChangePasswordPopup({ userInfo, isOpen, onClose }) {
  const { changePasswordState, handleOnFieldChange, handleClickSaveButton } =
    useChangePasswordPopupState(userInfo, onClose);
  return (
    <>
      <SuccessMessage
        showMessage={changePasswordState.successMessage}
        successMessage={changePasswordState.successMessage}
      />
      <FailureMessage
        showMessage={changePasswordState.errorMessage}
        failureMessage={changePasswordState.errorMessage}
      />
      <FailureMessage
        showMessage={changePasswordState.errors.passwordsEquality}
        failureMessage={changePasswordState.errors.passwordsEquality}
      />
      <Modal isOpen={isOpen} onClose={onClose}>
        {isOpen && (
          <ChangePasswordPopupLayout
            oldPasswordField={
              <ChangePasswordFormField
                name="oldPassword"
                value={changePasswordState.data.oldPassword}
                placeholder="Old password"
                errorText={changePasswordState.errors.oldPasswordError}
                onChange={handleOnFieldChange}
              />
            }
            newPasswordField={
              <ChangePasswordFormField
                name="newPassword"
                value={changePasswordState.data.newPassword}
                placeholder="New password"
                errorText={changePasswordState.errors.newPasswordError}
                onChange={handleOnFieldChange}
              />
            }
            confirmNewPasswordField={
              <ChangePasswordFormField
                name="confirmNewPassword"
                value={changePasswordState.data.confirmNewPassword}
                placeholder="New password confirmation"
                errorText={changePasswordState.errors.confirmNewPasswordError}
                onChange={handleOnFieldChange}
              />
            }
            saveButton={<SaveButton onClick={handleClickSaveButton} />}
          />
        )}
      </Modal>
    </>
  );
}
