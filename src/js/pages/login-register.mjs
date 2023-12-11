import '../utilities/pills/pills-login-register.mjs';
import '../api/authenticate/login.mjs';
import '../api/authenticate/register.mjs';
import '../userstate-display/logged-in-visible.mjs';
import { setUpSearchForm } from '../setup/set-up-search.mjs';

document.addEventListener('DOMContentLoaded', () => {
  setUpSearchForm();
});
