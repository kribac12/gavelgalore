import { createNewElement } from '../../create-html/createHTML.mjs';

export function renderSectionHeader(containerId, headerText) {
  const container = document.getElementById(containerId);
  if (!container) {
    console.error(`Container not found for: ${containerId}`);
    return;
  }
  const header = createNewElement('h1', {
    text: headerText,
    classNames: ['section-header', 'mt-5'],
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

  //Check if show all or show less button is needed

  if (listings.length > 4) {
    const showButton = createNewElement('button', {
      text: showAll ? 'Show less' : 'Show all',
      classNames: ['btn', 'btn-primary', 'mt-2'],
    });
    showButton.addEventListener('click', () => {
      populateListings(
        listings,
        contentContainerId,
        createCardFunction,
        !showAll
      );
    });
    contentContainer.appendChild(showButton);
  }
}

export function populateWins(
  wins,
  contentContainerId,
  createCardFunction,
  showAll = false
) {
  const contentContainer = document.getElementById(contentContainerId);
  console.log('Content container for wins:', contentContainer);
  contentContainer.innerHTML = '';

  // Check if 'wins' is undefined or not an array, and handle accordingly
  if (!Array.isArray(wins)) {
    console.error('populateWins: wins is not an array', wins);
    // Optionally, display a message or handle the empty state
    contentContainer.innerHTML = '<p>No wins to display.</p>';
    return;
  }

  console.log('Wins to be populated:', wins);

  // Slice the wins array to display only a limited number of wins initially
  const winsToDisplay = showAll ? wins : wins.slice(0, 4);
  winsToDisplay.forEach((win) => {
    if (win) {
      const card = createCardFunction(win);
      contentContainer.appendChild(card);
    }
  });

  // Adding a 'Show all' button if there are more than 4 wins
  if (wins.length > 4) {
    const showButton = createNewElement('button', {
      text: showAll ? 'Show less' : 'Show all',
      classNames: ['btn', 'btn-primary', 'mt-4'],
    });
    showButton.addEventListener('click', () => {
      populateWins(wins, contentContainerId, createCardFunction, !showAll);
    });
    contentContainer.appendChild(showButton);
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

  // Filter out duplicates

  const uniqueListingIds = new Set();

  const uniqueBids = bids.filter((bid) => {
    if (!uniqueListingIds.has(bid.listing.id)) {
      uniqueListingIds.add(bid.listing.id);
      return true;
    }
    return false;
  });

  const bidsToDisplay = showAll ? uniqueBids : uniqueBids.slice(0, 4);

  bidsToDisplay.forEach((bid) => {
    const card = createCardFunction(bid);
    contentContainer.appendChild(card);
  });

  if (uniqueBids.length > 4) {
    const showButton = createNewElement('button', {
      text: showAll ? 'Show less' : 'Show all',
      classNames: ['btn', 'btn-primary', 'mt-2'],
    });
    showButton.addEventListener('click', () => {
      populateBids(bids, contentContainerId, createCardFunction, !showAll);
    });
    contentContainer.appendChild(showButton);
  }
}
