import { createNewElement } from '../utilities/createHTML.mjs';
import { getTimeRemainingFormatted } from '../utilities/date-time.mjs';
import { selectDefaultImage } from '../utilities/default-image-selector.mjs';
import { displayError } from '../utilities/messages/error-handler.mjs';
import { placeBid } from '../api/bids/bids-service-API.mjs';
import { getListingById } from '../api/listings/listings-service.mjs';
import { createBootstrapCarousel } from '../utilities/carousel.mjs';
import { updateHighestBidDetails } from './update-highest-bid-details.mjs';
import { updateUserCredits } from '../utilities/update-credit.mjs';
import { populateSections } from './listings-render.mjs';

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
  // Media
  if (listing.media && listing.media.length > 0) {
    // Use the createBootstrapCarousel function
    const carouselId = 'listingCarousel'; // Unique ID for the carousel
    const carousel = createBootstrapCarousel(listing.media, carouselId);
    imageColumn.appendChild(carousel);
  } else {
    // Fallback to default image if no media
    const defaultImage = selectDefaultImage(
      listing.tags,
      listing.title,
      listing.description || ''
    );
    const img = createNewElement('img', {
      classNames: ['listing-image', 'img-fluid', 'w-100'],
      attributes: { src: defaultImage, alt: listing.title },
    });
    img.onerror = () => {
      img.src = defaultImage;
    };
    imageColumn.appendChild(img);
  }

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

  const tagsContainer = createNewElement('div', {
    classNames: ['tags-container', 'mb-2'],
  });
  listing.tags.forEach((tag) => {
    const tagBadge = createNewElement('span', {
      classNames: ['badge', 'badge-pill', 'bg-secondary', 'me-1'], // Bootstrap classes
      text: tag,
    });
    tagsContainer.appendChild(tagBadge);
  });
  detailsColumn.appendChild(tagsContainer);

  updateHighestBidDetails(listing, detailsColumn);

  // Time remaining
  const timeRemaining = getTimeRemainingFormatted(listing.endsAt);

  const timeRemainingElement = createNewElement('p', {
    classNames: ['time-remaining'],
  });

  const hourglassIcon = createNewElement('span', {
    classNames: ['material-symbols-outlined', 'align-middle', 'fs-5', 'pe-1'],
    text: 'hourglass_top',
  });

  timeRemainingElement.appendChild(hourglassIcon);
  timeRemainingElement.appendChild(document.createTextNode(`${timeRemaining}`));

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
    classNames: ['form-control', 'mb-3'],
    attributes: {
      type: 'number',
      id: 'bidAmount',
      placeholder: 'Enter bid amount',
      required: true,
      min: 1,
    },
  });

  const bidButton = createNewElement('button', {
    classNames: ['btn', 'btn-primary', 'btn-lg'],
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
        const bidResponse = await placeBid(listing.id, bidAmount);
        console.log('Bid response:', bidResponse);

        // If placeBid function executes successfully, proceed to update bid history and credits
        // Fetch updated listing details for bid history
        if (bidResponse) {
          const updatedListing = await getListingById(listing.id);
          if (updatedListing && Array.isArray(updatedListing.bids)) {
            populateBidHistory(updatedListing, bidHistory);
            updateHighestBidDetails(updatedListing, detailsColumn);
          }

          // Separate call to update user credits
          await updateUserCredits();
          populateSections();
        } else {
          console.error('Bid placement unsuccessful:', bidResponse);
        }
      } catch (error) {
        // Handle unsuccessful bid here
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
    createNewElement('h1', {
      text: 'Seller',
      classNames: ['seller-details-title', 'mb-4'],
    })
  );

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
