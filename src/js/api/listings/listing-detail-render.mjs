import { createNewElement } from '../../create-html/createHTML.mjs';
import {
  formatTimeRemaining,
  getTimeRemaining,
} from '../../utilities/date-time.mjs';
import { selectDefaultImage } from '../../utilities/default-image-selector.mjs';
import { displayError } from '../../utilities/messages/error-handler.mjs';
import { placeBid } from '../bids/bids-service.mjs';
import { getUpdatedListingById } from './listings-service.mjs';

export async function renderListingDetail(listing) {
  const imageColumn = document.getElementById('imageColumn');
  const detailsColumn = document.getElementById('detailsColumn');
  const sellerDetails = document.getElementById('sellerDetails');
  const bidHistory = document.getElementById('bidHistory');

  if (imageColumn) imageColumn.innerHTML = '';
  if (detailsColumn) detailsColumn.innerHTML = '';
  if (sellerDetails) sellerDetails.innerHTML = '';
  if (bidHistory) bidHistory.innerHTML = '';

  // Populate image, title, description, tags, and time remaining in detailsColumn
  populateDetailsColumn(listing, imageColumn, detailsColumn, bidHistory);

  // Populate seller details in sellerDetails
  populateSellerDetails(listing, sellerDetails);

  // Populate bid history in bidHistory
  populateBidHistory(listing, bidHistory);
}

function populateDetailsColumn(
  listing,
  imageColumn,
  detailsColumn,
  bidHistory
) {
  // Image
  const defaultImage = selectDefaultImage(
    listing.tags,
    listing.title,
    listing.description || ''
  );
  const img = createNewElement('img', {
    classNames: ['listing-image', 'img-fluid', 'w-100'],
    attributes: {
      src: listing.media.length > 0 ? listing.media[0] : defaultImage,
      alt: listing.title,
    },
  });
  img.onerror = () => {
    img.src = defaultImage;
  };
  imageColumn.appendChild(img);

  // Title, Description, Tags, Highest bid, Time Remaining
  detailsColumn.appendChild(
    createNewElement('h1', {
      text: listing.title,
      classNames: ['listing-title'],
    })
  );
  detailsColumn.appendChild(
    createNewElement('p', {
      text: listing.description,
      classNames: ['listing-description'],
    })
  );

  const tagsContainer = createNewElement('ul', {
    classNames: ['tags-container'],
  });
  listing.tags.forEach((tag) =>
    tagsContainer.appendChild(
      createNewElement('li', { text: tag, classNames: ['tag'] })
    )
  );
  detailsColumn.appendChild(tagsContainer);

  //Highest bid details
  let highestBid = {};
  if (Array.isArray(listing.bids) && listing.bids.length > 0) {
    highestBid = listing.bids.sort((a, b) => b.amount - a.amount)[0];
  }

  const highestBidElement = createNewElement('p', {
    text: `Highest bid: ${highestBid.amount || 'No bids'}`,
    classNames: ['highest-bid'],
  });

  const highestBidderElement = createNewElement('p', {
    text: `Highest bidder: ${highestBid.bidderName || 'No bidder'}`,
    classNames: ['highest-bidder'],
  });

  detailsColumn.appendChild(highestBidElement);
  detailsColumn.appendChild(highestBidderElement);

  // Time remaining
  const timeRemaining = getTimeRemaining(listing.endsAt);
  const timeText = formatTimeRemaining(timeRemaining);
  const timeRemainingElement = createNewElement('div', {
    classNames: ['time-remaining'],
  });

  const hourglassIcon = createNewElement('span', {
    classNames: ['material-symbols-outlined', 'align-middle', 'fs-5', 'pe-1'],
    text: 'hourglass_top',
  });

  timeRemainingElement.appendChild(hourglassIcon);
  timeRemainingElement.appendChild(document.createTextNode(`${timeText}`));

  detailsColumn.appendChild(timeRemainingElement);

  setupBidForm(detailsColumn, listing, bidHistory);
}

function setupBidForm(detailsColumn, listing, bidHistory) {
  //Add bid form
  const bidForm = createNewElement('form', {
    classNames: ['bid-form'],
    attributes: { id: 'bidForm' },
  });

  const bidInput = createNewElement('input', {
    classNames: ['form-control'],
    attributes: {
      type: 'number',
      id: 'bidAmount',
      placeholder: 'Enter bid amount',
      required: true,
      min: 1,
    },
  });

  const bidButton = createNewElement('button', {
    classNames: ['btn', 'btn-primary'],
    text: 'Place bid',
    attributes: { type: 'submit' },
  });

  bidForm.appendChild(bidInput);
  bidForm.appendChild(bidButton);
  detailsColumn.appendChild(bidForm);

  document
    .getElementById('bidForm')
    .addEventListener('submit', async (event) => {
      event.preventDefault();
      const bidAmount = Number(document.getElementById('bidAmount').value);
      try {
        // Attempt to place the bid
        await placeBid(listing.id, bidAmount);

        // Fetch updated listing details, including bid history
        const updatedListing = await getUpdatedListingById(listing.id);
        console.log('Updated listing:', updatedListing);
        console.log('Updated Listing:', updatedListing); // Debugging

        // Check if bids array exists in the updated listing
        if (updatedListing && Array.isArray(updatedListing.bids)) {
          // Refresh bid history display
          populateBidHistory(updatedListing, bidHistory);
        } else {
          console.error('Updated listing does not contain bids array');
        }
      } catch (error) {
        console.error('Error placing bid:', error);
        displayError();
      }
    });
}

function populateSellerDetails(listing, sellerDetails) {
  const sellerAvatar = listing.seller?.avatar || '/assets/images/flower.jpg';
  const sellerName = listing.seller?.name || 'No seller name';
  const sellerEmail = listing.seller?.email || 'No seller email';

  sellerDetails.appendChild(
    createNewElement('img', {
      attributes: { src: sellerAvatar, alt: `Avatar of ${sellerName}` },
      classNames: [
        'seller-avatar',
        'rounded-circle',
        'img-fluid',
        'avatar-small',
        'mb-4',
      ],
    })
  );
  sellerDetails.appendChild(
    createNewElement('p', { text: `Seller: ${sellerName}` })
  );
  sellerDetails.appendChild(
    createNewElement('p', { text: `Email: ${sellerEmail}` })
  );
}

function populateBidHistory(listing, bidHistory) {
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

  listing.bids
    .slice(-10)
    .reverse()
    .forEach((bid) => {
      const bidRow = createBidRow(bid);
      bidHistory.appendChild(bidRow);
    });
}

function createBidRow(bid) {
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
