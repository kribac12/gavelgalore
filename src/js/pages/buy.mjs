import '../userstate-display/logged-in-visible.mjs';
import { setUpLogoutLink } from '../api/authenticate/logout.mjs';
import { setUpTabs, switchTab } from '../utilities/pills-categories.mjs';
import { updateUserCredits } from '../utilities/update-credit.mjs';

document.addEventListener('DOMContentLoaded', () => {
  setUpLogoutLink();
  setUpTabs();
  handleInitialTabBasedOnHash();
  updateUserCredits();
});

function handleInitialTabBasedOnHash() {
  const hash = window.location.hash;
  const tabMapping = {
    '#popular': 'popularTab',
    '#endsSoon': 'endsSoonTab',
    '#newest': 'newestTab',
  };
  const selectedTabId = tabMapping[hash];
  if (selectedTabId) {
    switchTab(selectedTabId);
  } else {
    switchTab('popularTab');
  }
}
