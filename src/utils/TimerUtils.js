// Format elapsed time into mm:ss
export const formatTime = (timeInSeconds) => {
  const minutes = Math.floor(timeInSeconds / 60) || 0;
  const seconds = timeInSeconds % 60 || 0;
  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
    2,
    "0"
  )}`;
};
