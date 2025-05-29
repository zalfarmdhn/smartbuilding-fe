export function formatDate(date: string | Date) {
  const inputDate = new Date(date);
  const today = new Date();
  
  const isToday = inputDate.toDateString() === today.toDateString();
  
  if (isToday) {
    return inputDate.toLocaleTimeString("ID", {
      hour: "2-digit",
      minute: "2-digit"
    });
  }
  
  return inputDate.toLocaleDateString("ID", {
    day: "numeric",
    month: "long",
    year: "numeric"
  });
}

export function returnFullDate(date: string | Date) {
  const inputDate = new Date(date);
  const day = inputDate.getDate();
  const month = inputDate.toLocaleString("id-ID", { month: "long" });
  const year = inputDate.getFullYear();

  return `${day} ${month} ${year}`;
}