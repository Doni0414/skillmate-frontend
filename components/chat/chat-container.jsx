import clsx from "clsx";
import { Roboto } from "next/font/google";
import Image from "next/image";

function computeClassNameOfChatHeader(chat) {
  return "";
}

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "700", "900"],
});

export function ChatContainer({ chat, isActive, onClick }) {
  return (
    <div
      className="px-6 py-[14px] flex gap-4 cursor-pointer"
      onClick={() => onClick(chat)}
    >
      <Image
        width={56}
        height={66}
        className="w-[56px] h-[66px] rounded-full"
        src={chat.user.imageResourceId}
        alt="ava"
      />
      <ChatUserContainer isActive={isActive} user={chat.user} />
      <MessageDateContainer message={chat.user.lastMessage} currentUserId={4} />
    </div>
  );
}

function ChatUserContainer({ isActive, user }) {
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
      <div className="w-[204px] h-10 text-[14px] text-[#5F5F5F] overflow-hidden text-ellipsis leading-4">
        {user.lastMessage.text}
      </div>
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

function MessageDateContainer({ message, currentUserId }) {
  return (
    <div className="w-[90px] flex flex-col items-end">
      <div className="text-[#A0A0A0] text-[14px] mb-2">
        {computeDateString(message.date)}
      </div>
      {!message.seen & (currentUserId != message.authorId) && (
        <div className="flex justify-center items-center bg-[#00A3FF] rounded-full w-[18px] h-[18px] text-white font-semibold text-[12px]">
          1
        </div>
      )}
    </div>
  );
}
