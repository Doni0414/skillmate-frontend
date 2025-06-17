import { useEffect } from "react";
import { useState } from "react";
import { addLikeByPublicationId, getCommentsByPostId, getCommentsByPublicationId, getIsLikedByPublicationId, getLikesCountByPostId, getLikesCountByPublicationId, getUserById, removeLikeByPublicationId } from "../../api";

export function usePublicationState(publication) {
    const [author, setAuthor] = useState();
    const [comments, setComments] = useState([]);
    const [likesCount, setLikesCount] = useState([]);
    const [isLiked, setIsLiked] = useState(false);

    useEffect(() => {
        if (publication) {
            getUserById(publication.creatorId)
                .then(response => {
                    setAuthor(response.data);
                })
                .catch(error => {
                    console.error("Error fetching author data:", error);
                });

            const interval = setInterval(() => {
                getCommentsByPublicationId(publication.id, 1, 10000000)
                .then(response => {
                    setComments(response.data.content);
                }).catch(error => {
                    console.error("Error fetching comments:", error);
                });

                getLikesCountByPublicationId(publication.id)
                .then(response => {
                    setLikesCount(response.data);
                }).catch(error => {
                    console.error("Error fetching likes count:", error);
                });

                getIsLikedByPublicationId(publication.id)
                .then(response => {
                    setIsLiked(response.data);
                }).catch(error => {
                    console.error("Error fetching is liked:", error);
                });
            }, 1000);
        }
    }, [publication]);

    const handleClickOnLikeButton = () => {
        if (isLiked) {
            removeLikeByPublicationId(publication.id)
            .then(response => {
                setIsLiked(false);
                setLikesCount((lastLikesCount) => lastLikesCount - 1);
            })
            .catch(error => {
                console.log("error while removing like", error);
            })
        } else {
            addLikeByPublicationId(publication.id)
            .then(response => {
                setIsLiked(true);
                setLikesCount((lastLikesCount) => lastLikesCount + 1);
            });
        }
    };

    return {
        author,
        comments,
        likesCount,
        isLiked,
        handleClickOnLikeButton
    }
}