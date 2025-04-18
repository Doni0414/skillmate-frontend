import apiClient from "../components/api-client";
import { withAuth } from "../components/auth";
import { ChatPageContent } from "../components/chat/chat-page-content";
import { Header } from "../components/header/header";

function ChatPage() {
  return (
    <div>
      <Header />
      <ChatPageContent />
    </div>
  );
}

export default withAuth(ChatPage, apiClient);
