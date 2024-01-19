export function getFormattedDate(timeString) {
  const dateObject = new Date(timeString);

  const year = dateObject.getUTCFullYear();
  const month = (dateObject.getUTCMonth() + 1).toString().padStart(2, "0");
  const day = dateObject.getUTCDate().toString().padStart(2, "0");
  const hour = dateObject.getUTCHours().toString().padStart(2, "0");
  const minute = dateObject.getUTCMinutes().toString().padStart(2, "0");

  return `${year}-${month}-${day} ${hour}:${minute}`;
}
