import { createNewElement } from '../../utilities/createHTML.mjs';

/**
 * Renders a section header in a specified container
 *
 * @param {string} containerId - The ID of the container for the header.
 * @param {string} headerText - Text for header.
 * @returns
 */

export function renderSectionHeader(containerId, headerText) {
  const container = document.getElementById(containerId);
  if (!container) {
    console.error(`Container not found for: ${containerId}`);
    return;
  }
  const header = createNewElement('h2', {
    text: headerText,
    classNames: ['section-header', 'mt-5'],
  });
  container.prepend(header);
}

/**
 * Renders avatar image in column.
 *
 * @param {string} avatarUrl - URL of avatar image.
 */
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

/**
 * Renders profile details like name, listings count, and credits.
 *
 * @param {Object} userProfile - User profile object.
 */
export function renderProfileDetails(userProfile) {
  const detailsColumn = document.getElementById('detailsColumn');
  const userName = createNewElement('h1', {
    text: userProfile.name,
    classNames: ['profile-name'],
  });
  detailsColumn.appendChild(userName);

  const { _count: { listings } = {}, credits } = userProfile;
  const listingsCount = createNewElement('p', {
    text: `Listings: ${listings}`,
    classNames: ['profile-listings'],
  });
  detailsColumn.appendChild(listingsCount);

  const creditsElement = createNewElement('p', {
    text: `Credits: ${credits}`,
    classNames: ['profile-credits'],
  });

  detailsColumn.appendChild(creditsElement);
}

/**
 * Populates section with a list of cards created from an array of listings
 *
 * @param {Array} listings - Array of listing objects to create cards for.
 * @param {string} contentContainerId - ID of container to populate.
 * @param {Function} createCardFunction - Function to create card elements.
 * @param {boolean} showAll - Flag to show all / show less listings.
 */
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

/**
 * Populates a section with a list of listings won by user.
 *
 * @param {Array} wins - Array of won listings.
 * @param {string} contentContainerId - ID of container to populate.
 * @param {Function} createCardFunction -Function to create card elements.
 * @param {boolean} showAll - Flag to show all / show less.
 */

export function populateWins(
  wins,
  contentContainerId,
  createCardFunction,
  showAll = false
) {
  const contentContainer = document.getElementById(contentContainerId);
  contentContainer.innerHTML = '';
  // Check if 'wins' is undefined or not an array, and handle accordingly
  if (!Array.isArray(wins)) {
    console.error('populateWins: wins is not an array', wins);
    // Optionally, display a message or handle the empty state
    contentContainer.innerHTML = '<p>No wins to display.</p>';
    return;
  }
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

/**
 * Populates a section with listings user has bid on, filtering out duplicates.
 *
 * @param {Array} bids - Array of bid listings to create cards for.
 * @param {string} contentContainerId - ID of container to populate.
 * @param {Function} createCardFunction - Function to create card elements.
 * @param {boolean} showAll - Flag to show more/ show less listings.
 */
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
