import { useEffect, useRef, useState } from "react";
import { searchSkills } from "../../api";

export function useSuggestedSkillsState(skillName, setSkillName) {
    const [suggestedSkills, setSuggestedSkills] = useState([]);

    const [isSuggestedSkillsOpen, setIsSuggestedSkillsOpen] = useState(false);

    const onSearchFocus = () => {
        console.log("focus");
        setIsSuggestedSkillsOpen(true);
    }

    const onSearchUnFocus = () => {
        console.log("unfocus");
        setIsSuggestedSkillsOpen(false);
    }

    useEffect(() => {
        if (isSuggestedSkillsOpen) {
            const timeout = setTimeout(() => {
                searchSkills({ q: skillName, limit: 4 })
                .then((response) => {
                    setSuggestedSkills(response.data.data);
                });
            }, 200);
    
            return () => {
                clearTimeout(timeout);
            }
        }
    }, [skillName]);

    const handleClickOnSuggestedSkill = (e, skillName) => {
        e.preventDefault();
        setSkillName(skillName);
        setIsSuggestedSkillsOpen(false);
    }

    const onSearchChange = () => {
        setIsSuggestedSkillsOpen(true);
    }

    return {suggestedSkills, onSearchFocus, onSearchUnFocus, isSuggestedSkillsOpen, handleClickOnSuggestedSkill, onSearchChange};
}