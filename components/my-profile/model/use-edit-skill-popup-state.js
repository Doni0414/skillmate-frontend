import { useEffect, useState } from "react";
import { downloadResource } from "../../api";
import { fileToAchievement } from "../../common/achievements/model/file-to-achievement";
import { fetchAchievements } from "../../common/achievements/model/fetch-achievements";

export function useEditSkillPopupState(skill) {
    const [downloadedAchievements, setDownloadedAchievements] = useState([]);
      
    useEffect(() => {
    if (skill) {
        fetchAchievements(fileToAchievement, downloadResource, skill.achievementIds ? skill.achievementIds : [], setDownloadedAchievements);
    }
    }, [skill]);

    return {downloadedAchievements}
}