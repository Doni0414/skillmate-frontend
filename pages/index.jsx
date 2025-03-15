import { AuthForm } from "../components/auth/auth-form";
import { Modal } from "../components/common/modal";
import { CreateAdPopup } from "../components/create-ad/create-ad";
import { Header } from "../components/header/header";
import { SearchPageContent } from "../components/search";

export default function HomePage() {
  return (
    <div>
      <Header />
      <SearchPageContent className="mt-[62px] mb-[88px]" />
    </div>
  );
}
