import { makeApiRequest } from '../api-service.mjs';
import { displayError } from '../../utilities/messages/error-handler.mjs';
import { displaySuccess } from '../../utilities/messages/success.mjs';

/**
 * Handles the submission of the form for creating a listing.
 *
 * @param {Event} event - Event object from the form submission.
 */
export async function handleCreateListingForm(event) {
  event.preventDefault();

  // Destructuring values directly from DOM elements
  const title = document.getElementById('title').value.trim();
  const description = document.getElementById('description').value.trim();

  // Processing the tags
  const tags = document
    .getElementById('tags')
    .value.trim()
    .split(',')
    .map((tag) => tag.trim());

  // Processing the media inputs
  const mediaInputs = document.querySelectorAll('#mediaContainer input');
  const media = Array.from(mediaInputs)
    .map((input) => input.value.trim())
    .filter((url) => url);

  const endsAt = document.getElementById('endsAt').value;

  try {
    // API request to create new listing
    const response = await makeApiRequest('listings', 'POST', {
      title,
      description,
      tags,
      media,
      endsAt,
    });

    // Handling the success response
    const listingUrl = `/src/html/listing-specific/index.html?id=${encodeURIComponent(
      response.id
    )}`;
    displaySuccess('Listing created successfully!', listingUrl, () => {
      const link = document.querySelector('#successMessage .alert-link');
      if (link) {
        link.addEventListener('click', () => {});
      }
    });

    // Resetting form
    document.getElementById('createListingForm').reset();
  } catch (error) {
    displayError();
  }
}
