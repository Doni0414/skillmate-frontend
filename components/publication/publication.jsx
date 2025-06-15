import Image from "next/image";
import { PublicationHeaderLayout } from "./ui/publication-header-layout";
import { PublicationLayout } from "./ui/publication-layout";
import { getResourceURLById } from "../api";
import { usePublicationState } from "./model/use-publication-state";
import { LikesElement } from "./ui/likes-element";
import { CommentsElement } from "./ui/comments-element";
import { CategoryLayout } from "./ui/category-layout";
import defaultAvaSrc from "../header/images/ava.png";
import defaultPublicationImageSrc from "../common/images/image-unavailable.png";

export function Publication({ publication }) {
  const { author, comments, likesCount, isLiked, handleClickOnLikeButton } =
    usePublicationState(publication);
  if (!author) return null;
  return (
    <PublicationLayout
      header={
        <PublicationHeaderLayout
          profileImage={
            <Image
              src={
                author.imageResourceId
                  ? getResourceURLById(author.imageResourceId)
                  : defaultAvaSrc
              }
              alt="ava"
              width={35}
              height={35}
              className="w-[35px] h-[35px] rounded-full"
            />
          }
          name={author.fullName}
          city={author.city}
          country={author.country}
        />
      }
      picture={
        <Image
          alt="publication-pic"
          src={
            publication.resourceId
              ? getResourceURLById(publication.resourceId)
              : defaultPublicationImageSrc
          }
          width={341}
          height={233}
          className="object-fit w-[341px] h-[233px]"
        />
      }
      likesElement={
        <LikesElement
          likes={likesCount}
          isLiked={isLiked}
          handleClick={handleClickOnLikeButton}
        />
      }
      commentsElement={<CommentsElement comments={comments.length} />}
      categories={publication.categories.map((category) => (
        <CategoryLayout category={category} />
      ))}
      description={publication.text}
    />
  );
}
