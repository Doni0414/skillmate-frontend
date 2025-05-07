import Image from "next/image";
import notFoundImageSrc from "../components/not-found/images/not-found.png";

export default function NotFoundPage() {
  return (
    <NotFoundPageLayout
      notFoundImage={
        <Image src={notFoundImageSrc} alt="image" width={600} height={350} />
      }
    />
  );
}

function NotFoundPageLayout({ notFoundImage }) {
  return (
    <div className="w-screen h-screen flex justify-center items-center">
      {notFoundImage}
    </div>
  );
}
