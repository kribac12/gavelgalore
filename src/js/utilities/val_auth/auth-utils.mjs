import { showValidationError } from '../messages/error-handler.mjs';

export function validateEmail(email) {
  if (!email) {
    return 'Email must not be empty.';
  }
  if (!email.endsWith('noroff.no') && !email.endsWith('stud.noroff.no')) {
    return 'Email must end with "noroff.no" or "stud.noroff.no"';
  }
  return '';
}

export function validatePassword(password) {
  if (!password) {
    return 'Password must not be empty.';
  }
  if (password.length < 8) {
    return 'Password must be at least 8 characters.';
  }
  return '';
}

export function validateUsername(username) {
  const validUsernameRegex = /^[A-Za-z0-9_]+$/;
  if (!validUsernameRegex.test(username)) {
    return 'Username must only contain letters, numbers, and underscores.';
  }
  return '';
}

export function validateAvatarUrl(avatarUrl) {
  const validAvatarUrlRegex = /^https?:\/\/.*\.(jpg|jpeg|png|gif)$/i;
  if (avatarUrl && !validAvatarUrlRegex.test(avatarUrl)) {
    return 'Avatar URL must be a valid image URL.';
  }
  return '';
}

export function validateField(inputElement, validationFunction) {
  const error = validationFunction(inputElement.value);
  const errorElement = document.getElementById(inputElement.id + 'Error');

  if (error) {
    showValidationError(inputElement, error);
  } else {
    inputElement.classList.remove('is-invalid');
    if (errorElement) {
      errorElement.style.display = 'none'; // Directly hide the error message
    }
  }
}
