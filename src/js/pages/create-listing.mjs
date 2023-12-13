import '../userstate-display/logged-in-visible.mjs';
import { setUpLogoutLink } from '../api/authenticate/logout.mjs';
import { setupCreateListingForm } from '../setup/setup-create-listing-form.mjs';
import { updateUserCredits } from '../utilities/update-credit.mjs';
import { handleCreateListingForm } from '../api/listings/handle-create-listing.mjs';
import { setUpSearchForm } from '../setup/set-up-search.mjs';

document.addEventListener('DOMContentLoaded', () => {
  setUpLogoutLink();
  updateUserCredits();
  setUpSearchForm();

  const createListingContainer = document.getElementById(
    'createListingContainer'
  );
  if (createListingContainer) {
    setupCreateListingForm();
    document
      .getElementById('createListingForm')
      .addEventListener('submit', handleCreateListingForm);
  }
});
