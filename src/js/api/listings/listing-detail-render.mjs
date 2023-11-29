import { createNewElement } from '../../create-html/createHTML.mjs';
import {
  formatTimeRemaining,
  getTimeRemaining,
} from '../../utilities/date-time.mjs';
import { selectDefaultImage } from '../../utilities/default-image-selector.mjs';

export function renderListingDetail(listing) {
  const imageColumn = document.getElementById('imageColumn');
  const detailsColumn = document.getElementById('detailsColumn');
  const sellerDetails = document.getElementById('sellerDetails');

  if (imageColumn) imageColumn.innerHTML = '';
  if (detailsColumn) detailsColumn.innerHTML = '';
  if (sellerDetails) sellerDetails.innerHTML = '';

  // Create elements for listing details
  const titleElement = createNewElement('h1', {
    text: listing.title,
    classNames: ['listing-title'],
  });
  const descriptionElement = createNewElement('p', {
    text: listing.description,
    classNames: ['listing-description'],
  });

  // Define default image based on tags, title, or description
  const defaultImage = selectDefaultImage(
    listing.tags,
    listing.title,
    listing.description || ''
  );
  console.log(defaultImage);

  listing.media.forEach((url) => {
    const img = document.createElement('img');
    console.log(img);
    img.className = 'listing-image img-fluid';
    img.alt = listing.title;
    img.onerror = () => {
      console.log(`Error loading image: ${url}, switching to default.`);
      img.src = defaultImage;
    };

    img.src = url;

    imageColumn.appendChild(img);
  });

  //Render tags
  const tagsContainer = createNewElement('ul', {
    classNames: ['tags-container'],
  });
  listing.tags.forEach((tag) => {
    const tagElement = createNewElement('li', {
      text: tag,
      classNames: ['tag'],
    });
    tagsContainer.appendChild(tagElement);
  });

  //Time remaining on bids
  //Add hourglass icon and time remaining
  const timeRemaining = formatTimeRemaining(getTimeRemaining(listing.endsAt));
  const timeText = createNewElement('p', { classNames: ['card-text'] });
  const hourglassIcon = createNewElement('span', {
    classNames: ['material-symbols-outlined', 'align-middle', 'fs-5', 'pe-1'],
    text: 'hourglass_top',
  });
  timeText.appendChild(hourglassIcon);
  timeText.appendChild(document.createTextNode(timeRemaining));

  // Append all elements to container

  detailsColumn.appendChild(titleElement);
  detailsColumn.appendChild(descriptionElement);
  detailsColumn.appendChild(tagsContainer);
  detailsColumn.appendChild(timeText);
}
