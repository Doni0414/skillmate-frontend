import clsx from "clsx";
import { Roboto } from "next/font/google";
import Image from "next/image";
import { MessageContainer, MessageUiKit } from "./message";
import { SendMessageIcon } from "./icon/send-message-icon";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "700", "900"],
});

const chatIdIsChoosen = (chatId) => {
  return chatId > 0;
};

export function Chat({ chatId }) {
  const chat = {
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
  };
  return (
    <div className="grow">
      <ChatHeader chat={chat} chatId={chatId} />
      {chatIdIsChoosen(chatId) ? (
        <ChatBody chatId={chat.id} currentUserId={1} />
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

function ChatHeader({ chat, chatId }) {
  return (
    <div className="h-[90px] px-11 py-4 bg-white">
      {chatIdIsChoosen(chatId) && (
        <div className="flex gap-5 items-center">
          <Image
            src={chat.user.imageResourceId}
            width={56}
            height={56}
            className="w-14 h-14 rounded-full"
          />
          <div className={clsx(roboto.className, "text-[#262626] text-[20px]")}>
            {chat.user.fullName}
          </div>
        </div>
      )}
    </div>
  );
}

function ChatBody({ chatId, currentUserId }) {
  const messages = [
    {
      id: 1,
      authorId: 1,
      text: "Hey Askar, how's it going?",
      date: 1741712429000,
    },
    {
      id: 2,
      authorId: 2,
      text: "Hi Amina! I'm doing well, thanks. ",
      date: 1742041204000,
    },
    {
      id: 2,
      authorId: 2,
      text: "Hi Amina! I'm doing well, thanks. ",
      date: 1742041204000,
    },
    {
      id: 2,
      authorId: 2,
      text: "Hi Amina! I'm doing well, thanks. ",
      date: 1742041204000,
    },
    {
      id: 2,
      authorId: 2,
      text: "Hi Amina! I'm doing well, thanks. ",
      date: 1742041204000,
    },
  ];
  return (
    <div className="relative bg-[#E1F6FF] min-h-screen px-8 py-[90px] space-y-5">
      {messages.map((message, index) => (
        <MessageContainer
          key={index}
          message={message}
          currentUserId={currentUserId}
        />
      ))}
      <div className="flex justify-center">
        <SendMessageContainer />
      </div>
    </div>
  );
}

function SendMessageContainer() {
  return (
    <div className="fixed flex items-center gap-4 bottom-6 w-[954px] pl-4 pr-14 py-4 bg-white rounded-[20px]">
      <input
        placeholder="Type message..."
        className="grow w-[700px] text-2xl text-[#888888] focus:outline-none"
      />
      <button className="ml-auto px-[10px] py-[10px] flex items-center gap-[2px] bg-[#00A3FF] rounded-[12px] cursor-pointer text-white font-medium text-[20px] hover:bg-[#00a2ffe1] transition-colors">
        Send <SendMessageIcon />
      </button>
    </div>
  );
}
