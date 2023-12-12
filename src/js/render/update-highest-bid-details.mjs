import { createNewElement } from '../utilities/createHTML.mjs';

/**
 * Updates or creates elements in the details column to display the highest bid and the highest bidder's name for a listing.
 *
 * @param {Object} listing - The listing object with bid information.
 * @param {HTMLElement} detailsColumn - The HTML element where the highest bid details will be displayed.
 */

export function updateHighestBidDetails(listing, detailsColumn) {
  // Determine highest bid
  let highestBid = {};
  if (Array.isArray(listing.bids) && listing.bids.length > 0) {
    highestBid = listing.bids.sort((a, b) => b.amount - a.amount)[0];
  }

  // Create or update highest bid element
  let highestBidElement = detailsColumn.querySelector('.highest-bid');
  if (!highestBidElement) {
    highestBidElement = createNewElement('p', { classNames: ['highest-bid'] });
    detailsColumn.appendChild(highestBidElement);
  }
  highestBidElement.textContent = `Highest bid: ${
    highestBid.amount || 'No bids'
  }`;

  // Create or update highest bidder element
  let highestBidderElement = detailsColumn.querySelector('.highest-bidder');
  if (!highestBidderElement) {
    highestBidderElement = createNewElement('p', {
      classNames: ['highest-bidder'],
    });
    detailsColumn.appendChild(highestBidderElement);
  }
  highestBidderElement.textContent = `Highest bidder: ${
    highestBid.bidderName || 'No bidder'
  }`;
}
