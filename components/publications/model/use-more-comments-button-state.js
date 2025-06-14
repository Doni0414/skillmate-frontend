export function useMoreCommentsButtonState(setCurrentCommentsPerPage, COMMENTS_PER_PAGE) {
    const handleClickOnMoreCommentsButton = () => {
        setCurrentCommentsPerPage((lastCommentsPerPage) => lastCommentsPerPage + COMMENTS_PER_PAGE);
    }

    return {
        handleClickOnMoreCommentsButton
    }
}