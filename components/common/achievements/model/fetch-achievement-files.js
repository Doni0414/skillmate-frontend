export async function fetchAchievementsFiles(downloadResource, achievementIds, setDownloadedAchievements) {
    const files = await Promise.all(
      achievementIds.map(async (id) => await downloadResource(id)),
    );
    setDownloadedAchievements(files);
  }