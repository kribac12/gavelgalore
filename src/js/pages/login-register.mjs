import '../utilities/pills/pills-login-register.mjs';
import '../api/authenticate/login.mjs';
import '../api/authenticate/register.mjs';
import '../userstate-display/logged-in-visible.mjs';
import { setUpSearchForm } from '../setup/set-up-search.mjs';
import { setupLoginFormValidation } from '../api/authenticate/login.mjs';
import { setupRegisterFormValidation } from '../api/authenticate/register.mjs';
import { handleActionForLoggedOutUsers } from '../utilities/modal-prompt.mjs';

document.addEventListener('DOMContentLoaded', () => {
  setUpSearchForm();
  setupLoginFormValidation();
  setupRegisterFormValidation();
  setUpSearchForm();

  const sellLinks = document.querySelectorAll('.sell-action');
  sellLinks.forEach((link) => {
    link.addEventListener('click', (event) => {
      handleActionForLoggedOutUsers('sell your items', event);
    });
  });
});
