export function getTimeRemaining(endTime) {
  const totalMilliseconds = Date.parse(endTime) - Date.now();
  const totalSeconds = Math.floor(totalMilliseconds / 1000);
  const minutes = Math.floor((totalSeconds / 60) % 60);
  const hours = Math.floor((totalSeconds / 3600) % 24);
  const days = Math.floor(totalSeconds / 86400);

  return { totalMilliseconds, days, hours, minutes };
}

export function formatTimeRemaining(time) {
  if (time.totalMilliseconds <= 0) {
    return 'Auction ended';
  }

  const daysText = time.days === 1 ? 'day' : 'days';
  const hoursText = time.hours === 1 ? 'hour' : 'hours';
  const minutesText = time.minutes === 1 ? 'minute' : 'minutes';

  if (time.days > 0) {
    return `${time.days} ${daysText}, ${time.hours} ${hoursText}${
      time.minutes > 0 ? `, ${time.minutes} ${minutesText}` : ''
    } left`;
  } else if (time.hours > 0) {
    return `${time.hours} ${hoursText}${
      time.minutes > 0 ? `, ${time.minutes} ${minutesText}` : ''
    } left`;
  } else {
    return `${time.minutes} ${minutesText} left`;
  }
}

export function convertToUserLocalTime(utcTimeStamp) {
  const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  return new Date(utcTimeStamp).toLocaleString('en-US', {
    timeZone: userTimeZone,
  });
}

export function getTimeRemainingFormatted(endTime) {
  const utcTimeStamp = new Date(endTime);
  const userLocalTime = convertToUserLocalTime(utcTimeStamp);

  const timeRemaining = getTimeRemaining(userLocalTime);
  return formatTimeRemaining(timeRemaining);
}
