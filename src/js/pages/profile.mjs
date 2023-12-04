import '../userstate-display/logged-in-visible.mjs';
import { setUpLogoutLink } from '../api/authenticate/logout.mjs';
import { getUserProfile } from '../api/profile/get-profile.mjs';
import { getUserInfo } from '../storage/storage.mjs';
import { displayError } from '../utilities/messages/error-handler.mjs';

document.addEventListener('DOMContentLoaded', async () => {
  setUpLogoutLink();

  const userInfo = getUserInfo();
  if (userInfo) {
    try {
      const userProfile = await getUserProfile(userInfo.name);
      console.log(userProfile);
    } catch (error) {
      console.error('Error fetching user profile:', error);
      displayError();
    }
  }
});
