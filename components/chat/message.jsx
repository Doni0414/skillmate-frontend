import clsx from "clsx";
import { Inter, Roboto } from "next/font/google";
import Image from "next/image";
import { computeDateString } from "./chat-container";

export const inter = Inter({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "700", "900"],
});

export function MessageContainer({ message, currentUserId }) {
  const isOwnMessage = (currentUserId, messageAuthorId) => {
    return currentUserId === messageAuthorId ? "own" : "another";
  };

  const messageType = isOwnMessage(currentUserId, message.authorId);

  const dateString = computeDateString(message.date);

  const containerClassName = messageType === "own" ? "justify-end" : "";

  const messageClassName = clsx(
    "relative -top-[5px]",
    messageType === "own" && "right-14",
    messageType === "another" && "left-14",
  );
  return (
    <div className={clsx("flex", containerClassName)}>
      <div>
        <div className={clsx("flex gap-12 items-center", containerClassName)}>
          {messageType === "own" && (
            <div className="text-[#A0A0A0] text-[12px]">{dateString}</div>
          )}
          <ProfileContainer
            profileType={messageType}
            userId={message.authorId}
          />
          {messageType === "another" && (
            <div className="text-[#A0A0A0] text-[12px]">{dateString}</div>
          )}
        </div>
        <MessageUiKit
          messageType={messageType}
          text={message.text}
          className={messageClassName}
        />
      </div>
    </div>
  );
}

function ProfileContainer({ profileType, userId, className }) {
  const user = {
    fullName: "Askar",
    imageResourceId:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRGxQwzkOhOPos_EQVdm6ElGi1iCpXiq4ZMiw&s",
  };
  const nameContainerClassName = clsx(
    {
      own: clsx("font-medium text-[#515151] text-[16px] ", inter.className),
      another: clsx("text-[20px] text-[#262626]", roboto.className),
    }[profileType],
  );

  return (
    <div className={clsx("flex items-center gap-2", className)}>
      {profileType === "own" && (
        <div className={nameContainerClassName}>{user.fullName}</div>
      )}
      <Image
        width={48}
        height={48}
        src={user.imageResourceId}
        alt="profile"
        className="w-12 h-12 rounded-full"
      />
      {profileType === "another" && (
        <div className={nameContainerClassName}>{user.fullName}</div>
      )}
    </div>
  );
}

/**
 *
 * @param {{
 * messageType: 'own' | 'another',
 * text: string
 * }} props
 */
function MessageUiKit({ messageType, text, className }) {
  const uiKitStyles = {
    own: "bg-[#00A3FF] text-white rounded-tr-[1px]",
    another: "bg-white text-[#515151] rounded-tl-[1px]",
  };
  const computedClassName = clsx(
    "px-6 py-4 w-fit max-w-[500px] text-[18px] rounded-[14px]",
    className,
    inter.className,
    uiKitStyles[messageType],
  );

  return <div className={computedClassName}>{text}</div>;
}
