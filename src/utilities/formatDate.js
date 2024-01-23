export const formatDate = () => {
  const today = new Date();
  const seconds = today.getSeconds().toString().padStart(2, '0');
  const minutes = today.getMinutes().toString().padStart(2, '0');
  const hours = today.getHours().toString().padStart(2, '0');
  const day = today.getDate().toString().padStart(2, '0');
  const month = (today.getMonth() + 1).toString().padStart(2, '0');
  const year = today.getFullYear();

  return `${seconds}-${minutes}-${hours}-${day}-${month}-${year}`;
};