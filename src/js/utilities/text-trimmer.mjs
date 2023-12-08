export function trimText(text, maxLength) {
  if (!text) return ''; // Return an empty string if text is null or undefined
  return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
}

export function limitTags(tags, maxCount) {
  return tags.slice(0, maxCount);
}
