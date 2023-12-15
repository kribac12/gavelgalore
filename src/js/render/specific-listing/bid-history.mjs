import { createNewElement } from '../../utilities/createHTML.mjs';
/**
 * Populates the bid history section
 *
 * @param {Object} listing - listing object containing bid information.
 * @param {HTMLElement} bidHistory - HTML element where bid history is shown.
 */
export function populateBidHistory(listing, bidHistory) {
  bidHistory.innerHTML = '';

  const bidHistoryTitle = createNewElement('h1', {
    text: 'Recent bids',
    classNames: ['bid-history-title', 'mb-4'],
  });
  bidHistory.appendChild(bidHistoryTitle);

  //Header row for column titles
  const headerRow = createNewElement('div', {
    classNames: ['row', 'mb-2'],
  });
  const bidderHeaderCol = createNewElement('div', {
    text: 'Bidder',
    classNames: ['col-6'],
  });
  const amountHeaderCol = createNewElement('div', {
    text: 'Amount',
    classNames: ['col-6'],
  });

  headerRow.appendChild(bidderHeaderCol);
  headerRow.appendChild(amountHeaderCol);
  bidHistory.appendChild(headerRow);

  // Reverse order
  const sortedBids = listing.bids
    .slice()
    .sort((a, b) => new Date(b.created) - new Date(a.created));
  sortedBids.slice(0, 10).forEach((bid) => {
    const bidRow = createBidRow(bid);
    bidHistory.appendChild(bidRow);
  });
}

/**
 * Creates row for a single bid.
 *
 * @param {Object} bid - The bid object.
 * @param {string} bid.bidderName - Name of bidder.
 * @param {number} bid.amount - Amount of the bid.
 * @returns {HTMLElement} - The HTML element for bid history row.
 */
export function createBidRow(bid) {
  const { bidderName, amount } = bid;
  const bidRow = createNewElement('div', { classNames: ['row', 'mb-2'] });
  const bidderNameElement = createNewElement('span', {
    text: bidderName,
    classNames: ['col-6', 'bidder-name'],
  });
  const bidAmountElement = createNewElement('span', {
    text: `${amount}`,
    classNames: ['col-6', 'bid-amount'],
  });

  bidRow.appendChild(bidderNameElement);
  bidRow.appendChild(bidAmountElement);
  return bidRow;
}
