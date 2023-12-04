import { createNewElement } from '../../create-html/createHTML.mjs';

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
