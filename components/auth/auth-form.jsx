import { clsx } from "clsx";
import { Fira_Sans } from "next/font/google";
import { useFormState } from "./use-form-state";
import { Modal } from "../common/modal";
import { FieldErrorMessage } from "../common/field-error-message";
import { Select } from "../common/select";
import { CountrySelector } from "../common/country-selector";

const firaSans = Fira_Sans({ subsets: ["latin"], weight: ["400"] });

export function AuthForm() {
  const {
    signupToggled,
    signinToggled,
    signupFormData,
    selectCountry,
    signupFieldErrors,
    loginFieldErrors,
    isVerificationOpen,
    verificationDigits,
    inputsRef,
    verificationErrorMessage,
    toggleSignup,
    handleLoginFieldChange,
    handleLogin,
    handleDoNotHaveAccountClick,
    handleSignup,
    handleSignupFieldChange,
    handleVerificationDigitInput,
    handleVerificationKeyDown,
    handleSendCodeVerificationClick,
    handleResendCodeClick,
    closeVerification,
  } = useFormState();

  return (
    <div className={clsx("mx-auto mt-15 w-fit pb-10", firaSans.className)}>
      <AuthFormHeader
        signupToggled={signupToggled}
        signinToggled={signinToggled}
        toggleSignup={toggleSignup}
      />
      {signupToggled ? (
        <SignUpForm
          handleSignup={handleSignup}
          handleSignupFieldChange={handleSignupFieldChange}
          signupFieldErrors={signupFieldErrors}
          selectCountry={selectCountry}
          signupFormData={signupFormData}
        />
      ) : (
        <SignInForm
          toggleSignup={toggleSignup}
          handleLogin={handleLogin}
          handleLoginFieldChange={handleLoginFieldChange}
          handleDoNotHaveAccountClick={handleDoNotHaveAccountClick}
          loginFieldErrors={loginFieldErrors}
        />
      )}
      <Modal isOpen={isVerificationOpen} onClose={() => closeVerification()}>
        <VerificationForm
          email={signupFormData.email}
          verificationDigits={verificationDigits}
          inputsRef={inputsRef}
          handleVerificationDigitInput={handleVerificationDigitInput}
          handleVerificationKeyDown={handleVerificationKeyDown}
          handleSendCodeVerificationClick={handleSendCodeVerificationClick}
          verificationErrorMessage={verificationErrorMessage}
          handleResendCodeClick={handleResendCodeClick}
        />
      </Modal>
    </div>
  );
}

function AuthFormHeader({ signupToggled, signinToggled, toggleSignup }) {
  return (
    <div className="flex mx-auto content w-fit mb-10">
      <AuthFormHeaderButton
        buttonText={"Sign Up"}
        toggled={signupToggled}
        isSignupButton={true}
        toggleSignup={toggleSignup}
      />
      <AuthFormHeaderButton
        buttonText={"Sign In"}
        toggled={signinToggled}
        isSignupButton={false}
        toggleSignup={toggleSignup}
      />
    </div>
  );
}

function AuthFormHeaderButton({
  buttonText,
  toggled,
  isSignupButton,
  toggleSignup,
}) {
  return (
    <button
      className={clsx(
        "w-[147px] h-12 text-3xl bg-transparent cursor-pointer corner rounded-[15px]",
        toggled && "!bg-[#3C5AA5] text-[#F5F5F5]",
      )}
      onClick={() => toggleSignup(isSignupButton)}
    >
      {buttonText}
    </button>
  );
}

function SignInForm({
  toggleSignup,
  handleLogin,
  handleLoginFieldChange,
  handleDoNotHaveAccountClick,
  loginFieldErrors,
}) {
  return (
    <form
      onSubmit={handleLogin}
      className="flex flex-col items-center w-[450px] bg-white border-[#3C5AA5] border-2 rounded-4xl pt-10 pb-10 gap-5"
    >
      <FormInfoHeader text="Sign In" />
      <FormField
        onChange={(event) =>
          handleLoginFieldChange("email", event.target.value)
        }
        placeholder="Email address"
        errorText={loginFieldErrors.emailErrorMessage}
      />
      <FormField
        onChange={(event) =>
          handleLoginFieldChange("password", event.target.value)
        }
        placeholder="Password"
        isPasswordField
        errorText={loginFieldErrors.passwordErrorMessage}
      />
      <AuthFormSubmitButton text="Sign in" />
      <div className="w-80 h-0 border-[1px] border-black/10"></div>
      <button
        onClick={(e) => handleDoNotHaveAccountClick(e)}
        className="text-[17px] text-black/70 cursor-pointer hover:text-black/90"
      >
        Don't have an account?{" "}
        <span href="" className="text-black/100">
          Sign up
        </span>
      </button>
    </form>
  );
}

function FormInfoHeader({ text }) {
  return (
    <span className="font-medium text-[35px] leading-10 mx-auto">{text}</span>
  );
}

function SignUpForm({
  handleSignupFieldChange,
  handleSignup,
  signupFieldErrors,
  selectCountry,
  signupFormData,
}) {
  return (
    <form
      onSubmit={handleSignup}
      className="flex flex-col items-center w-[450px] bg-white border-[#3C5AA5] border-2 rounded-4xl pt-10 pb-10 gap-5"
    >
      <FormInfoHeader text="Sign Up" />
      <FormField
        placeholder="Email address"
        onChange={(e) => handleSignupFieldChange("email", e.target.value)}
        errorText={signupFieldErrors.emailErrorMessage}
      />
      <FormField
        placeholder="Full Name"
        onChange={(e) => handleSignupFieldChange("fullName", e.target.value)}
        errorText={signupFieldErrors.fullNameErrorMessage}
      />
      <CountrySelector
        selectCountry={selectCountry}
        className="py-2.5 pl-2.5 text-[17px] w-80 text-black/70 bg-black/4 rounded-4xl focus:outline-none cursor-pointer"
      />
      <FormField
        placeholder="New password"
        isPasswordField
        onChange={(e) => handleSignupFieldChange("password", e.target.value)}
        errorText={signupFieldErrors.passwordErrorMessage}
      />
      <FormField
        placeholder="Confirm new password"
        isPasswordField
        onChange={(e) =>
          handleSignupFieldChange("confirmPassword", e.target.value)
        }
        errorText={signupFieldErrors.passwordErrorMessage}
      />
      <AuthFormSubmitButton text="Create account" />
    </form>
  );
}

function AuthFormSubmitButton({ text }) {
  return (
    <button className="w-80 py-2.5 rounded-4xl bg-[#3C5AA5] text-white text-[17px] cursor-pointer hover:bg-[#4f6db9] transition-colors">
      {text}
    </button>
  );
}

function FormField({ placeholder, isPasswordField, onChange, errorText }) {
  return (
    <div>
      <input
        className="text-black/70 bg-black/4 rounded-4xl py-2.5 pl-2.5 text-[17px] w-80 focus:outline-none"
        type={isPasswordField ? "password" : "text"}
        placeholder={placeholder}
        onChange={onChange}
      />
      {errorText && (
        <FieldErrorMessage
          className="mt-1 ml-2.5 text-[14px]"
          text={errorText}
        />
      )}
    </div>
  );
}

function VerificationForm({
  email,
  verificationDigits,
  inputsRef,
  handleVerificationDigitInput,
  handleVerificationKeyDown,
  handleSendCodeVerificationClick,
  verificationErrorMessage,
  handleResendCodeClick,
}) {
  return (
    <div className="flex flex-col items-center bg-white w-[716px] pt-16 pb-14 rounded-2xl border-2 border-[#FFC107]">
      <div className="font-semibold text-[26px] text-black/70 leading-6 mb-8">
        Enter the 4-digit code sent to
      </div>
      <div className="font-semibold text-[26px] text-black/70 leading-6 mb-8">
        {email}
      </div>
      <div className="flex gap-4">
        {verificationDigits.map((digit, index) => (
          <input
            key={index}
            ref={(el) => (inputsRef.current[index] = el)}
            type="text"
            value={digit}
            maxLength="1"
            onChange={(e) => handleVerificationDigitInput(index, e)}
            onKeyDown={(e) => handleVerificationKeyDown(index, e)}
            className="w-12 h-12 text-center text-xl border-b-2 border-black outline-none"
          />
        ))}
      </div>
      <FieldErrorMessage
        className={"mb-12 mt-1"}
        text={verificationErrorMessage}
      />
      <button
        onClick={(e) => handleSendCodeVerificationClick(e, email)}
        className="bg-black text-white text-2xl px-12 py-2.5 rounded-4xl cursor-pointer hover:bg-black/70 transition-colors mb-4"
      >
        Send
      </button>
      <button
        onClick={() => handleResendCodeClick(email)}
        className="text-black/70 font-bold text-[18px] leading-6 cursor-pointer hover:text-black/90"
      >
        Send it again
      </button>
    </div>
  );
}
