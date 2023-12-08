import { getUserInfo } from '../storage/storage.mjs';
import { getUserProfile } from '../api/profile/profile-fetch.mjs';

export async function updateUserCredits() {
  const userInfo = getUserInfo();
  if (userInfo) {
    const userProfile = await getUserProfile(userInfo.name);
    console.log('Updated profile', userProfile);
    const creditsElement = document.getElementById('userCredits');
    if (creditsElement) {
      creditsElement.innerHTML = `<span class="material-symbols-outlined align-middle fs-5">
      universal_currency_alt
      </span> ${userProfile.credits}`;
    }
  } else {
    const creditsElement = document.getElementById('userCredits');
    if (creditsElement) {
      creditsElement.textContent = '';
    }
  }
}
