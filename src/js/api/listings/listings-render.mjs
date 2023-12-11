import {
  getAllListings,
  getMostPopularListings,
  getNewestListings,
  getSoonEndingListings,
} from './listings-service.mjs';
import { getTimeRemainingFormatted } from '../../utilities/date-time.mjs';
import { createNewElement } from '../../create-html/createHTML.mjs';
import { selectDefaultImage } from '../../utilities/default-image-selector.mjs';
import { limitTags, trimText } from '../../utilities/text-trimmer.mjs';

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
  const listingsToDisplay = limitCards ? listings.slice(0, 4) : listings;

  listingsToDisplay.forEach((listing) => {
    const card = createListingCard(listing);
    console.log('Appending card:', card);
    container.appendChild(card);
  });
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
    listing.media && listing.media.length > 0 && isValidUrl(listing.media[0])
      ? listing.media[0]
      : defaultImage;

  const img = createNewElement('img', {
    className: 'card-img-top',
    attributes: { src: imageUrl, alt: listing.title },
  });

  img.onerror = () => {
    img.src = defaultImage;
  };
  cardInner.appendChild(img);

  // Determine highest bid
  let highestBidAmount = 'No bids';
  if (Array.isArray(listing.bids) && listing.bids.length > 0) {
    console.log('Listing bids:', listing.bids);
    const highestBid = listing.bids.reduce(
      (max, bid) => (bid.amount > max.amount ? bid : max),
      listing.bids[0]
    );
    highestBidAmount = highestBid.amount;
    console.log('Listing bids:', listing.bids);
  }
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
    text: `Highest bid: ${highestBidAmount}`,
  });
  overlay.appendChild(bidsText);
  cardInner.appendChild(overlay);

  //Add card body
  const cardBody = createNewElement('div', { classNames: ['card-body'] });
  cardInner.appendChild(cardBody);

  //Add title, description, etc
  cardBody.appendChild(
    createNewElement('h3', {
      classNames: ['card-title'],
      text: trimText(listing.title, 40),
    })
  );
  listing.title.slice(0, 7);
  cardBody.appendChild(
    createNewElement('p', {
      classNames: ['card-text'],
      text: trimText(listing.description, 100),
    })
  );

  //Format creation date
  const creationDateText = `Created: ${new Date(
    listing.created
  ).toLocaleDateString()}`;
  const creationDateElement = createNewElement('p', {
    classNames: ['card-text', 'creation-date'],
    text: creationDateText,
  });
  cardBody.appendChild(creationDateElement);

  // Create container for tags
  const tagsContainer = createNewElement('div', {
    classNames: ['tags-container', 'mb-2'],
  });

  // Limit the number of tags to display
  const displayedTags = limitTags(listing.tags, 3); // Show up to 3 tags

  // Add tags as badges
  displayedTags.forEach((tag) => {
    const tagBadge = createNewElement('span', {
      classNames: ['badge', 'bg-secondary', 'me-1'],
      text: tag,
    });
    tagsContainer.appendChild(tagBadge);
  });

  cardBody.appendChild(tagsContainer);

  cardBody.appendChild(tagsContainer);
  //Add hourglass icon and time remaining
  const timeRemaining = getTimeRemainingFormatted(listing.endsAt);
  const timeRemainingElement = createNewElement('p', {
    classNames: ['card-text'],
  });
  const hourglassIcon = createNewElement('span', {
    classNames: ['material-symbols-outlined', 'align-middle', 'fs-5', 'pe-1'],
    text: 'hourglass_top',
  });
  timeRemainingElement.appendChild(hourglassIcon);
  timeRemainingElement.appendChild(document.createTextNode(`${timeRemaining}`));
  cardBody.appendChild(timeRemainingElement);

  card.addEventListener('click', () => {
    window.location.href = `/src/html/listing-specific/index.html?id=${listing.id}`;
  });
  return card;
}

// Helper function to check if a string is a valid URL
function isValidUrl(string) {
  try {
    new URL(string);
    return true;
  } catch (_) {
    return false;
  }
}
