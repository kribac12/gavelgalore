import '../userstate-display/logged-in-visible.mjs';
import { setUpLogoutLink } from '../api/authenticate/logout.mjs';
import { getUserInfo } from '../storage/storage.mjs';
import { displayError } from '../utilities/messages/error-handler.mjs';
import { updateUserCredits } from '../utilities/update-credit.mjs';
import { setUpSearchForm } from '../setup/set-up-search.mjs';
import { fetchUserData } from '../api/profile/fetch-complete-user-profile.mjs';
import { renderUserProfile } from '../render/profile/render-user-profile.mjs';
import { setUpBackToTopButton } from '../setup/setup-back-to-top.mjs';
document.addEventListener('DOMContentLoaded', async () => {
  setUpLogoutLink();
  updateUserCredits();
  setUpSearchForm();
  try {
    // Retrieve the logged-in user's info
    const userInfo = getUserInfo();
    if (!userInfo) {
      console.error('No user info found');
      displayError(
        'User information could not be retrieved.',
        'generalErrorContainer'
      );
      return;
    }

    const { userProfile, userListings, userWins, userBids } =
      await fetchUserData(userInfo.name);
    renderUserProfile(userProfile, userListings, userWins, userBids);
  } catch (error) {
    console.error('Error loading profile page:', error);
    displayError(
      error.message || 'An error occurred while loading the profile page.',
      'generalErrorContainer'
    );
  }
  setUpBackToTopButton(); // Initialize the Back to Top button
});
