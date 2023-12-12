import { getAllListings } from '../api/listings/listings-service.mjs';
import { createListingCard } from '../render/create-listing-card.mjs';

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
