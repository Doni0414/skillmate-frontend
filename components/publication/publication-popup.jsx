import { Modal } from "../common/modal";
import { PublicationPopupLayout } from "./ui/publication-popup-layout";
import defaultPublicationImageSrc from "../common/images/image-unavailable.png";
import defaultUserImageSrc from "../header/images/ava.png";
import { getResourceURLById } from "../api";
import { CommentInPopup } from "./ui/comment-in-popup";
import { usePublicationPopupState } from "./model/use-publication-popup-state";
import { CommentsElement } from "./ui/comments-element";
import { AddCommentInput } from "./ui/add-comment-input";

export function PublicationPopup({
  isOpen,
  author,
  publication,
  likesElement,
  comments,
  onClose,
}) {
  const { enrichedComments } = usePublicationPopupState(publication, comments);
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <PublicationPopupLayout
        imageSrc={
          publication.resourceId
            ? getResourceURLById(publication.resourceId)
            : defaultPublicationImageSrc
        }
        userImageSrc={
          author.imageResourceId
            ? getResourceURLById(author.imageResourceId)
            : defaultUserImageSrc
        }
        username={author.nickname}
        publicationDescription={publication.text}
        comments={enrichedComments.map((comment, index) => (
          <CommentInPopup
            authorImageSrc={
              comment.user.imageResourceId
                ? getResourceURLById(comment.user.imageResourceId)
                : defaultUserImageSrc
            }
            username={comment.user.nickname}
            text={comment.text}
          />
        ))}
        likesElement={likesElement}
        commentsElement={<CommentsElement comments={comments.length} />}
        addCommentContainer={<AddCommentInput publicationId={publication.id} />}
      />
    </Modal>
  );
}
