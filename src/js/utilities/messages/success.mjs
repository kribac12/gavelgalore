export function displaySuccess(message, listingUrl = null, callback = null) {
  const successMessageElement = document.getElementById('successMessage');
  if (successMessageElement) {
    successMessageElement.innerHTML = message;

    if (listingUrl) {
      const viewListingLink = `<a href="${listingUrl}" class="alert-link">View your listing</a>`;
      successMessageElement.innerHTML += ` ${viewListingLink}`;
    }

    // Create close button
    const closeButton = document.createElement('span');
    closeButton.classList.add('close-btn');
    closeButton.innerHTML = '&times;';
    closeButton.onclick = function () {
      successMessageElement.style.display = 'none';
    };

    // Append close button to success message element
    successMessageElement.appendChild(closeButton);
    successMessageElement.style.display = 'block'; // Show the message element
    if (callback) {
      callback();
    }
  }
}
