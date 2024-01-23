export const convertToMegabytes = (bytes) => {
  if (typeof bytes !== "number" || isNaN(bytes) || bytes <= 0) {
    return "Invalid input";
  }
  const megabytes = (bytes / (1024 * 1024)).toFixed(2); // Convert to MB with 2 decimal places
  return `${megabytes}MB`;
};
