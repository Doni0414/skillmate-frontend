import { useState } from "react";
import { ChatContainer } from "./chat-container";
import { ChatIcon } from "./icon/chat-icon";

export function ChatSidebar({ onChatClick, activeChatId }) {
  const chats = [
    {
      id: 1,
      user: {
        fullName: "Askar",
        imageResourceId:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRGxQwzkOhOPos_EQVdm6ElGi1iCpXiq4ZMiw&s",
        lastMessage: {
          text: "Just got back from a hiking trip!",
          seen1: false,
          date: 1741712429000,
          authorId: 2,
        },
      },
    },
  ];

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
        />
      ))}
    </div>
  );
}
