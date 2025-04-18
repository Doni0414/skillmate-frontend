import { useState } from "react";
import { Header } from "../components/header/header";
import PublicationsContent from "../components/publications";
import { withAuth } from "../components/auth";
import apiClient from "../components/api-client";

function PublicationsPage() {
  const [user, setUser] = useState({});
  return (
    <div className="pb-10">
      <Header />
      <PublicationsContent user={user} />
    </div>
  );
}

export default withAuth(PublicationsPage, apiClient);
