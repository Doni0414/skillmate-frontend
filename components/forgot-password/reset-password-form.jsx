import { FailureMessage } from "../common/failure-message";
import { SuccessMessage } from "../common/success-message";
import { FormField } from "./ui/form-field";
import { FormFields } from "./ui/form-fields";
import { FormLayout } from "./ui/form-layout";
import { InfoHeader } from "./ui/info-header";
import { SubmitButton } from "./ui/submit-button";
import { useResetPasswordState } from "./use-reset-password-state";

export function ResetPasswordForm({ token }) {
  const {
    form,
    handleSubmit,
    handleNewPasswordFieldChange,
    handleConfirmNewPasswordFieldChange,
    errors,
    successMessageText,
    errorMessageText,
  } = useResetPasswordState(token);
  return (
    <div>
      <SuccessMessage
        showMessage={successMessageText}
        successMessage={successMessageText}
      />
      <FailureMessage
        showMessage={errorMessageText}
        failureMessage={errorMessageText}
      />
      <FormLayout
        onSubmit={handleSubmit}
        infoHeader={<InfoHeader text="Enter your new password below" />}
        formFields={
          <FormFields>
            <FormField
              labelText="New Password"
              onChange={handleNewPasswordFieldChange}
              errorText={errors.newPasswordError}
              type="password"
            />
            <FormField
              labelText="New Password (Confirmation)"
              onChange={handleConfirmNewPasswordFieldChange}
              errorText={errors.confirmNewPasswordError}
              type="password"
            />
          </FormFields>
        }
        submitButton={<SubmitButton text="Reset Password" />}
      />
    </div>
  );
}
