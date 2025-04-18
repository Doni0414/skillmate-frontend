import { useRouter } from "next/router";
import { AuthForm } from "../components/auth/auth-form";
import { Header } from "../components/header/header";

export default function AuthPage() {
  const router = useRouter();
  const { authType } = router.query;
  console.log(authType);
  return (
    <div className="bg-[#E1F6FF] min-h-screen">
      <Header />
      <AuthForm type={authType} />
    </div>
  );
}
