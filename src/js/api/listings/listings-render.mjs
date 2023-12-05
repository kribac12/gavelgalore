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
import { selectDefaultImage } from '../../utilities/default-image-selector.mjs';

export async function populateSections(
  limitCards = false,
  category,
  containerId = null
) {
  const allListings = await getAllListings();
  console.log('All listings:', allListings);

  if (category) {
    let listingsToUse;
    switch (category) {
      case 'popular':
        listingsToUse = getMostPopularListings(allListings);
        populateSection(`${category}Content`, listingsToUse, limitCards);
        break;
      case 'endsSoon':
        listingsToUse = getSoonEndingListings(allListings);
        populateSection(`${category}Content`, listingsToUse, limitCards);
        break;
      case 'newest':
        listingsToUse = getNewestListings(allListings);
        populateSection(`${category}Content`, listingsToUse, limitCards);
        break;
      default:
        // Default case for profile page
        populateSection(containerId, allListings, limitCards);
    }
  } else {
    // Populate default sections for the homepage/listings page
    populateSection(
      'listings-popular',
      getMostPopularListings(allListings),
      limitCards,
      null,
      false
    );
    populateSection(
      'listings-ends-soon',
      getSoonEndingListings(allListings),
      limitCards,
      null,
      false
    );
    populateSection(
      'listings-newest',
      getNewestListings(allListings),
      limitCards,
      null,
      false
    );
  }
}

export function populateSection(
  sectionId,
  listings,
  limitCards,
  containerId,
  showAll = false
) {
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
  const listingsToDisplay = showAll
    ? listings
    : limitCards
      ? listings.slice(0, 4)
      : listings;

  listingsToDisplay.forEach((listing) => {
    const card = createListingCard(listing);
    console.log('Appending card:', card);
    container.appendChild(card);
  });

  //Add "Show all" button if it does not show all and there are more listings

  if (!showAll && limitCards && listings.length > 4) {
    const showAllButton = createNewElement('button', {
      text: 'Show All',
      classNames: ['btn', 'btn-primary', 'mt-2'],
    });
    showAllButton.addEventListener('click', () => {
      populateSection(sectionId, listings, false, containerId, true);
    });
    container.appendChild(showAllButton);
  }
}

export function createListingCard(listing) {
  const card = createNewElement('div', {
    classNames: ['col-sm-6', 'col-md-6', 'col-lg-3', 'listing-card'],
  });
  const cardInner = createNewElement('div', { classNames: ['card', 'w-70'] });
  card.appendChild(cardInner);

  // Define default image, use if none other, and add first listing image
  const defaultImage = selectDefaultImage(
    listing.tags || [],
    listing.title,
    listing.description || ''
  );
  let imageUrl =
    listing.media && listing.media.length > 0 ? listing.media[0] : defaultImage;
  const img = createNewElement('img', {
    className: 'card-img-top',
    attributes: { src: imageUrl, alt: listing.title },
  });

  img.onerror = () => {
    img.src = defaultImage;
  };
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
  listing.title.slice(0, 7);
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

  card.addEventListener('click', () => {
    window.location.href = `/src/html/listing-specific/index.html?id=${listing.id}`;
  });
  return card;
}
