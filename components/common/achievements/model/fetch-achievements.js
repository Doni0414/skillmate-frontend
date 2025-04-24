export async function fetchAchievements(fileToAchievement, downloadResource, achievementIds, setDownloadedAchievements) {
    const files = await Promise.all(
      achievementIds.map(async (id) => ({
        ...fileToAchievement(await downloadResource(id)),
        id,
      })),
    );
    setDownloadedAchievements(files);
  }