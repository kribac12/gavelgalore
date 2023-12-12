import '../userstate-display/logged-in-visible.mjs';
import { setUpLogoutLink } from '../api/authenticate/logout.mjs';
import { updateUserCredits } from '../utilities/update-credit.mjs';
import {
  fetchAndFilterListings,
  renderListings,
} from '../utilities/search-utils.mjs';
import { handleActionForLoggedOutUsers } from '../utilities/modal-prompt.mjs';

document.addEventListener('DOMContentLoaded', async () => {
  setUpLogoutLink();
  updateUserCredits();

  // Handle modal if user clicks sell link
  const sellLink = document.getElementById('sellLink');
  if (sellLink) {
    sellLink.addEventListener('click', (event) => {
      event.preventDefault();
      handleActionForLoggedOutUsers('sell your items');
    });
  }

  // handle search query
  const searchQuery = localStorage.getItem('searchQuery');
  localStorage.removeItem('searchQuery');

  const searchQueryDisplay = document.getElementById('searchQueryDisplay');
  if (searchQuery) {
    searchQueryDisplay.textContent = `"${searchQuery}"`;
    try {
      const filteredListings = await fetchAndFilterListings(searchQuery);
      renderListings(filteredListings, 'listingsContainer');
    } catch (error) {
      console.error('Error rendering search results:', error);
    }
  } else {
    searchQueryDisplay.textContent = 'No search query provided.';
  }
});
