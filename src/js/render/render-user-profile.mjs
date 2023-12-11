import {
  renderAvatar,
  renderProfileDetails,
  renderSectionHeader,
} from './profile-render.mjs';
import { renderEditAvatarButton } from './avatar-editing.mjs';
import {
  populateListings,
  populateWins,
  populateBids,
} from './profile-render.mjs';
import { createListingCard } from './listings-render.mjs';
import { createBidCard } from './profile-bid-card.mjs';

export function renderUserProfile(
  userProfile,
  userListings,
  userWins,
  userBids
) {
  // Render user profile details
  renderAvatar(userProfile.avatar);
  renderProfileDetails(userProfile);
  renderEditAvatarButton();

  //Render listings and headers with category

  renderSectionHeader('listingsContainer', 'My listings');
  populateListings(userListings, 'listingsContent', createListingCard, false);

  renderSectionHeader('bidsContainer', 'My bids');
  populateBids(userBids, 'bidsContent', createBidCard, false);

  renderSectionHeader('winsContainer', 'My wins');
  populateWins(userWins, 'winsContent', createListingCard, false);
}
