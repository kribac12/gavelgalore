import '../userstate-display/logged-in-visible.mjs';
import { setUpLogoutLink } from '../api/authenticate/logout.mjs';
import { getListingById } from '../api/listings/listings-service.mjs';
import { renderListingDetail } from '../api/listings/listing-detail-render.mjs';
import { displayError } from '../utilities/messages/error-handler.mjs';
import { updateUserCredits } from '../utilities/update-credit.mjs';

async function loadListing() {
  const urlParams = new URLSearchParams(window.location.search);
  const listingId = urlParams.get('id');
  if (listingId) {
    try {
      const listing = await getListingById(listingId);

      renderListingDetail(listing);
    } catch (error) {
      console.error('Error loading listing:', error);
      displayError();
    }
  }
}
document.addEventListener('DOMContentLoaded', () => {
  setUpLogoutLink();
  loadListing();
  updateUserCredits();
});
