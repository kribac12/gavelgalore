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

export async function populateSections(limitCards = false, category) {
  const allListings = await getAllListings();
  console.log(allListings);

  if (category) {
    let listingsToUse;
    switch (category) {
      case 'popular':
        listingsToUse = getMostPopularListings(allListings);
        break;
      case 'endsSoon':
        listingsToUse = getSoonEndingListings(allListings);
        break;
      case 'newest':
        listingsToUse = getNewestListings(allListings);
        break;
    }
    populateSection(`${category}Content`, listingsToUse, limitCards);
  } else {
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
}

export function populateSection(sectionId, listings, limitCards, containerId) {
  const targetId = containerId || sectionId;
  const section = document.getElementById(targetId);

  if (!section) {
    console.error(`No container found for ID: ${targetId}`);
    return;
  }
  const container = (
    section.classList.contains('container')
      ? section
      : section.querySelector('.container')
  )?.querySelector('.row');
  if (!container) {
    console.error(`No '.row' container found in section: ${targetId}`);
    return;
  }

  container.innerHTML = '';
  console.log('Container cleared:', container);
  const listingsToDisplay = limitCards ? listings.slice(0, 4) : listings;

  listingsToDisplay.forEach((listing) => {
    const card = createListingCard(listing);
    console.log('Appending card:', card);
    container.appendChild(card);
  });
}

export function createListingCard(listing) {
  console.log('Creating card for listing:', listing);
  const card = createNewElement('div', {
    classNames: ['col-sm-6', 'col-md-6', 'col-lg-3'],
  });
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
