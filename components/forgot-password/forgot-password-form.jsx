import { FailureMessage } from "../common/failure-message";
import { SuccessMessage } from "../common/success-message";
import { firaSans } from "../fonts";
import { FormLayout } from "./ui/form-layout";
import { FormField } from "./ui/form-field";
import { InfoHeader } from "./ui/info-header";
import { SubmitButton } from "./ui/submit-button";
import { useForgotPasswordState } from "./use-forgot-password-state";

export function ForgotPasswordForm() {
  const {
    email,
    handleEmailChange,
    errors,
    onSubmit,
    successMessageText,
    errorMessageText,
  } = useForgotPasswordState();
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
        onSubmit={onSubmit}
        infoHeader={
          <InfoHeader
            text="Please enter your email address. You will receive a link to create a new password via email"
            fontClassName={firaSans.className}
          />
        }
        formFields={[
          <FormField
            fieldValue={email}
            labelText="Email"
            onChange={handleEmailChange}
            errorText={errors.emailError}
          />,
        ]}
        submitButton={<SubmitButton text="Get new password" />}
      />
    </div>
  );
}
