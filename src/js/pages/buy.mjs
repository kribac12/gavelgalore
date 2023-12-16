import '../userstate-display/logged-in-visible.mjs';
import { setUpLogoutLink } from '../api/authenticate/logout.mjs';
import { setUpTabs } from '../utilities/pills/pills-categories.mjs';
import { updateUserCredits } from '../utilities/update-credit.mjs';
import { setUpSearchForm } from '../setup/set-up-search.mjs';
import { handleInitialTabBasedOnHash } from '../utilities/pills/tab-handler.mjs';
import { handleActionForLoggedOutUsers } from '../utilities/modal-prompt.mjs';
import { setUpBackToTopButton } from '../setup/setup-back-to-top.mjs';
document.addEventListener('DOMContentLoaded', () => {
  setUpLogoutLink();
  setUpTabs();
  handleInitialTabBasedOnHash();
  updateUserCredits();
  setUpSearchForm();

  const sellLinks = document.querySelectorAll('.sell-action');
  sellLinks.forEach((link) => {
    link.addEventListener('click', (event) => {
      handleActionForLoggedOutUsers('sell your items', event);
    });
  });
  setUpBackToTopButton(); // Initialize the Back to Top button
});
