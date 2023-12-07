export function trimText(text, maxLength) {
  return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
}

export function limitTags(tags, maxCount) {
  return tags.slice(0, maxCount);
}
