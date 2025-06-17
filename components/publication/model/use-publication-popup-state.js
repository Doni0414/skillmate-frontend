import { useEffect, useState } from "react";
import { getUserById } from "../../api";

export function usePublicationPopupState(publication, comments) {
    const [enrichedComments, setEnrichedComments] = useState([]);

    useEffect(() => {
        if (comments && comments.length > 0) {
            fetchData();
        }
    }, [comments]);

    const fetchData = async () => {
        const enrichedComms = []
        for (let comment of comments) {
            enrichedComms.push({
                ...comment,
                user: (await getUserById(comment.userId)).data
            });
        }

        setEnrichedComments(enrichedComms);
    }

    return {
        enrichedComments
    }
}