import { getTimeRemainingFormatted } from '../utilities/date-time.mjs';
import { createNewElement } from '../utilities/createHTML.mjs';
import { selectDefaultImage } from '../utilities/default-image-selector.mjs';
import { limitTags, trimText } from '../utilities/text-trimmer.mjs';
import { isValidUrl } from '../utilities/valid-url.mjs';

/**
 * Creates and returns listing cards.
 *
 * @param {Object} listing - Listing object to create card for.
 * @returns {HTMLElement} - Card element for the listing.
 */

export function createListingCard(listing) {
  const { media, bids, tags, title, description, created, endsAt } = listing;

  const imageUrl =
    media && media.length > 0 && isValidUrl(media[0])
      ? media[0]
      : selectDefaultImage(tags, title, description);

  const card = createNewElement('div', {
    classNames: ['col-sm-6', 'col-md-6', 'col-lg-3', 'listing-card'],
  });
  const cardInner = createNewElement('div', { classNames: ['card', 'w-70'] });
  card.appendChild(cardInner);

  const img = createNewElement('img', {
    className: 'card-img-top',
    attributes: { src: imageUrl, alt: title },
  });

  img.onerror = () => {
    img.src = selectDefaultImage([], title, '');
  };
  cardInner.appendChild(img);

  // Determine highest bid
  const highestBidAmount =
    bids && bids.length > 0
      ? bids.reduce(
          (max, bid) => (bid.amount > max.amount ? bid : max),
          bids[0]
        ).amount
      : 'No bids';

  // Add card-img-overlay with bids
  const overlay = createNewElement('div', {
    classNames: ['card-img-overlay'],
  });
  const bidsText = createNewElement('p', {
    classNames: [
      'card-text',
      'btn',
      'btn-secondary',
      'position-absolute',
      'top-0',
      'end-0',
      'bid-button',
    ],
    text: `Highest bid: ${highestBidAmount}`,
  });
  overlay.appendChild(bidsText);
  cardInner.appendChild(overlay);

  //Add card body
  const cardBody = createNewElement('div', { classNames: ['card-body'] });
  cardInner.appendChild(cardBody);

  //Add title, description, etc
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
  cardBody.appendChild(
    createNewElement('p', {
      classNames: ['card-text', 'creation-date'],
      text: creationDateText,
    })
  );

  // Create container for tags
  const tagsContainer = createNewElement('div', {
    classNames: ['tags-container', 'mb-2'],
  });

  // Limit the number of tags to display
  limitTags(tags, 3).forEach((tag) => {
    tagsContainer.appendChild(
      createNewElement('span', {
        classNames: ['badge', 'bg-secondary', 'me-1', 'py-2'],
        text: tag,
      })
    );
  });
  cardBody.appendChild(tagsContainer);

  //Add hourglass icon and time remaining
  const timeRemaining = getTimeRemainingFormatted(endsAt);
  const timeRemainingElement = createNewElement('p', {
    classNames: ['card-text'],
  });
  timeRemainingElement.appendChild(
    createNewElement('span', {
      classNames: ['material-symbols-outlined', 'align-middle', 'fs-5', 'pe-1'],
      text: 'hourglass_top',
    })
  );

  timeRemainingElement.appendChild(document.createTextNode(timeRemaining));
  cardBody.appendChild(timeRemainingElement);

  card.addEventListener('click', () => {
    window.location.href = `/src/html/listing-specific/index.html?id=${listing.id}`;
  });
  return card;
}
