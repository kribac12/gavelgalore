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

  const sellLinks = document.querySelectorAll('.sell-action');
  sellLinks.forEach((link) => {
    link.addEventListener('click', (event) => {
      handleActionForLoggedOutUsers('sell your items', event);
    });
  });
});
