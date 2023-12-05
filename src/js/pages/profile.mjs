import '../userstate-display/logged-in-visible.mjs';
import { setUpLogoutLink } from '../api/authenticate/logout.mjs';
import {
  getUserListings,
  getUserProfile,
  getUserWins,
  getUserBids,
} from '../api/profile/profile-fetch.mjs';
import { getUserInfo } from '../storage/storage.mjs';
import {
  populateListings,
  renderProfileDetails,
  renderAvatar,
  renderEditAvatarButton,
  renderSectionHeader,
} from '../api/profile/profile-render.mjs';
import { createListingCard } from '../api/listings/listings-render.mjs';
import { displayError } from '../utilities/messages/error-handler.mjs';

document.addEventListener('DOMContentLoaded', async () => {
  setUpLogoutLink();
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
    const userBids = await getUserBids(userInfo.name);

    // Render user profile details
    renderAvatar(userProfile.avatar);
    renderProfileDetails(userProfile);
    renderEditAvatarButton();

    //Render section headers

    renderSectionHeader('listingsContainer', 'My listings');
    renderSectionHeader('winsContainer', 'My wins');
    renderSectionHeader('bidsContainer', 'My bids');

    // Populate user's listings, bids, and wins
    populateListings(userListings, 'listingsContent', createListingCard, false);
    populateListings(userWins, 'winsContent', createListingCard, false);
    populateListings(
      userBids.map((bid) => bid.listing),
      'bidsContent',
      createListingCard,
      false
    ); // Map bids to their respective listings
  } catch (error) {
    console.error('Error loading profile page:', error);
    displayError();
  }
});
