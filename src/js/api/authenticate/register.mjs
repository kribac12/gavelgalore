import { displayError } from '../../utilities/error-handler.mjs';
import { makeApiRequest } from '../api-service.mjs';
import {
  validateInputs,
  validateUsername,
  validateAvatarUrl,
} from '../../utilities/auth-utils.mjs';
import { switchToLogin } from '../../utilities/pills-nav.mjs';
import { displaySuccess } from '../../utilities/success.mjs';

const registerForm = document.getElementById('registerForm');
const registerName = document.getElementById('registerName');
const registerEmail = document.getElementById('registerEmail');
const registerPassword = document.getElementById('registerPassword');
const registerAvatar = document.getElementById('registerAvatar');

export async function registerUser() {
  try {
    const name = registerName.value;
    const email = registerEmail.value;
    const password = registerPassword.value;
    const avatar = registerAvatar.value;
    const emailValidation = validateInputs(email, password);
    const usernameValidation = validateUsername(name);
    const avatarValidation = validateAvatarUrl(avatar);

    if (emailValidation || usernameValidation || avatarValidation) {
      const errorMessage =
        emailValidation || usernameValidation || avatarValidation;
      displayError(errorMessage);
      return;
    }

    const newUser = {
      name,
      email,
      password,
      ...(avatar && { avatar }),
    };

    const response = await makeApiRequest('auth/register', 'POST', newUser);

    if (response) {
      displaySuccess('Registration successful! You can now login.');
      switchToLogin();
    } else {
      if (response && response.errorMessage) {
        displayError(response.errorMessage);
      } else {
        displayError('Registration failed. Please try again.');
      }
    }
  } catch (error) {
    const errorMessage = error.response
      ? await error.response.json()
      : error.message;
    console.error('Registration failed', errorMessage);
    displayError(`Registration failed: ${errorMessage}`);
  }
}

registerForm.addEventListener('submit', function (event) {
  event.preventDefault();
  registerUser();
});
