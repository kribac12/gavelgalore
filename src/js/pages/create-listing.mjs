import '../userstate-display/logged-in-visible.mjs';
import { setUpLogoutLink } from '../api/authenticate/logout.mjs';
import { setupCreateListingForm } from '../api/listings/setup-create-listing-form.mjs';
import { makeApiRequest } from '../api/api-service.mjs';
import { displayError } from '../utilities/messages/error-handler.mjs';
import { updateUserCredits } from '../utilities/update-credit.mjs';
import { displaySuccess } from '../utilities/messages/success.mjs';

document.addEventListener('DOMContentLoaded', () => {
  setUpLogoutLink();

  updateUserCredits();

  const createListingContainer = document.getElementById(
    'createListingContainer'
  );
  if (createListingContainer) {
    setupCreateListingForm();
    document
      .getElementById('createListingForm')
      .addEventListener('submit', async (event) => {
        event.preventDefault();
        const title = document.getElementById('title').value.trim();
        const description = document.getElementById('description').value.trim();
        const tags = document
          .getElementById('tags')
          .value.trim()
          .split(',')
          .map((tag) => tag.trim());
        const mediaInputs = document.querySelectorAll('#mediaContainer input');
        const media = Array.from(mediaInputs)
          .map((input) => input.value.trim())
          .filter((url) => url);

        const endsAt = document.getElementById('endsAt').value;

        try {
          const response = await makeApiRequest('listings', 'POST', {
            title,
            description,
            tags,
            media,
            endsAt,
          });

          const listingUrl = `/src/html/listing-specific/index.html?id=${encodeURIComponent(
            response.id
          )}`;
          displaySuccess('Listing created successfully!', listingUrl, () => {
            const link = document.querySelector('#successMessage .alert-link');
            if (link) {
              link.addEventListener('click', () => {
                console.log('Link clicked');
              });
            }
          });
          document.getElementById('createListingForm').reset();
          console.log('Listing created:', response);
        } catch (error) {
          displayError();
        }
      });
  }
});
