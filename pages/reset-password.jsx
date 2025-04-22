import { useSearchParams } from "next/navigation";
import { Header } from "../components/header/header";
import { ResetPasswordForm } from "../components/forgot-password/reset-password-form";

export default function ResetPasswordPage() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  if (!token) <p></p>;
  return (
    <ResetPasswordPageLayout
      header={<Header />}
      form={<ResetPasswordForm token={token} />}
    />
  );
}

function ResetPasswordPageLayout({ header, form }) {
  return (
    <div className="bg-[#E1F6FF] min-h-screen">
      {header}
      {form}
    </div>
  );
}
