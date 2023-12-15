export function setUpLogoutLink() {
  const logoutLinks = document.querySelectorAll('.logoutLink');
  if (logoutLinks.length === 0) {
    console.error('Logout links not found');
  }

  logoutLinks.forEach((logoutLink) => {
    logoutLink.addEventListener('click', (event) => {
      event.preventDefault();
      localStorage.removeItem('userInfo');
      window.location.href = '/index.html';
    });
  });
}
