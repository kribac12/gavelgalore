import { getUserInfo } from '../storage/storage.mjs';

export function handleActionForLoggedOutUsers(action) {
  const loginModalElement = document.getElementById(
    'universalLoginPromptModal'
  );
  if (loginModalElement && window.bootstrap) {
    const loginModal = new window.bootstrap.Modal(loginModalElement);
    const modalBody = document.getElementById('modalBody');

    if (!getUserInfo()) {
      modalBody.textContent = `Please log in or register to ${action}.`;
      loginModal.show();
    } else {
      if (action === 'sell') {
        window.location.href = '/src/html/sell-page/index.html';
      }
    }
  } else {
    console.error('Bootstrap or modal element not found');
  }
}
