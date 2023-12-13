import '../userstate-display/logged-in-visible.mjs';
import { setUpLogoutLink } from '../api/authenticate/logout.mjs';
import { updateUserCredits } from '../utilities/update-credit.mjs';
import { loadListing } from '../api/listings/load-listing.mjs';
import { setUpSearchForm } from '../setup/set-up-search.mjs';
import { handleActionForLoggedOutUsers } from '../utilities/modal-prompt.mjs';

document.addEventListener('DOMContentLoaded', () => {
  setUpLogoutLink();
  loadListing();
  updateUserCredits();
  setUpSearchForm();

  const sellLink = document.getElementById('sellLink');
  if (sellLink) {
    sellLink.addEventListener('click', (event) => {
      event.preventDefault();
      handleActionForLoggedOutUsers('sell your items');
    });
  }
});
