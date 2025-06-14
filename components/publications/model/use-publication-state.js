import { useEffect, useRef, useState } from "react";
import { getCommentsByPublicationId, getUserById } from "../../api";

export function usePublicationState(publication, user) {
    const [author, setAuthor] = useState({});
    const publicationRef = useRef(null);
    
      useEffect(() => {
        fetchData();
      }, [publication]);
    
      const fetchData = async () => {
        const fetchedAuthor = await getUserById(publication.creatorId);
        setAuthor(fetchedAuthor.data);
      };

    return {
        author,
        setAuthor,
        publicationRef
    }
}