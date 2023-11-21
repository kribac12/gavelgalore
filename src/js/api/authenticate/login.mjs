import { displayError } from '../../utilities/error-handler.mjs';
import { makeApiRequest } from '../api-service.mjs';
import { validateInputs } from '../../utilities/auth-utils.mjs';
import { saveUserInfo, getUserInfo } from '../../storage/storage.mjs';

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
      // Proceed with regular login process
      const email = loginEmail.value.trim();
      const password = loginPassword.value.trim();

      if (!validateInputs(email, password)) {
        displayError('Invalid email or password');
        return;
      }

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
