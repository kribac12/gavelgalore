import { displayError } from '../../utilities/messages/error-handler.mjs';

export function setUpLogoutLink() {
  const logoutLink = document.querySelector('.logoutLink');

  if (logoutLink) {
    logoutLink.addEventListener('click', (event) => {
      event.preventDefault();

      localStorage.removeItem('userInfo');
      window.location.href = '/index.html';
    });
  } else {
    console.error('Logout link not found');
    displayError(`Failed to log out. Please try again later.`);
  }
}
