export function getTimeRemaining(endTime) {
  const total = Date.parse(endTime) - Date.now();
  const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
  const days = Math.floor(total / (1000 * 60 * 60 * 24));

  return { total, days, hours };
}

export function formatTimeRemaining(time) {
  if (time.total <= 0) {
    return 'Auction ended';
  }
  return `${time.days} days, ${time.hours} hours left`;
}
