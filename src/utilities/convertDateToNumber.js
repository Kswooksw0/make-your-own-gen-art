export const convertDateToNumber = (fileName) => {
  let dateString;

  if (fileName.length < 19) {
    // Handle cases where the input string is shorter than 9 characters
    return fileName;
  } else {
    // Use slice to extract the last 9 characters
    dateString = fileName.slice(-19);
  }
  
  const [sec, min, hour, day, month, year] = dateString.split("-").map(Number);

  const date = new Date(Date.UTC(year, month - 1, day, hour, min, sec));

  const millisecondsSinceEpoch = date.getTime();

  return millisecondsSinceEpoch;
};
