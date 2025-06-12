import { Inter } from "next/font/google";
import { UploadImageIcon } from "./icons/upload-image-icon";
import clsx from "clsx";
import { useRef, useState } from "react";
import { FailureMessage } from "./failure-message";
import Image from "next/image";

export const inter = Inter({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export function UploadImageBox({ className, image, setImage }) {
  const [failureMessage, setFailureMessage] = useState(null);
  const imageInputRef = useRef(null);

  const handleClick = (e) => {
    e.preventDefault();
    imageInputRef.current.click();
  };

  const onImageChange = (e) => {
    console.log(e.target.files[0]);
    const file = e.target.files[0];

    if (!file) {
      return;
    }

    // expect file type to be image
    if (!file.type.startsWith("image/")) {
      setFailureMessage("Invalid file type. Please, upload only images!");
      setTimeout(() => {
        setFailureMessage(null);
      }, 5000);
    }

    setImage(file);
  };

  return (
    <div className={className}>
      <FailureMessage
        failureMessage={failureMessage}
        showMessage={failureMessage}
      />
      <button
        onClick={handleClick}
        className="flex flex-col justify-center items-center gap-4 w-[446px] h-[432px] rounded-[25px] border border-dashed border-[#B5B5B5] shadow-md cursor-pointer"
      >
        {image ? (
          <Image
            width={300}
            height={300}
            src={URL.createObjectURL(image)}
            alt="post-image"
          />
        ) : (
          <UploadImageIcon className="text-[#B5B5B5] w-[100px] h-[100px]" />
        )}
        <div className={clsx(inter.className, "text-[20px]")}>
          Browse your image
        </div>
      </button>
      <input
        onChange={onImageChange}
        className="hidden"
        accept="image/*"
        type="file"
        ref={imageInputRef}
      />
    </div>
  );
}
