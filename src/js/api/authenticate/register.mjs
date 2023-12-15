import {
  displayError,
  showValidationError,
} from '../../utilities//messages/error-handler.mjs';
import { makeApiRequest } from '../api-service.mjs';
import {
  validateUsername,
  validateAvatarUrl,
  validateEmail,
  validatePassword,
  validateField,
} from '../../utilities/auth-utils.mjs';
import { switchToLogin } from '../../utilities/pills/pills-login-register.mjs';
import { displaySuccess } from '../../utilities/messages/success.mjs';

const registerForm = document.getElementById('registerForm');
const registerName = document.getElementById('registerName');
const registerEmail = document.getElementById('registerEmail');
const registerPassword = document.getElementById('registerPassword');
const registerAvatar = document.getElementById('registerAvatar');

export function setupRegisterFormValidation() {
  registerName.addEventListener('input', () =>
    validateField(registerName, validateUsername)
  );
  registerEmail.addEventListener('input', () =>
    validateField(registerEmail, validateEmail)
  );
  registerPassword.addEventListener('input', () =>
    validateField(registerPassword, validatePassword)
  );
  registerAvatar.addEventListener('input', () =>
    validateField(registerAvatar, validateAvatarUrl)
  );
}

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

    if (emailError || passwordError || usernameError || avatarError) {
      showValidationError(registerEmail, emailError);
      showValidationError(registerPassword, passwordError);
      showValidationError(registerName, usernameError);
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

    const { error, message } = response;

    if (!error) {
      displaySuccess('Registration successful! You can now login.');
      switchToLogin();
    } else {
      displayError(message || 'Registration failed. Please try again.');
    }
  } catch (error) {
    console.error('Registration failed', error);
    displayError(error.message || 'Registration failed.');
  }
}

registerForm.addEventListener('submit', function (event) {
  event.preventDefault();
  registerUser();
});
