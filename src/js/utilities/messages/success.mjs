export function displaySuccess(message, listingUrl = null, callback = null) {
  const successMessageElement = document.getElementById('successMessage');
  if (successMessageElement) {
    successMessageElement.innerHTML = message;

    if (listingUrl) {
      const viewListingLink = `<a href="${listingUrl}" class="alert-link">View your listing</a>`;
      successMessageElement.innerHTML += ` ${viewListingLink}`;
    }
    successMessageElement.style.display = 'block'; // Show the message element

    if (callback) {
      callback();
    }
  }
}
