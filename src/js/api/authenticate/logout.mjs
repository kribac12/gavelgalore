import { displayError } from '../../utilities/messages/error-handler.mjs';

export function setUpLogoutLink() {
  const logoutLinks = document.querySelectorAll('.logoutLink');

  if (logoutLinks.length === 0) {
    console.error('Logout links not found');
    displayError(`Failed to log out. Please try again later.`);
  }

  logoutLinks.forEach((logoutLink) => {
    logoutLink.addEventListener('click', (event) => {
      event.preventDefault();

      localStorage.removeItem('userInfo');
      window.location.href = '/index.html';
    });
  });
}
