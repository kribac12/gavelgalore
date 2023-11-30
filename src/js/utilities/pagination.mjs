// pagination.mjs
import { getAllListings } from '../api/listings/listings-service.mjs';
import { createListingCard } from '../api/listings/listings-render.mjs';

let currentPage = 1;
const listingsPerPage = 16;

export async function loadAndDisplayListings(page, category) {
  currentPage = page;
  try {
    const listings = await getAllListings(
      'created',
      'desc',
      (page - 1) * listingsPerPage,
      listingsPerPage,
      category
    );
    renderListings(listings);
    updatePaginationControls(listings);
  } catch (error) {
    console.error('Error fetching listings:', error);
    // Handle error appropriately
  }
}

function renderListings(listings) {
  const container = document.getElementById('popularContent');
  container.innerHTML = ''; // Clear existing listings

  listings.forEach((listing) => {
    const card = createListingCard(listing);
    container.appendChild(card);
  });
}

function updatePaginationControls(listings) {
  const prevButton = document.getElementById('prevPage');
  const nextButton = document.getElementById('nextPage');
  prevButton.disabled = currentPage === 1;
  nextButton.disabled = listings.length < listingsPerPage; // Assuming no more listings to show
}

// Helper function to initialize pagination on page load
export function initPagination() {
  document
    .getElementById('prevPage')
    .addEventListener('click', () => loadAndDisplayListings(currentPage - 1));
  document
    .getElementById('nextPage')
    .addEventListener('click', () => loadAndDisplayListings(currentPage + 1));
  loadAndDisplayListings(currentPage); // Load the first page of listings
}
