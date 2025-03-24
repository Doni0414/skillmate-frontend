import { useEffect, useState } from "react";
import { ChatContainer } from "./chat-container";
import { ChatIcon } from "./icon/chat-icon";
import apiClient from "../api-client";

export function ChatSidebar({ onChatClick, activeChatId, currentUserId }) {
  const [chats, setChats] = useState([]);

  useEffect(() => {
    apiClient
      .get("/chats")
      .then((response) => {
        setChats(response.data);
      })
      .catch((error) => {
        console.log("error while obtaining chats", error);
      });
  }, []);

  console.log(chats);

  return (
    <div className="w-fit px-6 pt-[30px] h-screen bg-white">
      <div className="ml-6 flex items-center text-[#818181] gap-2 mb-[10px]">
        <ChatIcon />
        <div className="font-medium text-[12px]">ALL MESSAGES</div>
      </div>
      {chats.map((chat, idx) => (
        <ChatContainer
          chat={chat}
          key={idx}
          isActive={chat.id == activeChatId}
          onClick={onChatClick}
          currentUserId={currentUserId}
        />
      ))}
    </div>
  );
}
