import {
  getAllListings,
  getMostPopularListings,
  getNewestListings,
  getSoonEndingListings,
} from '../api/listings/listings-service.mjs';
import { createListingCard } from './create-listing-card.mjs';

/**
 * Populates various sections with listings based on the category provided.
 *
 * @param {boolean} [limitCards=false] - Whether to limit the number of cards shown in each section.
 * @param {string|null} [category=null] - The category of listings to display. If null, populates all sections.
 * @param {string|null} [containerId=null] - The container ID where the listings should be populated.
 */

export async function populateSections(
  limitCards = false,
  category,
  containerId = null
) {
  const allListings = await getAllListings();

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

/**
 * Populates a specific section with listing cards.
 *
 * @param {string} sectionId - The ID of the section to populate.
 * @param {Array} listings - An array of listing objects to be used for creating cards.
 * @param {boolean} [limitCards=false] - Whether to limit the number of cards shown.
 * @param {string|null} [containerId=null] - The container ID to use if different from the section ID.
 */

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
    container.appendChild(card);
  });
}
