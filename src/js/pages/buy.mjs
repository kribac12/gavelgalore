import '../userstate-display/logged-in-visible.mjs';
import { setUpLogoutLink } from '../api/authenticate/logout.mjs';
import { setUpTabs } from '../utilities/pills/pills-categories.mjs';
import { updateUserCredits } from '../utilities/update-credit.mjs';
import { setUpSearchForm } from '../setup/set-up-search.mjs';
import { handleInitialTabBasedOnHash } from '../utilities/pills/tab-handler.mjs';
import { handleActionForLoggedOutUsers } from '../utilities/modal-prompt.mjs';

document.addEventListener('DOMContentLoaded', () => {
  setUpLogoutLink();
  setUpTabs();
  handleInitialTabBasedOnHash();
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
