export function displayError(message, containerId = null) {
  removeError(); // Clears any previous errors

  const errorHTML = `
      <div id="dynamicErrorAlert" class="alert alert-danger alert-dismissible fade show" role="alert">
          <strong>Error:</strong> <span>${message}</span>
          <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
      </div>`;

  // If a specific container ID is provided, use it; otherwise, default to 'generalErrorContainer'.
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
}

function removeError() {
  const generalErrorContainer = document.getElementById(
    'generalErrorContainer'
  );
  if (generalErrorContainer) {
    generalErrorContainer.innerHTML = '';
    generalErrorContainer.style.display = 'none'; // Hide it again
  }
}

export function showValidationError(inputElement, errorMessage) {
  inputElement.classList.add('is-invalid');
  const errorElement = document.getElementById(inputElement.id + 'Error');
  if (errorElement) {
    errorElement.textContent = errorMessage;
    errorElement.style.display = 'block'; // Directly show the error message
  }
}
