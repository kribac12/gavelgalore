import { showValidationError } from '../../utilities/messages/error-handler.mjs';
import { makeApiRequest } from '../api-service.mjs';
import { saveUserInfo, getUserInfo } from '../../storage/storage.mjs';
import {
  validateEmail,
  validatePassword,
  validateField,
} from '../../utilities/auth-utils.mjs';

const loginForm = document.getElementById('loginForm');
const loginEmail = document.getElementById('loginEmail');
const loginPassword = document.getElementById('loginPassword');

export function setupLoginFormValidation() {
  loginEmail.addEventListener('input', () =>
    validateField(loginEmail, validateEmail)
  );
  loginPassword.addEventListener('input', () =>
    validateField(loginPassword, validatePassword)
  );
}

export async function loginUser() {
  const email = loginEmail.value;
  const password = loginPassword.value;

  [loginEmail, loginPassword].forEach((input) => {
    input.classList.remove('is-invalid');
  });

  const emailError = validateEmail(email);
  const passwordError = validatePassword(password);

  if (emailError) {
    showValidationError(loginEmail, emailError);
    return;
  }
  if (passwordError) {
    showValidationError(loginPassword, passwordError);
    return;
  }

  const userCredentials = { email, password };
  const response = await makeApiRequest('auth/login', 'POST', userCredentials);

  const { error, message, accessToken, name, credits, avatar } = response;

  if (!error && accessToken) {
    const userInfo = {
      name,
      email,
      credits,
      avatar,
      accessToken,
    };
    saveUserInfo(userInfo); // Save user info in localStorage
    window.location.href = '/src/html/profile/index.html';
  } else {
    const loginMessageElement = document.getElementById('loginMessage');
    loginMessageElement.textContent =
      message || 'Login failed. Please try again.';
    loginMessageElement.style.display = 'block'; // Show login error message
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
