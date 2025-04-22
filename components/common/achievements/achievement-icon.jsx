import { DocumentIcon } from "../icons/document-icon";
import { PdfIcon } from "../icons/pdf-icon";
import { PictureIcon } from "../icons/picture-icon";

export function AchievementIcon({ fileName }) {
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
