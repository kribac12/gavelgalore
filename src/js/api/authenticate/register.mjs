import {
  displayError,
  showValidationError,
} from '../../utilities/error-handler.mjs';
import { makeApiRequest } from '../api-service.mjs';
import {
  validateUsername,
  validateAvatarUrl,
  validateEmail,
  validatePassword,
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

    // Clear any previous validation errors
    [registerEmail, registerPassword, registerName, registerAvatar].forEach(
      (input) => {
        input.classList.remove('is-invalid');
      }
    );

    // Validate inputs
    const emailError = validateEmail(email);
    const passwordError = validatePassword(password);
    const usernameError = validateUsername(name);
    const avatarError = validateAvatarUrl(avatar);

    if (emailError) {
      showValidationError(registerEmail, emailError);
      return;
    }
    if (passwordError) {
      showValidationError(registerPassword, passwordError);
      return;
    }

    if (usernameError) {
      showValidationError(registerName, usernameError);
      return;
    }

    if (avatarError) {
      showValidationError(registerAvatar, avatarError);
      return;
    }

    // Prepare user data for registration
    const newUser = {
      name,
      email,
      password,
      ...(avatar && { avatar }),
    };

    // API call for registration
    const response = await makeApiRequest('auth/register', 'POST', newUser);

    if (response) {
      displaySuccess('Registration successful! You can now login.');
      switchToLogin();
    } else {
      // Handle unsuccessful registration
      if (response && response.errorMessage) {
        displayError(response.errorMessage);
      } else {
        displayError('Registration failed. Please try again.');
      }
    }
  } catch (error) {
    // Handle errors from API call
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
