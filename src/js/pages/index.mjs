import '../userstate-display/logged-in-visible.mjs';
import { setUpLogoutLink } from '../api/authenticate/logout.mjs';
import { populateSections } from '../api/listings/listings-render.mjs';
import { updateUserCredits } from '../utilities/update-credit.mjs';

document.addEventListener('DOMContentLoaded', () => {
  setUpLogoutLink();
  populateSections(true);
  updateUserCredits();
});
