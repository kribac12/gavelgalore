import { createNewElement } from '../utilities/createHTML.mjs';
import { displayError } from '../utilities/messages/error-handler.mjs';

/**
 * Sets up form for creating listing. Includes inputs for title, description, tags, media, and ending time.
 */
export function setupCreateListingForm() {
  const container = document.getElementById('createListingContainer');

  const form = createNewElement('form', {
    attributes: { id: 'createListingForm' },
    classNames: ['row', 'g-3'],
  });

  const titleInput = createNewElement('input', {
    attributes: {
      type: 'text',
      id: 'title',
      placeholder: 'Title',
      required: true,
    },
    classNames: ['form-control'],
  });

  const descriptionInput = createNewElement('textarea', {
    attributes: { id: 'description', placeholder: 'Description' },
    classNames: ['form-control'],
  });

  const tagsInput = createNewElement('input', {
    attributes: {
      type: 'text',
      id: 'tags',
      placeholder: 'Tags(separated by comma)',
    },
    classNames: ['form-control'],
  });

  const mediaContainer = createNewElement('div', {
    attributes: { id: 'mediaContainer' },
    classNames: ['media-container'],
  });

  const initialMediaInput = createMediaInput();
  mediaContainer.appendChild(initialMediaInput);

  const addMoreButton = createNewElement('button', {
    text: 'Add another image',
    classNames: ['btn', 'btn-secondary', 'mt-2'],
    attributes: { type: 'button' },
  });

  addMoreButton.addEventListener('click', () => addMediaInput(mediaContainer));
  mediaContainer.appendChild(addMoreButton);

  const endsAtInput = createNewElement('input', {
    attributes: { type: 'datetime-local', id: 'endsAt', required: true },
    classNames: ['form-control'],
  });

  const submitButton = createNewElement('button', {
    text: 'Create listing',
    attributes: { type: 'submit' },
    classNames: ['btn', 'btn-primary'],
  });

  form.append(
    titleInput,
    descriptionInput,
    tagsInput,
    mediaContainer,
    endsAtInput,
    submitButton
  );

  if (container) {
    container.appendChild(form);
  } else {
    console.error('Create listing container not found');
    displayError();
  }
}

/**
 * Creates new media input field for input form.
 * @returns {HTMLElement} - The created input field for media URLs.
 */
function createMediaInput() {
  return createNewElement('input', {
    classNames: ['form-control', 'mt-2'],
    attributes: { type: 'text', placeholder: 'Media URL', name: 'mediaUrls[]' },
  });
}

/**
 * Adds new media input field to media container for the listing form.
 * @param {HTMLElement} container - Container where new media input field is added.
 */

function addMediaInput(container) {
  const newMediaInput = createMediaInput();
  container.insertBefore(newMediaInput, container.lastChild);
}
