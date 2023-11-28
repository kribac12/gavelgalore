import {
  getAllListings,
  getMostPopularListings,
  getNewestListings,
  getSoonEndingListings,
} from './listings-service.mjs';
import {
  getTimeRemaining,
  formatTimeRemaining,
} from '../../utilities/date-time.mjs';
import { createNewElement } from '../../create-html/createHTML.mjs';

export async function populateSections(limitCards = false) {
  const allListings = await getAllListings();
  console.log(allListings);
  populateSection(
    'listings-popular',
    getMostPopularListings(allListings),
    limitCards
  );
  populateSection(
    'listings-ends-soon',
    getSoonEndingListings(allListings),
    limitCards
  );
  populateSection(
    'listings-newest',
    getNewestListings(allListings),
    limitCards
  );
}

export function populateSection(sectionId, listings, limitCards) {
  const section = document.getElementById(sectionId);
  const container = section.querySelector('.container > .row');
  container.innerHTML = '';

  const listingsToDisplay = limitCards ? listings.slice(0, 4) : listings;

  listingsToDisplay.forEach((listing) => {
    const card = createListingCard(listing);
    container.appendChild(card);
  });
}

export function createListingCard(listing) {
  const card = createNewElement('div', { classNames: ['col-md-3'] });
  const cardInner = createNewElement('div', { classNames: ['card', 'w-70'] });
  card.appendChild(cardInner);

  // Define default image, use if none other, and add first listing image
  const defaultImage = '/assets/images/hostaphoto-XFhny3yLA0c-unsplash.jpg';
  const imageUrl =
    listing.media && listing.media.length > 0 ? listing.media[0] : defaultImage;
  const img = createNewElement('img', {
    className: 'card-img-top',
    attributes: { src: imageUrl, alt: listing.title },
  });
  cardInner.appendChild(img);

  // Add card-img-overlay with bids
  const overlay = createNewElement('div', { classNames: ['card-img-overlay'] });
  const bidsText = createNewElement('p', {
    classNames: [
      'card-text',
      'btn',
      'btn-secondary',
      'position-absolute',
      'top-0',
      'end-0',
      'bid-button',
    ],
    text: `Bids: ${listing._count.bids}`,
  });
  overlay.appendChild(bidsText);
  cardInner.appendChild(overlay);

  //Add card body
  const cardBody = createNewElement('div', { classNames: ['card-body'] });
  cardInner.appendChild(cardBody);

  //Add title, description, etc
  cardBody.appendChild(
    createNewElement('h3', { classNames: ['card-title'], text: listing.title })
  );
  cardBody.appendChild(
    createNewElement('p', {
      classNames: ['card-text'],
      text: listing.description,
    })
  );
  cardBody.appendChild(
    createNewElement('p', {
      classNames: ['card-text'],
      text: listing.endsAt,
    })
  );

  //Add hourglass icon and time remaining
  const timeRemaining = formatTimeRemaining(getTimeRemaining(listing.endsAt));
  const timeText = createNewElement('p', { classNames: ['card-text'] });
  const hourglassIcon = createNewElement('span', {
    classNames: ['material-symbols-outlined', 'align-middle', 'fs-5', 'pe-1'],
    text: 'hourglass_top',
  });
  timeText.appendChild(hourglassIcon);
  timeText.appendChild(document.createTextNode(timeRemaining));
  cardBody.appendChild(timeText);

  return card;
}
