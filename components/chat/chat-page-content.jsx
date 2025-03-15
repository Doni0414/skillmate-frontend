import { Inter } from "next/font/google";
import { ChatSidebar } from "./chat-sidebar";
import clsx from "clsx";
import { Chat } from "./chat";
import { useState } from "react";

export const inter = Inter({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export function ChatPageContent() {
  const [activeChatId, setActiveChatId] = useState(-1);

  return (
    <div className={clsx(inter.className, "flex")}>
      <ChatSidebar
        activeChatId={activeChatId}
        onChatClick={(chat) => setActiveChatId(chat.id)}
      />
      <Chat chatId={activeChatId} />
    </div>
  );
}
