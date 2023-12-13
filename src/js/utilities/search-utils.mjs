import { getAllListings } from '../api/listings/listings-service.mjs';
import { createListingCard } from '../render/create-listing-card.mjs';

/**
 * Fetches all listings and filters them based on a search query.
 *
 * @param {string} query - The search query used to filter listings.
 * @returns {Promise<Object[]>} A promise that resolves to an array of listings matching the query.
 */

export async function fetchAndFilterListings(query) {
  try {
    const allListings = await getAllListings();
    const queryWords = query.toLowerCase().split(' ');

    return allListings.filter((listing) => {
      const title = listing.title ? listing.title.toLowerCase() : '';
      const description = listing.description
        ? listing.description.toLowerCase()
        : '';
      const tags = listing.tags
        ? listing.tags.map((tag) => tag.toLowerCase())
        : [];

      return queryWords.some(
        (word) =>
          title.includes(word) ||
          description.includes(word) ||
          tags.some((tag) => tag.includes(word))
      );
    });
  } catch (error) {
    console.error('Error fetching or filtering listings:', error);
    return [];
  }
}

/**
 * Renders a list of listings matching search into a specified container.
 *
 * @param {Object[]} listings - An array of listing objects to be rendered.
 * @param {string} containerId - The ID of the container where listings will be rendered.
 */

export function renderListings(listings, containerId) {
  const container = document.getElementById(containerId)?.querySelector('.row');
  if (!container) {
    console.error(`No row container found in section ${containerId}`);
    return;
  }

  container.innerHTML = '';
  listings.forEach((listing) => {
    const card = createListingCard(listing);
    container.appendChild(card);
  });
}
