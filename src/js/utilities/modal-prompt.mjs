import { getUserInfo } from '../storage/storage.mjs';

/**
 * Shows a modal prompt for logged-out users trying to perform a specific action,
 * like 'sell', and prevents the default action (like navigation).
 * Allows the action to proceed normally for logged-in users.
 *
 * @param {string} action - The action the user is trying to perform.
 * @param {Event} event - The event object from the click event.
 */
export function handleActionForLoggedOutUsers(action, event) {
  const userInfo = getUserInfo();

  // Check if the user is logged out
  if (!userInfo) {
    const loginModalElement = document.getElementById(
      'universalLoginPromptModal'
    );
    if (loginModalElement && window.bootstrap) {
      const loginModal = new window.bootstrap.Modal(loginModalElement);
      const modalBody = document.getElementById('modalBody');

      // Set the message in the modal and show it
      modalBody.textContent = `Please log in or register to ${action}.`;
      loginModal.show();
    } else {
      console.error('Bootstrap or modal element not found');
    }

    // Prevent the default action for logged-out users
    event.preventDefault();
  }
  // If the user is logged in, the default action will proceed
}
