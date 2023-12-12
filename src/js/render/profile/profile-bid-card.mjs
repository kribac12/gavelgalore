import { createNewElement } from '../../utilities/createHTML.mjs';
import { selectDefaultImage } from '../../utilities/default-image-selector.mjs';
import { getTimeRemainingFormatted } from '../../utilities/date-time.mjs';
import { limitTags, trimText } from '../../utilities/text-trimmer.mjs';

export function createBidCard(bid) {
  const listing = bid.listing;

  if (!listing) {
    console.error('Listing data is missing in the bid:', bid);
    return null;
  }

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
  const defaultImage = selectDefaultImage(tags, title, description);
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
      text: trimText(listing.title, 40),
    })
  );
  cardBody.appendChild(
    createNewElement('p', {
      classNames: ['card-text'],
      text: trimText(listing.description, 100),
    })
  );

  //Format creation date
  const creationDateText = `Created: ${new Date(
    listing.created
  ).toLocaleDateString()}`;
  const creationDateElement = createNewElement('p', {
    classNames: ['card-text', 'creation-date'],
    text: creationDateText,
  });
  cardBody.appendChild(creationDateElement);

  // Create a container for tags
  const tagsContainer = createNewElement('div', {
    classNames: ['tags-container', 'mb-2'],
  });

  // Limit the number of tags to display
  const displayedTags = limitTags(listing.tags, 3); // Show up to 3 tags

  // Add tags as badges
  displayedTags.forEach((tag) => {
    const tagBadge = createNewElement('span', {
      classNames: ['badge', 'bg-secondary', 'me-1'],
      text: tag,
    });
    tagsContainer.appendChild(tagBadge);
  });

  cardBody.appendChild(tagsContainer);

  // Hourglass icon and time remaining
  const timeRemaining = getTimeRemainingFormatted(listing.endsAt);
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
