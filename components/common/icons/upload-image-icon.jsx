import Image from "next/image";
import uploadImageSrc from "../images/upload-image-vector.png";

export function UploadImageIcon({ className }) {
  return (
    <Image
      width={100}
      height={100}
      src={uploadImageSrc}
      className={className}
      alt="upload-image-icon"
    />
  );
}
