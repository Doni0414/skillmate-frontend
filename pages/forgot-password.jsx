import { Header } from "../components/header/header";

export default function ForgotPasswordPage() {
  return <ForgotPasswordLayout header={<Header />} />;
}

function ForgotPasswordLayout({ header, form }) {
  return (
    <div>
      {header}
      {form}
    </div>
  );
}
