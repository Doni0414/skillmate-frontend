import clsx from "clsx";
import { Roboto } from "next/font/google";
import Image from "next/image";
import { useEffect, useState } from "react";
import apiClient from "../api-client";
import { getResourceURLById } from "../api";

export function otherUserId(chat, currentUserId) {
  return chat.senderId === currentUserId ? chat.receiverId : chat.senderId;
}

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "700", "900"],
});

export function ChatContainer({ chat, isActive, onClick, currentUser }) {
  const [otherUser, setOtherUser] = useState({});
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    apiClient
      .get("/users/profile/" + otherUserId(chat, currentUser.id))
      .then((response) => {
        console.log("other user response", JSON.stringify(response.data));
        setOtherUser(response.data);
      })
      .catch((error) => {
        console.log("error while obtaining chat user", error);
      });
    apiClient
      .get("/messages/chat/" + chat.id)
      .then((response) => {
        setMessages(response.data);
      })
      .catch((error) => {
        console.log("error while obtaining messages", error);
      });
  }, [currentUser, chat]);

  return (
    <div
      className="px-6 py-[14px] flex gap-4 cursor-pointer"
      onClick={() => onClick(chat)}
    >
      <Image
        width={56}
        height={66}
        className="w-[56px] h-[66px] rounded-full object-cover"
        src={getResourceURLById(otherUser.imageResourceId)}
        alt="ava"
      />
      <ChatUserContainer
        isActive={isActive}
        user={otherUser}
        currentUser={currentUser}
        lastMessageAuthorId={
          messages.length > 0 && messages[messages.length - 1].senderId
        }
        lastMessage={chat.lastMessage}
      />
      <MessageDateContainer
        unreadCount={chat.unreadCount}
        lastMessageTime={chat.lastMessageTime}
        currentUserId={currentUser.id}
      />
    </div>
  );
}

function ChatUserContainer({
  isActive,
  user,
  lastMessage,
  currentUser,
  lastMessageAuthorId,
}) {
  console.log("user", currentUser);
  console.log("lastMessageAuthorId", lastMessageAuthorId);
  const getLastMessage = () => {
    return currentUser.id === lastMessageAuthorId
      ? "You: " + lastMessage
      : lastMessage;
  };
  return (
    <div className="">
      <div
        className={clsx(
          "text-[20px]",
          isActive && roboto.className,
          isActive && "text-[#262626]",
        )}
      >
        {user.fullName}
      </div>
      {lastMessage && (
        <div className="w-[204px] text-[14px] text-[#5F5F5F] overflow-hidden text-ellipsis whitespace-nowrap leading-4">
          {getLastMessage()}
        </div>
      )}
    </div>
  );
}

export function computeDateString(timestamp) {
  const currentDate = new Date();
  const date = new Date(timestamp);
  const elapsedMilliseconds = currentDate.getTime() - date.getTime();

  const elapsedDays = elapsedMilliseconds / (1000 * 60 * 60 * 24);

  if (elapsedDays < 1) {
    const hoursString = String(date.getHours()).padStart(2, "0");
    const minutesString = String(date.getMinutes()).padStart(2, "0");
    return hoursString + ":" + minutesString;
  } else if (elapsedDays >= 1 && elapsedDays < 2) {
    return "Yesterday";
  } else {
    return date.toDateString().split(" ").slice(1).join(" ");
  }
}

function MessageDateContainer({ lastMessageTime, currentUserId, unreadCount }) {
  return (
    <div className="w-[90px] flex flex-col items-end">
      {lastMessageTime && (
        <div className="text-[#A0A0A0] text-[14px] mb-2">
          {computeDateString(message.date)}
        </div>
      )}
    </div>
  );
}
