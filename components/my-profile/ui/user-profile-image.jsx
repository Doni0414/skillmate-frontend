import Image from "next/image";
import {UserAccountIcon} from "../../common/icons/user-account-icon";

export function UserProfileImage({ imageResourceURL }) {
  return imageResourceURL ? (
    <Image
      width={80}
      height={80}
      className="rounded-full w-20 h-20"
      src={imageResourceURL}
      alt="profile-image"
    />
  ) : (
    <UserAccountIcon className="w-20 h-20" />
  );
}
