function switchToRegister() {
  const loginContent = document.getElementById('loginFormContent');
  const registerContent = document.getElementById('registerFormContent');

  if (loginContent && registerContent) {
    clearLoginForm();
    loginContent.style.display = 'none';
    registerContent.style.display = 'block';
    activateTab('registerTab', 'loginTab');
  }
}

function clearLoginForm() {
  // Clear login input fields
  document.getElementById('loginEmail').value = '';
  document.getElementById('loginPassword').value = '';

  // Clear any login messages or errors
  document.getElementById('loginMessage').textContent = '';
  resetValidation('loginForm');
}

export function switchToLogin() {
  const loginContent = document.getElementById('loginFormContent');
  const registerContent = document.getElementById('registerFormContent');

  if (loginContent && registerContent) {
    clearRegisterForm();
    loginContent.style.display = 'block';
    registerContent.style.display = 'none';
    activateTab('loginTab', 'registerTab');
  }
}

function clearRegisterForm() {
  // Clear register input fields
  document.getElementById('registerName').value = '';
  document.getElementById('registerEmail').value = '';
  document.getElementById('registerPassword').value = '';
  document.getElementById('registerAvatar').value = '';

  // Clear any register messages or errors
  document.getElementById('registerMessage').textContent = '';
  resetValidation('registerForm');
}

function resetValidation(formId) {
  const form = document.getElementById(formId);
  const inputs = form.querySelectorAll('.form-control');
  inputs.forEach((input) => {
    input.classList.remove('is-invalid');
    const errorElement = document.getElementById(input.id + 'Error');
    if (errorElement) {
      errorElement.style.display = 'none';
    }
  });
}

export function activateTab(activeTabId, inactiveTabId) {
  const activeTab = document.getElementById(activeTabId);
  const inactiveTab = document.getElementById(inactiveTabId);

  if (activeTab && inactiveTab) {
    activeTab.classList.add('active');
    inactiveTab.classList.remove('active');
  }
}

document.addEventListener('DOMContentLoaded', function () {
  const loginTab = document.getElementById('loginTab');
  const registerTab = document.getElementById('registerTab');
  const registerContent = document.getElementById('registerFormContent');

  if (registerContent) {
    registerContent.style.display = 'none'; // Hide register content initially
  }

  if (loginTab && registerTab) {
    loginTab.addEventListener('click', switchToLogin);
    registerTab.addEventListener('click', switchToRegister);
  }

  switchToTabBasedOnHash();
});

//Switch tabs based on URL hash
function switchToTabBasedOnHash() {
  const hash = window.location.hash;
  if (hash === '#register') {
    switchToRegister();
  } else {
    switchToLogin();
  }
}

//Handle hash change event
window.addEventListener('hashchange', switchToTabBasedOnHash);
