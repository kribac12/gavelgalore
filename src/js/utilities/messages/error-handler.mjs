export function displayError(message, containerId = null) {
  removeError(); // Clears any previous errors

  const errorHTML = `
    <div id="dynamicErrorAlert" class="alert alert-danger alert-dismissible fade show" role="alert">
        <strong>Error:</strong> <span>${message}</span>
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    </div>`;

  const errorContainer = containerId
    ? document.getElementById(containerId)
    : document.getElementById('generalErrorContainer');

  if (errorContainer) {
    errorContainer.innerHTML = errorHTML;
    errorContainer.style.display = 'block';
  } else {
    console.error(
      `Error container with ID '${
        containerId || 'generalErrorContainer'
      }' not found.`
    );
  }
  // Setup a click listener to clear the error when clicking elsewhere on the page
  if (!window.errorClickListenerAttached) {
    document.addEventListener('click', function clearErrorOnClick() {
      removeError();
      window.errorClickListenerAttached = false;
      document.removeEventListener('click', clearErrorOnClick);
    });

    window.errorClickListenerAttached = true;
  }
}

function removeError() {
  const errorMessages = document.querySelectorAll('.alert-dismissible');
  errorMessages.forEach((errorMessage) => {
    errorMessage.style.display = 'none';
    errorMessage.innerHTML = '';
  });
}

export function showValidationError(inputElement, errorMessage) {
  inputElement.classList.add('is-invalid');
  const errorElement = document.getElementById(inputElement.id + 'Error');
  if (errorElement) {
    errorElement.textContent = errorMessage;
    errorElement.style.display = 'block'; // Directly show the error message
  }
}
