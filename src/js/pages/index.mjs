import '../userstate-display/logged-in-visible.mjs';
import { setUpLogoutLink } from '../api/authenticate/logout.mjs';
import { populateSections } from '../api/listings/listings-render.mjs';

document.addEventListener('DOMContentLoaded', () => {
  setUpLogoutLink();
  populateSections(true);
});
