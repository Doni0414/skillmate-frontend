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

  const [currentUser, setCurrentUser] = useState({});

  useEffect(() => {
    apiClient
      .get("/users/profile")
      .then((response) => {
        setCurrentUser(response.data);
      })
      .catch((error) => {
        console.log("error while obtaining user profile", error);
      });
  }, []);

  return (
    <div className={clsx(inter.className, "flex")}>
      <ChatSidebar
        currentUser={currentUser}
        activeChatId={activeChatId}
        onChatClick={(chat) => {
          setActiveChatId(chat.id);
          setActiveChat(chat);
        }}
      />
      <Chat chat={activeChat} currentUser={currentUser} />
    </div>
  );
}
