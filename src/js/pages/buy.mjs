import '../userstate-display/logged-in-visible.mjs';
import { setUpLogoutLink } from '../api/authenticate/logout.mjs';
import { setUpTabs } from '../utilities/pills-categories.mjs';
import { switchTab } from '../utilities/pills-categories.mjs';

document.addEventListener('DOMContentLoaded', () => {
  setUpLogoutLink();
  setUpTabs();
  handleFirstTabBasedOnHash();
});

function handleFirstTabBasedOnHash() {
  const hash = window.location.hash;
  if (hash === '#popular') {
    switchTab('popularTab');
  } else {
    //
  }
}
