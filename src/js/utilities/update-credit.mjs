import { getUserInfo } from '../storage/storage.mjs';
import { getUserProfile } from '../api/profile/user-profile-API.mjs';

/**
 * Updates the content of user display element.
 *
 * @param {HTMLElement} userDisplayElement - The DOM element where user information will be displayed.
 * @param {string} content - The content to be displayed in the userDisplayElement.
 */
function updateUserDisplay(userDisplayElement, content) {
  if (userDisplayElement) {
    userDisplayElement.innerHTML = content;
  }
}

/**
 * Fetches and updates the user's credit information in the UI. It checks for user information and updates user credit display elements.
 * It requires elements with IDs 'userDisplaySmall' and 'userDisplayLarge' to be present in the DOM.
 */
export async function updateUserCredits() {
  const userInfo = getUserInfo();
  let displayContent;

  if (userInfo) {
    const userProfile = await getUserProfile(userInfo.name);
    displayContent = `${userInfo.name} <span class="material-symbols-outlined align-middle ps-2 pb-1">
      universal_currency_alt
      </span> ${userProfile.credits}`;
  } else {
    displayContent = '';
  }

  updateUserDisplay(
    document.getElementById('userDisplaySmall'),
    displayContent
  );
  updateUserDisplay(
    document.getElementById('userDisplayLarge'),
    displayContent
  );
}
