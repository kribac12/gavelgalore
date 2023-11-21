import { displayError } from '../../utilities/error-handler.mjs';
import { makeApiRequest } from '../api-service.mjs';
import {
  validateInputs,
  validateUsername,
  validateAvatarUrl,
} from '../../utilities/auth-utils.mjs';
import { loginUser } from './login.mjs';

const registerForm = document.getElementById('registerForm');
const registerName = document.getElementById('registerName');
const registerEmail = document.getElementById('registerEmail');
const registerPassword = document.getElementById('registerPassword');
const registerAvatar = document.getElementById('registerAvatar');

export async function registerUser() {
  try {
    const name = registerName.value.trim();
    const email = registerEmail.value.trim();
    const password = registerPassword.value.trim();
    const avatar = registerAvatar.value.trim();
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

    const response = await makeApiRequest('aut/register', 'POST', newUser);

    if (response && response.accessToken) {
      loginUser(response);
    } else {
      document.getElementById('registerMessage').innerText =
        'Registration successful, you can now log in';
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
