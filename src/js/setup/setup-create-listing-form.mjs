import { createNewElement } from '../utilities/createHTML.mjs';
import { trimText, limitTags } from '../utilities/text-trimmer.mjs';
import { displayError } from '../utilities/messages/error-handler.mjs';
import { getTimeRemainingFormatted } from '../utilities/date-time.mjs';
import { isValidUrl } from '../utilities/valid-url.mjs';
import { createBootstrapCarousel } from '../utilities/carousel.mjs';

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

  //Add event listeners for updating preview

  titleInput.addEventListener('input', () => {
    document.getElementById('previewTitle').innerText =
      trimText(titleInput.value, 40) || 'Title Preview';
  });
  descriptionInput.addEventListener('input', () => {
    document.getElementById('previewDescription').innerText =
      trimText(descriptionInput.value, 100) || 'Description preview';
  });

  tagsInput.addEventListener('input', () => updateTagsPreview(tagsInput));

  endsAtInput.addEventListener('input', () => {
    const endDateValue = endsAtInput.value;
    let timeRemainingPreview = 'Time Remaining Preview';

    if (endDateValue) {
      const timeRemaining = getTimeRemainingFormatted(endDateValue);
      timeRemainingPreview = timeRemaining || 'Invalid Date';
    }

    document.getElementById('previewTimeRemaining').innerText =
      timeRemainingPreview;
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

  //Initialize preview carousel with default image
  initializePreviewCarousel();
}

function updateTagsPreview(tagsInput) {
  const previewTagsContainer = document.getElementById('previewTags');
  previewTagsContainer.innerHTML = ''; // Clear existing tags

  const tags = tagsInput.value
    .split(',')
    .map((tag) => tag.trim())
    .filter((tag) => tag);
  limitTags(tags, 3).forEach((tag) => {
    const tagElement = createNewElement('span', {
      classNames: ['badge', 'bg-secondary', 'me-1'],
      text: tag,
    });
    previewTagsContainer.appendChild(tagElement);
  });
}

function initializePreviewCarousel() {
  const previewCarouselContainer = document.getElementById(
    'previewCarouselContainer'
  );
  previewCarouselContainer.innerHTML = '';
  const defaultImageElement = createNewElement('img', {
    classNames: ['listing-image', 'img-fluid', 'w-100'],
    attributes: {
      src: '/assets/images/hostaphoto-XFhny3yLA0c-unsplash.jpg',
      alt: 'Default Image',
    },
  });
  previewCarouselContainer.appendChild(defaultImageElement);
}

/**
 * Creates new media input field for input form.
 * @returns {HTMLElement} - The created input field for media URLs.
 */
function createMediaInput() {
  const mediaInput = createNewElement('input', {
    classNames: ['form-control', 'mt-2'],
    attributes: { type: 'text', placeholder: 'Media URL', name: 'mediaUrls[]' },
  });
  mediaInput.addEventListener('input', updatePreviewCarousel);
  return mediaInput;
}

/**
 * Adds new media input field to media container for the listing form.
 * @param {HTMLElement} container - Container where new media input field is added.
 */

function addMediaInput(container) {
  const newMediaInput = createMediaInput();
  container.insertBefore(newMediaInput, container.lastChild);
}

function updatePreviewCarousel() {
  const mediaContainer = document.getElementById('mediaContainer');
  const mediaUrls = Array.from(
    mediaContainer.querySelectorAll('input[name="mediaUrls[]"]')
  )
    .map((input) => input.value.trim())
    .filter((url) => url && isValidUrl(url));

  const previewCarouselContainer = document.getElementById(
    'previewCarouselContainer'
  );
  previewCarouselContainer.innerHTML = ''; // Clear existing carousel

  if (mediaUrls.length > 0) {
    const carousel = createBootstrapCarousel(mediaUrls, 'previewCarousel');
    previewCarouselContainer.appendChild(carousel);
  } else {
    initializePreviewCarousel();
  }
}
