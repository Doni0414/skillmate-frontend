import { Inter } from "next/font/google";
import { ChatSidebar } from "./chat-sidebar";
import clsx from "clsx";
import { Chat } from "./chat";
import { useEffect, useState } from "react";
import apiClient from "../api-client";

export const inter = Inter({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export function ChatPageContent() {
  const [activeChatId, setActiveChatId] = useState(-1);
  const [activeChat, setActiveChat] = useState({});

  const [currentUserId, setCurrentUserId] = useState();

  useEffect(() => {
    apiClient
      .get("/users/profile")
      .then((response) => {
        setCurrentUserId(response.data.id);
      })
      .catch((error) => {
        console.log("error while obtaining user profile", error);
      });
  }, []);

  console.log("active chat id: " + activeChatId);
  console.log("active chat: " + JSON.stringify(activeChat));

  return (
    <div className={clsx(inter.className, "flex")}>
      <ChatSidebar
        currentUserId={currentUserId}
        activeChatId={activeChatId}
        onChatClick={(chat) => {
          setActiveChatId(chat.id);
          setActiveChat(chat);
        }}
      />
      <Chat chat={activeChat} currentUserId={currentUserId} />
    </div>
  );
}
