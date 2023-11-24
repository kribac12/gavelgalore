import '../userstate-display/logged-in-visible.mjs';
import { setUpLogoutLink } from '../api/authenticate/logout.mjs';

document.addEventListener('DOMContentLoaded', () => {
  setUpLogoutLink();
});
