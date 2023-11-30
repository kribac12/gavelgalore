import { createNewElement } from '../../create-html/createHTML.mjs';
import {
  formatTimeRemaining,
  getTimeRemaining,
} from '../../utilities/date-time.mjs';
import { selectDefaultImage } from '../../utilities/default-image-selector.mjs';

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
  populateDetailsColumn(listing, imageColumn, detailsColumn);

  // Populate seller details in sellerDetails
  populateSellerDetails(listing, sellerDetails);

  // Populate bid history in bidHistory
  populateBidHistory(listing, bidHistory);
}

function populateDetailsColumn(listing, imageColumn, detailsColumn) {
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

  // Title, Description, Tags, Time Remaining
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

  const timeRemaining = getTimeRemaining(listing.endsAt);
  const timeText = `Time Remaining: ${formatTimeRemaining(timeRemaining)}`;
  detailsColumn.appendChild(
    createNewElement('p', { text: timeText, classNames: ['time-remaining'] })
  );
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
    classNames: ['bid-history-title'],
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

  const recentBids = listing.bids.slice(-10).reverse();

  recentBids.forEach((bid) => {
    const bidRow = createNewElement('div', { classNames: ['row', 'mb-2'] });
    bidRow.appendChild(
      createNewElement('div', {
        classNames: ['col-6'],
        childElements: [
          createNewElement('span', {
            text: bid.bidderName,
            classNames: ['bidder-name'],
          }),
        ],
      })
    );

    bidRow.appendChild(
      createNewElement('div', {
        classNames: ['col-6'],
        childElements: [
          createNewElement('span', {
            text: `${bid.amount}`,
            classNames: ['bid-amount'],
          }),
        ],
      })
    );

    bidHistory.appendChild(bidRow);
  });
}
