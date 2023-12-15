import { createNewElement } from '../../utilities/createHTML.mjs';
import { getTimeRemainingFormatted } from '../../utilities/date-time.mjs';
import { updateHighestBidDetails } from '../update-highest-bid-details.mjs';
import { placeBid } from '../../api/bids/bids-service-API.mjs';
import { getListingById } from '../../api/listings/listings-service.mjs';
import { populateBidHistory } from './bid-history.mjs';
import { displayError } from '../../utilities/messages/error-handler.mjs';
import { updateUserCredits } from '../../utilities/update-credit.mjs';
import { updateUIOnLogin } from '../../userstate-display/logged-in-visible.mjs';
import { displaySuccess } from '../../utilities/messages/success.mjs';
/**
 * Populates the details column of a listing with information such as title, description, tags, highest bid, and time remaining.
 *
 * @param {Object} listing - The listing object containing information to be displayed.
 * @param {HTMLElement} detailsColumn - The HTML element where listing details will be displayed.
 */
export function populateDetailsColumn(listing, detailsColumn) {
  // Title, Description, Tags, Highest bid, Time Remaining
  detailsColumn.appendChild(
    createNewElement('h1', {
      text: listing.title,
      classNames: ['listing-title'],
    })
  );
  detailsColumn.appendChild(
    createNewElement('p', {
      text: listing.description,
      classNames: ['listing-description'],
    })
  );

  const tagsContainer = createNewElement('div', {
    classNames: ['tags-container', 'mb-2', 'py-2'],
  });
  listing.tags.forEach((tag) => {
    const tagBadge = createNewElement('span', {
      classNames: ['badge', 'badge-pill', 'bg-secondary', 'me-1'], // Bootstrap classes
      text: tag,
    });
    tagsContainer.appendChild(tagBadge);
  });
  detailsColumn.appendChild(tagsContainer);

  updateHighestBidDetails(listing, detailsColumn);

  // Time remaining
  const timeRemaining = getTimeRemainingFormatted(listing.endsAt);
  const timeRemainingElement = createNewElement('p', {
    classNames: ['time-remaining'],
  });
  const hourglassIcon = createNewElement('span', {
    classNames: ['material-symbols-outlined', 'align-middle', 'fs-5', 'pe-1'],
    text: 'hourglass_top',
  });

  timeRemainingElement.appendChild(hourglassIcon);
  timeRemainingElement.appendChild(document.createTextNode(`${timeRemaining}`));
  detailsColumn.appendChild(timeRemainingElement);
}

/**
 * Sets up bid form within the details column of a listing, handling bid submission and updating relevant information upon successful bids.
 *
 * @param {HTMLElement} detailsColumn - The HTML element where the bid form will be added.
 * @param {Object} listing - The listing object to place a bid on.
 * @param {HTMLElement} bidHistory - The HTML element where bid history will be updated.
 * @param {Function} onSuccessfulBid - Callback function to execute after a successful bid.
 */
export function setupBidForm(
  detailsColumn,
  listing,
  bidHistory,
  onSuccessfulBid
) {
  //Add bid form
  const bidForm = createNewElement('form', {
    classNames: ['bid-form'],
    attributes: { id: 'bidForm' },
  });

  const bidInput = createNewElement('input', {
    classNames: ['form-control', 'mb-3', 'show-when-logged-in'],
    attributes: {
      type: 'number',
      id: 'bidAmount',
      placeholder: 'Enter bid amount',
      required: true,
      min: 1,
    },
  });

  const bidButton = createNewElement('button', {
    classNames: ['btn', 'btn-primary', 'btn-lg', 'show-when-logged-in'],
    text: 'Place bid',
    attributes: { type: 'submit' },
  });

  bidForm.appendChild(bidInput);
  bidForm.appendChild(bidButton);
  detailsColumn.appendChild(bidForm);

  // Login/register prompt for logged-out users
  const loginRegisterPrompt = createNewElement('div', {
    classNames: ['login-register-prompt', 'show-when-logged-out', 'mt-3'],
  });
  const loginRegisterText = createNewElement('p', {
    classNames: ['login-register-text', 'show-when-logged-out', 'my-3', 'fs-4'],
    text: 'To place a bid, login or register:',
  });

  const loginLink = createNewElement('a', {
    attributes: { href: '/src/html/login-register/index.html#login' },
    classNames: ['btn', 'btn-primary', 'me-4'],
    text: 'Login',
  });
  const registerLink = createNewElement('a', {
    attributes: { href: '/src/html/login-register/index.html#register' },
    classNames: ['btn', 'btn-primary'],
    text: 'Register',
  });

  loginRegisterPrompt.append(loginRegisterText, loginLink, registerLink);
  detailsColumn.appendChild(loginRegisterPrompt);

  //Bid form eventlistener
  bidForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const bidAmount = Number(bidInput.value);
    try {
      const bidResponse = await placeBid(listing.id, bidAmount);

      if (bidResponse && !bidResponse.error) {
        const updatedListing = await getListingById(listing.id);
        if (updatedListing && Array.isArray(updatedListing.bids)) {
          populateBidHistory(updatedListing, bidHistory);
          updateHighestBidDetails(updatedListing, detailsColumn);

          displaySuccess('Bid added!');
        }

        await updateUserCredits();
        updateUIOnLogin();

        if (typeof onSuccessfulBid === 'function') {
          onSuccessfulBid();
        }
      } else {
        displayError(
          bidResponse.message || 'An unexpected error occurred.',
          'bidErrorContainer'
        );
      }
    } catch (error) {
      // Handle exceptions during bid placement
      console.error('Error placing bid:', error);
      let errorMessage = 'An error occurred while placing the bid.';
      // Check if the error message is about the bid being too low
      if (error.message && error.message.includes('Your bid must be higher')) {
        errorMessage = 'Your bid must be higher than the current bid.';
      }
      displayError(errorMessage, 'bidErrorContainer');
    }
  });
}
