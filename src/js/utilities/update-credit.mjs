import { getUserInfo } from '../storage/storage.mjs';
import { getUserProfile } from '../api/profile/user-profile-API.mjs';

function updateUserDisplay(userDisplayElement, content) {
  if (userDisplayElement) {
    userDisplayElement.innerHTML = content;
  }
}
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
