export function validateInputs(email, password) {
  // Check if email and password are not empty
  if (!email || !password) {
    return 'Email and password must not be empty.';
  }

  // Check if password is at least 8 characters long
  if (password.length < 8) {
    return 'Password must be at least 8 characters long.';
  }

  // Check if email ends with 'noroff.no' or 'stud.noroff.no'
  if (!email.endsWith('noroff.no') && !email.endsWith('stud.noroff.no')) {
    return 'Email must end with "Noroff.no" or "stud.noroff.no"';
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
