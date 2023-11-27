export function displaySuccess(message) {
  const successMessageElement = document.getElementById('successMessage');
  if (successMessageElement) {
    successMessageElement.textContent = message;
    successMessageElement.style.display = 'block'; // Show the message element

    // Optionally hide the message after a few seconds
    setTimeout(() => {
      successMessageElement.style.display = 'none';
    }, 8000); // Hides the message after 8 seconds
  }
}
