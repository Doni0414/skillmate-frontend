import apiClient from "../components/api-client";
import { withAuth } from "../components/auth";
import { Header } from "../components/header/header";
import { SearchPageContent } from "../components/search";

function SearchPage() {
  return (
    <div>
      <Header />
      <SearchPageContent className="mt-[62px] mb-[88px]" />
    </div>
  );
}

export default withAuth(HomePage, apiClient);
