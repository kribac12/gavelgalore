import { createNewElement } from '../../utilities/createHTML.mjs';
import { selectDefaultImage } from '../../utilities/default-image-selector.mjs';
import { getTimeRemainingFormatted } from '../../utilities/date-time.mjs';
import { limitTags, trimText } from '../../utilities/text-trimmer.mjs';
import { isValidUrl } from '../../utilities/valid-url.mjs';

/**
 * Creates and returns card element for listings bid on.
 *
 * @param {Object} bid - The bid object to create a card for.
 * @param {Object} bid.listing - Listing associated with bid.
 * @returns {HTMLElement|null} - Card element representing the listing with bid or null if data is missing.
 */

export function createBidCard(bid) {
  const { listing } = bid;

  if (!listing) {
    console.error('Listing data is missing in the bid:', bid);
    return null;
  }

  const {
    media,
    title = '',
    description = '',
    tags = [],
    created,
    endsAt,
  } = listing;

  const card = createNewElement('div', {
    classNames: ['col-sm-6', 'col-md-6', 'col-lg-3', 'listing-card'],
  });
  const cardInner = createNewElement('div', { classNames: ['card', 'w-70'] });
  card.appendChild(cardInner);

  const imageUrl =
    media && media.length > 0 && isValidUrl(media[0])
      ? media[0]
      : selectDefaultImage(tags, title, description);

  const img = createNewElement('img', {
    className: 'card-img-top',
    attributes: { src: imageUrl, alt: title },
  });

  img.onerror = () => {
    img.src = selectDefaultImage([], title, '');
  };
  cardInner.appendChild(img);

  // Add card-img-overlay with bid count
  const overlay = createNewElement('div', {
    classNames: ['card-img-overlay'],
  });
  const bidCountText = createNewElement('p', {
    classNames: [
      'card-text',
      'btn',
      'btn-secondary',
      'position-absolute',
      'top-0',
      'end-0',
      'bid-button',
    ],
    text: `Highest bid: ${bid.amount}`,
  });
  overlay.appendChild(bidCountText);
  cardInner.appendChild(overlay);

  const cardBody = createNewElement('div', { classNames: ['card-body'] });
  cardInner.appendChild(cardBody);

  cardBody.appendChild(
    createNewElement('h3', {
      classNames: ['card-title'],
      text: trimText(title, 40),
    })
  );
  cardBody.appendChild(
    createNewElement('p', {
      classNames: ['card-text'],
      text: trimText(description, 100),
    })
  );

  //Format creation date
  const creationDateText = `Created: ${new Date(created).toLocaleDateString()}`;
  const creationDateElement = createNewElement('p', {
    classNames: ['card-text', 'creation-date'],
    text: creationDateText,
  });

  cardBody.appendChild(creationDateElement);

  // Create container for tags
  const tagsContainer = createNewElement('div', {
    classNames: ['tags-container', 'mb-2'],
  });

  limitTags(tags, 3).forEach((tag) => {
    tagsContainer.appendChild(
      createNewElement('span', {
        classNames: ['badge', 'bg-secondary', 'me-1'],
        text: tag,
      })
    );
  });

  cardBody.appendChild(tagsContainer);

  // Hourglass icon and time remaining
  const timeRemaining = getTimeRemainingFormatted(endsAt);
  const timeText = createNewElement('p', { classNames: ['card-text'] });
  timeText.appendChild(
    createNewElement('span', {
      classNames: ['material-symbols-outlined', 'align-middle', 'fs-5', 'pe-1'],
      text: 'hourglass_top',
    })
  );
  timeText.appendChild(document.createTextNode(timeRemaining));
  cardBody.appendChild(timeText);

  card.addEventListener('click', () => {
    window.location.href = `/src/html/listing-specific/index.html?id=${listing.id}`;
  });
  return card;
}
