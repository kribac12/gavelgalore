import { getListingById } from './listings-service.mjs';
import { renderListingDetail } from '../../render/listing-detail-render.mjs';
import { displayError } from '../../utilities/messages/error-handler.mjs';

export async function loadListing() {
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
