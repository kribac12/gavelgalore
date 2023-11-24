import { getUserInfo } from '../storage/storage.mjs';

export function updateUIOnLogin() {
  const userInfo = getUserInfo();
  const isLoggedIn = Boolean(userInfo?.token);

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
