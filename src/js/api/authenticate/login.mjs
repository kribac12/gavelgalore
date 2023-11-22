import {
  displayError,
  showValidationError,
} from '../../utilities/error-handler.mjs';
import { makeApiRequest } from '../api-service.mjs';
import { saveUserInfo, getUserInfo } from '../../storage/storage.mjs';
import { validateInputs } from '../../utilities/auth-utils.mjs';

const loginForm = document.getElementById('loginForm');
const loginEmail = document.getElementById('loginEmail');
const loginPassword = document.getElementById('loginPassword');

export async function loginUser(registrationResponse = null) {
  try {
    let response;

    if (registrationResponse) {
      // Use the response from registration
      response = registrationResponse;
    } else {
      const email = loginEmail.value;
      const password = loginPassword.value;

      const validationErrors = validateInputs(email, password);
      if (validationErrors.length > 0) {
        validationErrors.forEach((error) => {
          if (error.includes('Email')) {
            showValidationError(loginEmail, error);
          } else if (error.includes('Password')) {
            showValidationError(loginPassword, error);
          }
        });
        return;
      }

      [loginEmail, loginPassword].forEach((input) => {
        input.classList.remove('is-invalid');
      });

      const userCredentials = { email, password };
      response = await makeApiRequest(
        'auth/login',
        'POST',
        userCredentials,
        null
      );
    }

    if (response && response.accessToken) {
      const userInfo = {
        name: response.name,
        email: response.email,
        credits: response.credits,
        avatar: response.avatar,
        token: response.accessToken,
      };

      saveUserInfo(userInfo); // Save user info in localStorage
      window.location.href = '/src/html/profile/index.html';
    } else {
      throw new Error('Authentication failed: No token received');
    }
  } catch (error) {
    const errorMessage = error.response
      ? await error.response.json()
      : error.message;
    console.error('Login failed', errorMessage);
    displayError(`Login failed: ${errorMessage}`);
  }
}

loginForm.addEventListener('submit', function (event) {
  event.preventDefault();
  loginUser();
});

document.addEventListener('DOMContentLoaded', () => {
  if (getUserInfo()) {
    window.location.href = '/src/html/profile/index.html';
  }
});
