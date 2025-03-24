import clsx from "clsx";
import { Fira_Sans } from "next/font/google";
import { RESOURCES_PREFIX } from "../my-profile/use-my-profile-state";
import { PdfIcon } from "./icons/pdf-icon";
import { DocumentIcon } from "./icons/document-icon";
import { PictureIcon } from "./icons/picture-icon";
import { useEffect, useState } from "react";

const firaSans = Fira_Sans({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});
export function ViewSkillPopup({
  skill,
  className,
  downloadResource,
  fileToAchievement,
}) {
  async function downloadResourceInner(resourceId) {
    try {
      // Fetch the file from the backend
      const response = await fetch(
        `http://localhost:8080/api/resources/${resourceId}`,
      );
      if (!response.ok)
        throw new Error(`HTTP error! Status: ${response.status}`);

      // Try extracting filename from Content-Disposition header
      const disposition = response.headers.get("Content-Disposition");
      let fileName = `resource_${resourceId}.bin`; // Default filename

      if (disposition && disposition.includes("filename=")) {
        fileName = disposition.split("filename=")[1].replace(/['"]/g, "");
      }

      const blob = await response.blob(); // Convert response to Blob
      return new File([blob], fileName, { type: blob.type }); // Create a File object
    } catch (error) {
      console.error("Error downloading resource:", error);
      return null;
    }
  }

  const fileToAchievementInner = (file) => {
    if (file) {
      return {
        fileName: file.name ? file.name : "File",
        size: file.size ? (file.size / (1024 * 1024)).toFixed(2) + "MB" : "",
      };
    }
  };

  return (
    <div className="px-[52px] py-16 bg-[#FFF4D1] border border-[#FFC107] rounded-[20px]">
      <div
        className={clsx(
          firaSans.className,
          "m-auto mb-[71px] w-fit text-[29px] text-black/70 font-semibold ",
        )}
      >
        {skill.name}
      </div>

      <div className="mb-10 w-[609px] px-5 py-[15px] rounded-[7px] bg-[#F2F4F7] text-[17px] text-black/60 font-medium">
        {skill.description}
      </div>

      <div className="mb-10 w-fit px-[9px] py-4 rounded-[7px] bg-[#F2F4F7] text-[17px] text-black/60 font-medium">
        Level: {skill.level}
      </div>

      <AchievementsList
        achievements={skill.achievements}
        achievementIds={skill.achievementIds}
        downloadResource={downloadResource}
        fileToAchievement={fileToAchievement}
      />
    </div>
  );
}

function AchievementsList({
  achievements,
  isEditable,
  className,
  handleDeleteAchievement,
  achievementIds,
  downloadResource,
  fileToAchievement,
}) {
  const [downloadedAchievements, setDownloadedAchievements] = useState([]);

  useEffect(() => {
    if (achievementIds) {
      async function fetchAchievements() {
        const files = await Promise.all(
          achievementIds.map(async (id) => ({
            ...fileToAchievement(await downloadResource(id)),
            id,
          })),
        );
        setDownloadedAchievements(files);
      }

      fetchAchievements();
    }
  }, [achievementIds]);
  return (
    <div className={className}>
      <div
        className={clsx(
          firaSans.className,
          "mb-7 font-medium text-[20px] text-black/70",
        )}
      >
        Achievements:
      </div>

      {(!achievements || achievements.length == 0) &&
      (!achievementIds || achievementIds.length === 0) ? (
        <div className="text-[16px] text-black/70">No achievements</div>
      ) : (
        <div className="space-y-[5px]">
          {achievementIds &&
            downloadedAchievements.map((achievement, index) => (
              <AchievementCard key={index} achievement={achievement} />
            ))}
          {achievements &&
            achievements.map((achievement, index) =>
              isEditable ? (
                <DeletableAchievementCard
                  index={index}
                  key={index}
                  achievement={achievement}
                  handleDeleteAchievement={handleDeleteAchievement}
                />
              ) : (
                <AchievementCard key={index} achievement={achievement} />
              ),
            )}
        </div>
      )}
    </div>
  );
}

function AchievementCard({ id, achievement }) {
  return (
    <div
      className={clsx(
        firaSans.className,
        "flex items-center gap-4 w-fit pl-4 pr-6 py-3 rounded-[8px] bg-[#F2F4F7]",
      )}
    >
      <AchievementIcon fileName={achievement.fileName} />
      <div className="w-[150px] text-[16px] text-[#4B4B4B] text-ellipsis whitespace-nowrap overflow-hidden">
        {achievement.fileName}
      </div>

      {achievement.id && (
        <div className="flex items-center gap-2">
          <div className="w-[3px] h-[3px] rounded-full bg-[#767676]"></div>
          <a
            href={RESOURCES_PREFIX + achievement.id}
            className="text-[14px] text-[#005FAD]"
          >
            Download
          </a>
        </div>
      )}

      <div className="text-black/70 text-[14px]">{achievement.size}</div>
    </div>
  );
}

function DeletableAchievementCard({
  index,
  achievement,
  handleDeleteAchievement,
}) {
  return (
    <div className="flex items-center gap-4">
      <AchievementCard achievement={achievement} />
      <button
        className="text-gray-500 hover:text-black cursor-pointer"
        onClick={(e) => handleDeleteAchievement(e, index)}
      >
        ✖
      </button>
    </div>
  );
}

function AchievementIcon({ fileName }) {
  const isDoc = (fileName) => {
    return fileName.endsWith(".doc") || fileName.endsWith(".docx");
  };

  const isPdf = (fileName) => {
    return fileName.endsWith(".pdf");
  };

  if (isDoc(fileName)) {
    return <DocumentIcon className="text-[#005FAD]" />;
  } else if (isPdf(fileName)) {
    return <PdfIcon className="text-[#005FAD]" />;
  }

  return <PictureIcon className="text-[#005FAD]" />;
}
