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

  let daysText = time.days === 1 ? 'day' : 'days';
  let hoursText = time.hours === 1 ? 'hour' : 'hours';
  return `${time.days} ${daysText}, ${time.hours} ${hoursText} left`;
}
