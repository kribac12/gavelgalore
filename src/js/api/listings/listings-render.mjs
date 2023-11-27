import {
  getAllListings,
  getMostPopularListings,
  getNewestListings,
  getSoonEndingListings,
} from './listings-service.mjs';

import { createNewElement } from '../../create-html/createHTML.mjs';

export async function populateSections(limitCards = false) {
  const allListings = await getAllListings();
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

  //Add image
  const img = createNewElement('img', {
    className: 'card-img-top',
    attributes: { src: listing.media[0], alt: listing.title },
  });
  cardInner.appendChild(img);

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

  return card;
}
