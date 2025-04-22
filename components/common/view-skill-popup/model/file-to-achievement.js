export function fileToAchievement(file) {
    if (file) {
      console.log(file);
      return {
        fileName: file.name ? file.name : "File",
        size: file.size ? (file.size / (1024 * 1024)).toFixed(2) + "MB" : "",
      };
    }
  };