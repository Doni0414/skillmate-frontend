export function AuthButtonsLayout({ signupButton, loginButton }) {
  return (
    <div className="flex gap-7">
      {signupButton}
      {loginButton}
    </div>
  );
}
