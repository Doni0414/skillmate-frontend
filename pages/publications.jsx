import { useState } from "react";
import { Header } from "../components/header/header";
import PublicationsContent from "../components/publications";

export default function PublicationsPage() {
  const [user, setUser] = useState({});
  return (
    <div className="pb-10">
      <Header />
      <PublicationsContent user={user} />
    </div>
  );
}
