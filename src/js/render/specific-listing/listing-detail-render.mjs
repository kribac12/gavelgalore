import { populateImageColumn } from './image-column.mjs';
import { populateDetailsColumn, setupBidForm } from './details-column.mjs';
import { populateSellerDetails } from './seller-details.mjs';
import { populateBidHistory } from './bid-history.mjs';
import { getListingById } from '../../api/listings/listings-service.mjs';
import { updateHighestBidDetails } from '../update-highest-bid-details.mjs';
import { updateUserCredits } from '../../utilities/update-credit.mjs';
import { updateUIOnLogin } from '../../userstate-display/logged-in-visible.mjs';

export async function renderListingDetail(listing) {
  const imageColumn = document.getElementById('imageColumn');
  const detailsColumn = document.getElementById('detailsColumn');
  const sellerDetails = document.getElementById('sellerDetails');
  const bidHistory = document.getElementById('bidHistory');

  if (imageColumn) imageColumn.textContent = '';
  if (detailsColumn) detailsColumn.textContent = '';
  if (sellerDetails) sellerDetails.textContent = '';
  if (bidHistory) bidHistory.textContent = '';

  // Populate each section
  populateImageColumn(listing, imageColumn);
  populateDetailsColumn(listing, detailsColumn);
  populateSellerDetails(listing, sellerDetails);
  populateBidHistory(listing, bidHistory);

  // Setup bidform wth callback function for after successful bid
  setupBidForm(detailsColumn, listing, bidHistory, async () => {
    const updatedListing = await getListingById(listing.id);
    if (updatedListing && Array.isArray(updatedListing.bids)) {
      populateBidHistory(updatedListing, bidHistory);
      updateHighestBidDetails(updatedListing, detailsColumn);
    }
    await updateUserCredits();
  });

  //Update UI based on login status
  updateUIOnLogin();
}
