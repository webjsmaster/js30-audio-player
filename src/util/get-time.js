export default function getTimeCodeFromNum(num) {
  let seconds = parseInt(num, 10);
  let minutes = parseInt(seconds / 60, 10);
  seconds -= minutes * 60;
  const hours = parseInt(minutes / 60, 10);
  minutes -= hours * 60;

  if (hours === 0) {
    return `${minutes}:${String(seconds % 60)
      .padStart(2, 0)}`;
  }
  return `${String(hours)
    .padStart(2, 0)}:${minutes}:${String(seconds % 60)
    .padStart(2, 0)}`;
}
