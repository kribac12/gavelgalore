import { getListingById } from './listings-service.mjs';
import { renderListingDetail } from '../../render/specific-listing/listing-detail-render.mjs';
import { displayError } from '../../utilities/messages/error-handler.mjs';

/**
 * Loads a listing based on ID retrieved from URL parameters.
 * Attempts to fetch listing data using getListingById function.
 * Upon success, renders listing details using the renderListingDetail
 * function. Upon error, logs the error and displays error message.
 *
 * @async
 * @function loadListing
 * @returns {Promise<void>} -  Promise that resolves when listing is loaded and rendered.
 */
export async function loadListing() {
  const urlParams = new URLSearchParams(window.location.search);
  const listingId = urlParams.get('id');

  if (!listingId) {
    displayError('No listing ID provided.');
    return;
  }
  try {
    const listing = await getListingById(listingId);
    renderListingDetail(listing);
  } catch (error) {
    console.error('Error loading listing:', error);
    if (error.status === 404) {
      displayError('Listing not found.', 'generalErrorContainer');
    } else {
      displayError(
        'An error occurred while loading listing',
        'generalErrorContainer'
      );
    }
  }
}
