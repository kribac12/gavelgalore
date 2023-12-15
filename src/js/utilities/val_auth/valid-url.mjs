/**
 * Checks if a given string is valid URL.
 *
 * @param {string} string - String to validate.
 * @returns {boolean} - true if it is valid URL, false otherwise.
 */
export function isValidUrl(string) {
  try {
    new URL(string);
    return true;
  } catch (_) {
    return false;
  }
}
