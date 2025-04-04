import { useEffect, useState } from "react";
import { getResourceURLById, getUserById } from "../api";
import Image from "next/image";
import clsx from "clsx";
import { firaSans, mulish, roboto } from "../fonts";

export function Publications({ publications, user }) {
  return (
    <div className="space-y-[116px]">
      {publications.map((publication, key) => (
        <Publication publication={publication} key={key} user={user} />
      ))}
    </div>
  );
}

function Publication({ publication, user }) {
  const [author, setAuthor] = useState({});

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const fetchedAuthor = await getUserById(publication.creatorId);
    setAuthor(fetchedAuthor.data);
  };

  return (
    <div className="px-5 py-5 rounded-[33px] bg-[#F7F7F7] shadow-2xl">
      <PublicationAuthorContainer author={author} />
      <Image
        width={483}
        height={295}
        src={getResourceURLById(publication.resourceId)}
        alt="publication-image"
        className="mb-[14px]"
      />
      <Categories className="mb-3" categories={publication.categories} />
      <PublicationDescription author={author} description={publication.text} />
    </div>
  );
}

function PublicationAuthorContainer({ author }) {
  return (
    <div className="flex items-center gap-6 mb-[30px]">
      <Image
        width={40}
        height={40}
        src={getResourceURLById(author.imageResourceId)}
        alt="avatar"
      />
      <div className={clsx(mulish.className, "font-bold")}>
        <div className="text-[17px]">{author.fullName}</div>
        <div className="text-[#878D98] text-[14px]">
          {author.country}, {author.city}
        </div>
      </div>
    </div>
  );
}

function Categories({ categories, className }) {
  return (
    <div
      className={clsx(className, roboto.className, "flex flex-wrap gap-[25px]")}
    >
      {categories.map((category, key) => (
        <Category category={category} key={key} />
      ))}
    </div>
  );
}

function Category({ category }) {
  return (
    <div className="px-4 py-2 rounded-[8px] font-semibold text-[13px] bg-[#EFEFEF]">
      {category}
    </div>
  );
}

function PublicationDescription({ author, description }) {
  const desc =
    "Recently, I have started learning english! Wish me your bests! Recently, I have started learning english! Wish me your bests! Recently, I have started learning english! Wish me your bests!";
  return (
    <div className="flex gap-1">
      {/* <div className={clsx("font-bold text-[17px]", mulish.className)}>
        {author.fullName}
      </div> */}
      <div
        className={clsx("w-[483px] text-[15px] text-wrap", firaSans.className)}
      >
        {desc}
      </div>
    </div>
  );
}
