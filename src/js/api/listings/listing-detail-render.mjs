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

  if (imageColumn) imageColumn.innerHTML = '';
  if (detailsColumn) detailsColumn.innerHTML = '';
  if (sellerDetails) sellerDetails.innerHTML = '';

  // Create elements for listing details
  const titleElement = createNewElement('h1', {
    text: listing.title,
    classNames: ['listing-title'],
  });
  const descriptionElement = createNewElement('p', {
    text: listing.description,
    classNames: ['listing-description'],
  });

  // Define default image based on tags, title, or description
  // Define default image, use if none other, and add first listing image
  const defaultImage = selectDefaultImage(
    listing.tags,
    listing.title,
    listing.description || ''
  );
  let imageUrl =
    listing.media && listing.media.length > 0 ? listing.media[0] : defaultImage;
  const img = createNewElement('img', {
    classNames: ['listing-image', 'img-fluid', 'w-100'],
    attributes: { src: imageUrl, alt: listing.title },
  });

  img.onerror = () => {
    img.src = defaultImage;
  };

  imageColumn.appendChild(img);

  //Render tags
  const tagsContainer = createNewElement('ul', {
    classNames: ['tags-container'],
  });
  listing.tags.forEach((tag) => {
    const tagElement = createNewElement('li', {
      text: tag,
      classNames: ['tag'],
    });
    tagsContainer.appendChild(tagElement);
  });

  //Time remaining on bids
  //Add hourglass icon and time remaining
  const timeRemaining = formatTimeRemaining(getTimeRemaining(listing.endsAt));
  const timeText = createNewElement('p', { classNames: ['card-text'] });
  const hourglassIcon = createNewElement('span', {
    classNames: ['material-symbols-outlined', 'align-middle', 'fs-5', 'pe-1'],
    text: 'hourglass_top',
  });
  timeText.appendChild(hourglassIcon);
  timeText.appendChild(document.createTextNode(timeRemaining));

  detailsColumn.appendChild(titleElement);
  detailsColumn.appendChild(descriptionElement);
  detailsColumn.appendChild(tagsContainer);
  detailsColumn.appendChild(timeText);

  // Render bids details
  let highestBid = {};
  if (Array.isArray(listing.bids) && listing.bids.length > 0) {
    highestBid = listing.bids.sort((a, b) => b.amount - a.amount)[0];
  }

  const bidCountElement = createNewElement('p', {
    text: `Number of Bids: ${listing._count.bids}`,
    classNames: ['bid-count'],
  });

  const highestBidElement = createNewElement('p', {
    text: `Highest bid: ${highestBid.amount || 'No bids'}`,
    classNames: ['highest-bid'],
  });

  const highestBidderElement = createNewElement('p', {
    text: `Highest bidder: ${highestBid.bidderName || 'None'}`,
    classNames: ['highest-bidder'],
  });

  detailsColumn.appendChild(bidCountElement);
  detailsColumn.appendChild(highestBidElement);
  detailsColumn.appendChild(highestBidderElement);

  //Render seller details

  let sellerName = 'No seller info';
  let sellerAvatar = '/assets/images/flower.jpg';

  if (listing.seller && typeof listing.seller === 'object') {
    sellerName = listing.seller.name || sellerName;
    sellerAvatar = listing.seller.avatar || sellerAvatar;
  }
  const sellerNameElement = createNewElement('p', {
    text: `Seller: ${sellerName}`,
  });
  const sellerAvatarElement = createNewElement('img', {
    attributes: {
      src: sellerAvatar,
      alt: `Avatar of ${sellerName}`,
    },
    classNames: ['seller-avatar', 'rounded-circle', 'img-fluid', 'w-25'],
  });

  sellerDetails.appendChild(sellerNameElement);
  sellerDetails.appendChild(sellerAvatarElement);
}
