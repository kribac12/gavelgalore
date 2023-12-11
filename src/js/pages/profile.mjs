import '../userstate-display/logged-in-visible.mjs';
import { setUpLogoutLink } from '../api/authenticate/logout.mjs';
import { getUserInfo } from '../storage/storage.mjs';
import { displayError } from '../utilities/messages/error-handler.mjs';
import { updateUserCredits } from '../utilities/update-credit.mjs';
import { setUpSearchForm } from '../setup/set-up-search.mjs';
import { fetchUserData } from '../api/profile/fetch-complete-user-profile.mjs';
import { renderUserProfile } from '../render/render-user-profile.mjs';

document.addEventListener('DOMContentLoaded', async () => {
  setUpLogoutLink();
  updateUserCredits();
  setUpSearchForm();
  try {
    // Retrieve the logged-in user's info
    const userInfo = getUserInfo();
    if (!userInfo) {
      console.error('No user info found');
      return;
    }

    const { userProfile, userListings, userWins, userBids } =
      await fetchUserData(userInfo.name);
    renderUserProfile(userProfile, userListings, userWins, userBids);
  } catch (error) {
    console.error('Error loading profile page:', error);
    displayError();
  }
});
