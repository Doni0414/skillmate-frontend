import { useEffect, useState } from "react";
import { getCommentsByPublicationId } from "../../api";

export function useCommentsState(publication) {
    const COMMENTS_PER_PAGE = 3;
    const [comments, setComments] = useState([]);
    const [currentCommentsPerPage, setCurrentCommentsPerPage] = useState(COMMENTS_PER_PAGE);
    const [commentsPage, setCommentsPage] = useState(1);

    useEffect(() => {
        const interval = setInterval(() => {
            getCommentsByPublicationId(
                publication.id,
                commentsPage,
                currentCommentsPerPage,
            ).then((response) => {
                if (response.data.content.length > 0) {
                    setComments(response.data.content);
                }
            });
        }, 1000);

        return () => {
            clearInterval(interval);
        }
    }, [publication, currentCommentsPerPage]);

    return {
        comments,
        setCurrentCommentsPerPage,
        COMMENTS_PER_PAGE
    }
}