import { ForgotPasswordForm } from "../components/forgot-password/forgot-password-form";
import { Header } from "../components/header/header";

export default function ForgotPasswordPage() {
  return (
    <ForgotPasswordLayout header={<Header />} form={<ForgotPasswordForm />} />
  );
}

function ForgotPasswordLayout({ header, form }) {
  return (
    <div className="bg-[#E1F6FF] min-h-screen">
      {header}
      <div>{form}</div>
    </div>
  );
}
