export const extractDate = (inputDate) => {
  if (inputDate.length < 19) {
    // Handle cases where the input string is shorter than 9 characters
    return inputDate;
  } else {
    // Use slice to extract the last 9 characters
    return inputDate.slice(-19);
  }
};
