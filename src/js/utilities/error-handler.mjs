export function displayError(message) {
  removeError(); // Ensure no previous errors are displayed

  const errorHTML = `
      <div id="dynamicErrorAlert" class="alert alert-danger alert-dismissible fade show" role="alert">
          <strong>Error:</strong> <span>${message}</span>
          <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
      </div>`;

  document.body.insertAdjacentHTML('beforeend', errorHTML);
}

function removeError() {
  const existingErrorAlert = document.getElementById('dynamicErrorAlert');
  if (existingErrorAlert) existingErrorAlert.remove();
}

export function showValidationError(inputElement, errorMessage) {
  inputElement.classList.add('is-invalid');
  const errorElement = document.getElementById(inputElement.id + 'Error');
  if (errorElement) {
    errorElement.textContent = errorMessage;
  }
}
