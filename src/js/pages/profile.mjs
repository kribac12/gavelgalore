import '../userstate-display/logged-in-visible.mjs';
import { setUpLogoutLink } from '../api/authenticate/logout.mjs';
import {
  getUserBids,
  getUserListings,
  getUserProfile,
  getUserWins,
} from '../api/profile/profile-fetch.mjs';
import { getUserInfo } from '../storage/storage.mjs';
import {
  populateListings,
  populateWins,
  renderProfileDetails,
  renderAvatar,
  renderSectionHeader,
  populateBids,
} from '../api/profile/profile-render.mjs';
import { createListingCard } from '../api/listings/listings-render.mjs';
import { displayError } from '../utilities/messages/error-handler.mjs';
import { createBidCard } from '../api/profile/profile-bid-card.mjs';
import { renderEditAvatarButton } from '../api/profile/avatar-editing.mjs';
import { updateUserCredits } from '../utilities/update-credit.mjs';

document.addEventListener('DOMContentLoaded', async () => {
  setUpLogoutLink();
  updateUserCredits();
  try {
    // Retrieve the logged-in user's info
    const userInfo = getUserInfo();
    if (!userInfo) {
      console.error('No user info found');
      return;
    }

    // Fetch user profile and related data
    const userProfile = await getUserProfile(userInfo.name);
    const userListings = await getUserListings(userInfo.name);
    const userWins = await getUserWins(userInfo.name);
    console.log('User wins:', userWins);
    const userBids = await getUserBids(userInfo.name);

    // Render user profile details
    renderAvatar(userProfile.avatar);
    renderProfileDetails(userProfile);
    renderEditAvatarButton();
    console.log(renderEditAvatarButton);

    //Render section headers

    renderSectionHeader('listingsContainer', 'My listings');
    renderSectionHeader('bidsContainer', 'My bids');
    renderSectionHeader('winsContainer', 'My wins');

    // Populate user's listings

    populateListings(userListings, 'listingsContent', createListingCard, false);

    // Populate user's wins
    console.log(document.getElementById('winsContent'));

    populateWins(userWins, 'winsContent', createListingCard, false);

    // populate user's bids
    populateBids(userBids, 'bidsContent', createBidCard, false);
  } catch (error) {
    console.error('Error loading profile page:', error);
    displayError();
  }
});
