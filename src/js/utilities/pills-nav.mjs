function switchToRegister() {
  const loginContent = document.getElementById('loginFormContent');
  const registerContent = document.getElementById('registerFormContent');

  if (loginContent && registerContent) {
    loginContent.style.display = 'none';
    registerContent.style.display = 'block';
    activateTab('registerTab', 'loginTab');
  }
}

function switchToLogin() {
  const loginContent = document.getElementById('loginFormContent');
  const registerContent = document.getElementById('registerFormContent');

  if (loginContent && registerContent) {
    loginContent.style.display = 'block';
    registerContent.style.display = 'none';
    activateTab('loginTab', 'registerTab');
  }
}

function activateTab(activeTabId, inactiveTabId) {
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
});
