import '../userstate-display/logged-in-visible.mjs';
import { setUpLogoutLink } from '../api/authenticate/logout.mjs';
import { populateSections } from '../api/listings/listings-render.mjs';
import { updateUserCredits } from '../utilities/update-credit.mjs';

document.addEventListener('DOMContentLoaded', () => {
  setUpLogoutLink();
  populateSections(true);
  updateUserCredits();

  const searchForm = document.getElementById('searchForm');
  if (searchForm) {
    searchForm.addEventListener('submit', (event) => {
      event.preventDefault();
      const searchQuery = searchForm.querySelector('[name="query"]').value;
      if (searchQuery) {
        localStorage.setItem('searchQuery', searchQuery); // Save the search query to local storage
        window.location.href = '/src/html/search-results/index.html'; // Redirect to search results page
      }
    });
  }
});
