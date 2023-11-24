import '../userstate-display/logged-in-visible.mjs';
import { setUpLogoutLink } from '../api/authenticate/logout.mjs';

document.addEventListener('DOMContentLoaded', () => {
  setUpLogoutLink();
});

///
///
///       ``` <div class="listing-wrapper"><h3>Item</h3><p>Description</p><img></img></div>///
