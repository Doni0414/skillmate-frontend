import { AuthForm } from "../components/auth/auth-form";
import { Header } from "../components/header/header";

export default function AuthPage() {
  return (
    <div className="bg-[#E1F6FF] min-h-screen">
      <Header />
      <AuthForm />
    </div>
  );
}
