/**
 * Calculates the time remaining until a specified end time.
 *
 * @param {string} endTime - The end time in a format recognizable by Date.parse().
 * @returns {Object} - An object containing the total milliseconds remaining and the breakdown in days, hours, and minutes.
 */

export function getTimeRemaining(endTime) {
  const totalMilliseconds = Date.parse(endTime) - Date.now();
  const totalSeconds = Math.floor(totalMilliseconds / 1000);
  const minutes = Math.floor((totalSeconds / 60) % 60);
  const hours = Math.floor((totalSeconds / 3600) % 24);
  const days = Math.floor(totalSeconds / 86400);

  return { totalMilliseconds, days, hours, minutes };
}

/**
 * Formats the remaining time into a readable string.
 *
 * @param {Object} time - An object containing the time remaining with properties totalMilliseconds, days, hours, and minutes.
 * @returns {string} - A formatted string representing the time remaining or a message if the auction has ended.
 */

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

/**
 * Converts a UTC timestamp to the user's local time zone.
 *
 * @param {string} utcTimeStamp - The UTC timestamp to be converted.
 * @returns {string} A string representing the local time.
 */

export function convertToUserLocalTime(utcTimeStamp) {
  const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  return new Date(utcTimeStamp).toLocaleString('en-US', {
    timeZone: userTimeZone,
  });
}

/**
 * Formats the time remaining from a given end time in UTC to a user-friendly string in local time.
 *
 * @param {string} endTime - The end time in UTC format.
 * @returns {string} - A formatted string showing the time remaining until the end time.
 */

export function getTimeRemainingFormatted(endTime) {
  const utcTimeStamp = new Date(endTime);
  const userLocalTime = convertToUserLocalTime(utcTimeStamp);

  const timeRemaining = getTimeRemaining(userLocalTime);
  return formatTimeRemaining(timeRemaining);
}
