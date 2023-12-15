export function validateDate(dateString) {
  const inputDate = new Date(dateString);
  const currentDate = new Date();

  if (isNaN(inputDate.getTime())) {
    return 'Invalid date format.';
  } else if (inputDate < currentDate) {
    return 'Date must be in the future.';
  }
  return ''; // Returns an empty string if there are no errors
}
