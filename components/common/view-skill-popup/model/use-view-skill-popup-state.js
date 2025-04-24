import { useEffect, useState } from "react";
import { downloadResource } from "../../../api";
import { fetchAchievements } from "../../achievements/model/fetch-achievements";
import { fileToAchievement } from "../../achievements/model/file-to-achievement";

export function useViewSkillPopupState(skill) {
  const [downloadedAchievements, setDownloadedAchievements] = useState([]);
  
  useEffect(() => {
    if (skill) {
      fetchAchievements(fileToAchievement, downloadResource, skill.achievementIds ? skill.achievementIds : [], setDownloadedAchievements);
    }
  }, [skill]);

  return {downloadedAchievements}
}