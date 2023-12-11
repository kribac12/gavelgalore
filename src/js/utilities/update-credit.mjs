import { getUserInfo } from '../storage/storage.mjs';
import { getUserProfile } from '../api/profile/user-profile-API.mjs';

export async function updateUserCredits() {
  const userInfo = getUserInfo();
  if (userInfo) {
    const userProfile = await getUserProfile(userInfo.name);
    const userDisplayElement = document.getElementById('userDisplay');
    if (userDisplayElement) {
      userDisplayElement.innerHTML = `${userInfo.name} <span class="material-symbols-outlined align-middle ps-2 pb-1">
      universal_currency_alt
      </span> ${userProfile.credits}`;
    }
  } else {
    const userDisplayElement = document.getElementById('userDisplay');
    if (userDisplayElement) {
      userDisplayElement.textContent = 'Credits: 0';
    }
  }
}
