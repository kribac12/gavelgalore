import { createNewElement } from '../../create-html/createHTML.mjs';
import { selectDefaultImage } from '../../utilities/default-image-selector.mjs';
import {
  formatTimeRemaining,
  getTimeRemaining,
} from '../../utilities/date-time.mjs';

export function createBidCard(bid) {
  const listing = bid.listing;

  const card = createNewElement('div', {
    classNames: ['col-sm-6', 'col-md-6', 'col-lg-3', 'listing-card'],
  });
  const cardInner = createNewElement('div', { classNames: ['card', 'w-70'] });
  card.appendChild(cardInner);

  const title = listing.title || '';
  const description = listing.description || '';
  // If listing doesn't have tags or tags are undefined, use an empty array
  const tags = listing.tags || [];

  // Select a default image
  const defaultImage = selectDefaultImage(
    tags, // Pass the tags array, which could be empty
    title,
    description
  );
  let imageUrl =
    listing.media && listing.media.length > 0 ? listing.media[0] : defaultImage;
  const img = createNewElement('img', {
    className: 'card-img-top',
    attributes: { src: imageUrl, alt: listing.title },
  });
  img.onerror = () => {
    img.src = defaultImage;
  };

  cardInner.appendChild(img);
  const cardBody = createNewElement('div', { classNames: ['card-body'] });
  cardInner.appendChild(cardBody);

  cardBody.appendChild(
    createNewElement('h3', { classNames: ['card-title'], text: listing.title })
  );
  cardBody.appendChild(
    createNewElement('p', {
      classNames: ['card-text'],
      text: listing.description,
    })
  );

  const bidInfoText = createNewElement('p', {
    classNames: ['card-text'],
    text: `Bid: ${bid.amount} - Date: ${new Date(
      bid.created
    ).toLocaleDateString()}`,
  });
  cardBody.appendChild(bidInfoText);

  // Hourglass icon and time remaining
  const timeRemaining = formatTimeRemaining(getTimeRemaining(listing.endsAt));
  const timeText = createNewElement('p', { classNames: ['card-text'] });
  const hourglassIcon = createNewElement('span', {
    classNames: ['material-symbols-outlined', 'align-middle', 'fs-5', 'pe-1'],
    text: 'hourglass_top',
  });
  timeText.appendChild(hourglassIcon);
  timeText.appendChild(document.createTextNode(timeRemaining));
  cardBody.appendChild(timeText);

  card.addEventListener('click', () => {
    window.location.href = `/src/html/listing-specific/index.html?id=${listing.id}`;
  });
  return card;
}
