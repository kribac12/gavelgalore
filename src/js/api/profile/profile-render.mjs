import { createNewElement } from '../../create-html/createHTML.mjs';

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
  container.prepend(header);
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

export function populateListings(
  listings,
  contentContainerId,
  createCardFunction,
  showAll = false
) {
  const contentContainer = document.getElementById(contentContainerId);
  contentContainer.innerHTML = '';
  const listingsToDisplay = showAll ? listings : listings.slice(0, 4);
  listingsToDisplay.forEach((listing) => {
    const card = createCardFunction(listing);
    contentContainer.appendChild(card);
  });

  if (!showAll && listings.length > 4) {
    const showAllButton = createNewElement('button', {
      text: 'Show all',
      classNames: ['btn', 'btn-primary', 'mt-2'],
    });
    showAllButton.addEventListener('click', () => {
      populateListings(listings, contentContainerId, createCardFunction, true);
    });
    contentContainer.appendChild(showAllButton);
  }
}

export function populateWins(
  wins,
  contentContainerId,
  createCardFunction,
  showAll = false
) {
  const contentContainer = document.getElementById(contentContainerId);
  contentContainer.innerHTML = '';

  // Slice the wins array to display only a limited number of wins initially
  const winsToDisplay = showAll ? wins : wins.slice(0, 4);
  winsToDisplay.forEach((win) => {
    const card = createCardFunction(win);
    contentContainer.appendChild(card);
  });

  // Adding a 'Show all' button if there are more than 4 wins
  if (!showAll && wins.length > 4) {
    const showAllButton = createNewElement('button', {
      text: 'Show all',
      classNames: ['btn', 'btn-primary', 'mt-2'],
    });
    showAllButton.addEventListener('click', () => {
      populateWins(wins, contentContainerId, createCardFunction, true);
    });
    contentContainer.appendChild(showAllButton);
  }
}

export function populateBids(
  bids,
  contentContainerId,
  createCardFunction,
  showAll = false
) {
  const contentContainer = document.getElementById(contentContainerId);
  contentContainer.innerHTML = '';

  const bidsToDisplay = showAll ? bids : bids.slice(0, 4);

  bidsToDisplay.forEach((bid) => {
    console.log('Bid data:', bid);
    const card = createCardFunction(bid);
    contentContainer.appendChild(card);
  });

  if (!showAll && bids.length > 4) {
    const showAllButton = createNewElement('button', {
      text: 'Show all',
      classNames: ['btn', 'btn-primary', 'mt-2'],
    });
    showAllButton.addEventListener('click', () => {
      populateBids(bids, contentContainerId, createCardFunction, true);
    });
    contentContainer.appendChild(showAllButton);
  }
}
