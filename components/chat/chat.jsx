import clsx from "clsx";
import { Roboto } from "next/font/google";
import Image from "next/image";
import { inter, MessageContainer, MessageUiKit } from "./message";
import { SendMessageIcon } from "./icon/send-message-icon";
import { useEffect, useState } from "react";
import apiClient from "../api-client";
import { otherUserId } from "./chat-container";
import { getResourceURLById } from "../api";
import defaultAvaSrc from "../header/images/ava.png";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "700", "900"],
});

const chatIdIsChoosen = (chatId) => {
  return chatId > 0;
};

const chatIsChoosen = (chat) => {
  return chat.name;
};

export function Chat({ chat, currentUser }) {
  const [otherUser, setOtherUser] = useState({});

  useEffect(() => {
    apiClient
      .get("/users/profile/" + otherUserId(chat, currentUser.id))
      .then((response) => {
        setOtherUser(response.data);
      })
      .catch((error) => {
        console.log("error while obtaining chat user", error);
      });
  }, [chat]);
  console.log("current user", currentUser);
  return (
    <div className="grow">
      <ChatHeader
        chat={chat}
        currentUserId={currentUser.id}
        otherUser={otherUser}
      />
      {chatIsChoosen(chat) ? (
        <ChatBody
          chatId={chat.id}
          currentUserId={currentUser.id}
          receiverId={otherUser.id}
        />
      ) : (
        <EmptyChatBody />
      )}
    </div>
  );
}

function EmptyChatBody() {
  return (
    <div className="h-screen flex justify-center items-center bg-[#E1F6FF] text-2xl font-medium text-[#818181]">
      Choose chat
    </div>
  );
}

function ChatHeader({ chat, chatId, currentUserId, otherUser }) {
  console.log("other user" + JSON.stringify(otherUser));
  return (
    <div className="h-[90px] px-11 py-4 bg-white">
      {chatIsChoosen(chat) && (
        <div className="flex gap-5 items-center">
          <Image
            src={
              otherUser.imageResourceId
                ? getResourceURLById(otherUser.imageResourceId)
                : defaultAvaSrc
            }
            width={56}
            height={56}
            className="w-14 h-14 rounded-full object-cover"
            alt="other user image"
          />
          <div className={clsx(roboto.className, "text-[#262626] text-[20px]")}>
            {otherUser.fullName}
          </div>
        </div>
      )}
    </div>
  );
}

function ChatBody({ chatId, currentUserId, receiverId }) {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      apiClient
        .get("/messages/chat/" + chatId)
        .then((response) => {
          setMessages(response.data);
        })
        .catch((error) => {
          console.log("error while obtaining chat messages", error);
        });
    }, 500);
    return () => {
      clearInterval(interval);
    };
  }, [chatId]);

  console.log(messages);
  return (
    <div className="relative bg-[#E1F6FF] min-h-screen px-8 py-[90px] space-y-5">
      {messages.map((message, index) => (
        <MessageContainer
          key={index}
          message={message}
          currentUserId={currentUserId}
        />
      ))}
      <div className="flex justify-center bg-white">
        <SendMessageContainer
          chatId={chatId}
          currentUserId={currentUserId}
          receiverId={receiverId}
        />
      </div>
    </div>
  );
}

function SendMessageContainer({ chatId, currentUserId, receiverId }) {
  const [messageText, setMessageText] = useState("");

  const handleSendMessage = () => {
    if (messageText && messageText.trim() !== "") {
      apiClient
        .post(
          "/messages",
          {
            content: messageText,
            senderId: currentUserId,
            receiverId: receiverId,
            messageType: "TEXT",
            chatId: chatId,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          },
        )
        .then((response) => {
          console.log("response", response);
          console.log("text is successfully sent");
          setMessageText("");
        })
        .catch((error) => {
          console.log("error while sending message", error);
        });
    }
  };
  const handleOnKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleSendMessage();
    }
  };
  return (
    <div className="fixed flex items-center gap-4 bottom-0 grow pl-4 pr-14 py-4 bg-white rounded-[20px]">
      <input
        onKeyDown={handleOnKeyDown}
        value={messageText}
        onChange={(event) => setMessageText(event.target.value)}
        placeholder="Type message..."
        className="grow w-[700px] text-2xl text-[#888888] focus:outline-none"
      />
      <button
        onClick={handleSendMessage}
        className="ml-auto px-[10px] py-[10px] flex items-center gap-[2px] bg-[#00A3FF] rounded-[12px] cursor-pointer text-white font-medium text-[20px] hover:bg-[#00a2ffe1] transition-colors"
      >
        Send <SendMessageIcon />
      </button>
    </div>
  );
}
