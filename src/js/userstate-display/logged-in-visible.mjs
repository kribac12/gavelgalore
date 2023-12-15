import { getAccessToken } from '../storage/storage.mjs';

/**
 * Updates the user interface based on the login status of the user. It shows or hides elements depending on whether the user is logged in or not.
 * Elements meant to be visible when logged in should have the class 'show-when-logged-in'.
 * Elements meant to be visible when logged out should have the class 'show-when-logged-out'.
 */
export function updateUIOnLogin() {
  const token = getAccessToken();
  const isLoggedIn = Boolean(token);

  const elementsVisibleWhenLoggedIn = document.querySelectorAll(
    '.show-when-logged-in'
  );
  const elementsVisibleWhenLoggedOut = document.querySelectorAll(
    '.show-when-logged-out'
  );

  if (isLoggedIn) {
    elementsVisibleWhenLoggedIn.forEach((el) => (el.style.display = 'block'));
    elementsVisibleWhenLoggedOut.forEach((el) => (el.style.display = 'none'));
  } else {
    elementsVisibleWhenLoggedIn.forEach((el) => (el.style.display = 'none'));
    elementsVisibleWhenLoggedOut.forEach((el) => (el.style.display = 'block'));
  }
}

document.addEventListener('DOMContentLoaded', updateUIOnLogin);
