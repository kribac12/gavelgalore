import { createNewElement } from '../../utilities/createHTML.mjs';

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

export function createBidRow(bid) {
  const bidRow = createNewElement('div', { classNames: ['row', 'mb-2'] });
  const bidderNameElement = createNewElement('span', {
    text: bid.bidderName,
    classNames: ['col-6', 'bidder-name'],
  });
  const bidAmountElement = createNewElement('span', {
    text: `${bid.amount}`,
    classNames: ['col-6', 'bid-amount'],
  });
  bidRow.appendChild(bidderNameElement);
  bidRow.appendChild(bidAmountElement);
  return bidRow;
}
