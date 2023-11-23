import { getUserInfo } from '../storage/storage.mjs';

export function updateUIOnLogin() {
  const userInfo = getUserInfo();
  const isLoggedIn = userInfo && userInfo.token;
  const elementsVisibleWhenLoggedIn = document.querySelectorAll(
    '.show-when-logged-in'
  );
  const elementsVisibleWhenLoggedOut = document.querySelectorAll(
    '.show-when-logged-out'
  );

  elementsVisibleWhenLoggedOut.forEach((el) => {
    el.style.display = isLoggedIn ? 'none' : 'block';
  });
  elementsVisibleWhenLoggedIn.forEach((el) => {
    el.style.display = isLoggedIn ? 'block' : 'none';
  });
}

document.addEventListener('DOMContentLoaded', updateUIOnLogin);
