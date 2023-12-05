import { createNewElement } from '../../create-html/createHTML.mjs';
import { createListingCard } from '../listings/listings-render.mjs';

export function renderSectionHeader(containerId, headerText) {
  const container = document.getElementById(containerId);
  if (!container) {
    console.error(`Container not found for: ${containerId}`);
    return;
  }
  const header = createNewElement('h1', {
    text: headerText,
    classNames: ['section-header'],
  });
  container.appendChild(header);
}
export function renderAvatar(avatarUrl) {
  const avatarColumn = document.getElementById('avatarColumn');
  const avatarImage = createNewElement('img', {
    attributes: {
      src: avatarUrl,
      alt: 'User avatar',
    },
    classNames: ['rounded-circle', 'img-fluid', 'avatar-small'],
  });
  avatarColumn.appendChild(avatarImage);
}

export function renderProfileDetails(userProfile) {
  const detailsColumn = document.getElementById('detailsColumn');
  const userName = createNewElement('h1', {
    text: userProfile.name,
    classNames: ['profile-name'],
  });
  detailsColumn.appendChild(userName);
  const listingsCount = createNewElement('p', {
    text: `Listings: ${userProfile._count.listings}`,
    classNames: ['profile-listings'],
  });
  detailsColumn.appendChild(listingsCount);
  const credits = createNewElement('p', {
    text: `Credits: ${userProfile.credits}`,
    classNames: ['profile-credits'],
  });

  detailsColumn.appendChild(credits);
}

export function renderEditAvatarButton() {
  const editAvatarColumn = document.getElementById('editAvatarColumn');
  const editButton = createNewElement('button', {
    text: 'Edit avatar',
    classNames: ['btn', 'btn-primary'],
  });
  editAvatarColumn.appendChild(editButton);
}

export function populateListings(listings, containerId) {
  const container = document.getElementById(containerId);

  if (!container) {
    console.error(`No container found for ID: ${containerId}`);
    return;
  }

  listings.forEach((listing) => {
    const listingCard = createListingCard(listing);
    container.appendChild(listingCard);
  });
}

export function populateBids(bids) {
  const bidsContainer = document.getElementById('bidsContainer');

  if (bidsContainer) {
    bids.forEach((bid) => {
      const bidCard = createListingCard(bid.listing);
      bidsContainer.appendChild(bidCard);
    });
  }
}
export function populateWins(wins) {
  const winsContainer = document.getElementById('winsContainer');
  if (winsContainer) {
    wins.forEach((win) => {
      const winCard = createListingCard(win);
      winsContainer.appendChild(winCard);
    });
  }
}
