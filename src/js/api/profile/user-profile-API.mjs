import { displayError } from '../../utilities/messages/error-handler.mjs';
import { makeApiRequest } from '../api-service.mjs';

/**
 * Fetches user profile for a given username. Includes wins, bids and listings for that specific user.
 * If error occurs during fetch, it is logged and a default profile structure with empty arrays for wins,
 * bids and listings are returned.
 *
 * @async
 * @function getUserProfile
 * @param {string} username - Username of the user's profile fetched.
 * @returns {Promise<Object>} - Promise that resolves to the user's profile object.
 */

export async function getUserProfile(username) {
  try {
    const urlPath = `profiles/${username}`;
    const query = { _listings: true };

    const profile = await makeApiRequest(urlPath, 'GET', null, {}, query);

    // Ensure that 'wins', 'bids', and 'listings' are always arrays
    profile.wins = Array.isArray(profile.wins) ? profile.wins : [];
    profile.bids = Array.isArray(profile.bids) ? profile.bids : [];
    profile.listings = Array.isArray(profile.listings) ? profile.listings : [];

    return profile;
  } catch (error) {
    console.error('Error fetching user profile:', error);
    displayError();

    // Return a default profile structure in case of error
    return {
      wins: [], // Empty array for wins
      bids: [], // Empty array for bids
      listings: [], // Empty array for listings
      // Include any other default values for the user profile structure here
    };
  }
}

/**
 * Retrieves listings made by given username. In case of error, error is logged.
 *
 * @async
 * @function getUserListings
 * @param {string} username - Username of the user whose listings are fetched.
 * @returns {Promise<Array>} - Promise that resolves to an array of listings.
 */

export async function getUserListings(username) {
  try {
    const urlPath = `profiles/${username}/listings`;

    const query = { _seller: true, _bids: true };
    const listings = await makeApiRequest(urlPath, 'GET', null, {}, query);

    return listings;
  } catch (error) {
    console.error('Error fetching user listings:', error);
    displayError();
  }
}

/**
 * Fetches and returns auction wins for a given username.
 * Processes each of the wins to make sure data is valid, sorts them
 * in descending order by end date. Logs error if it occurs.
 *
 * @async
 * @function getUserWins
 * @param {string} username - Username of user whose wins are fetched.
 * @returns {Promise<Array>} - Promise that resolves to an array of user's wins.
 */

export async function getUserWins(username) {
  try {
    const userProfile = await getUserProfile(username);

    let wins = await Promise.all(
      userProfile.wins.map(async (winId) => {
        try {
          const listing = await makeApiRequest(
            `listings/${winId}?_bids=true`,
            'GET'
          );
          return listing;
        } catch (error) {
          console.error(`Error fetching listing ${winId}:`, error);
          // Check if the error is a 404 (listing not found)
          if (error.message && error.message.includes('404')) {
            console.log(`Listing ${winId} not found, skipping.`);
            return null; // Return null for 404 errors
          }
          throw error;
        }
      })
    );

    // Filter out null values and sort wins in descending order
    wins = wins
      .filter((win) => win !== null)
      .sort((a, b) => new Date(b.endsAt) - new Date(a.endsAt));
    return wins;
  } catch (error) {
    console.error('Error fetching wins:', error);
    displayError();
  }
}

/**
 * Retrieves bids made by given username. If error, logs the error.
 *
 * @async
 * @function getUserBids
 * @param {string} username - Username of the user whose bids are fetched.
 * @returns {Promise<Array>} - Promise that resolves to an array of bids.
 */

export async function getUserBids(username) {
  try {
    const urlPath = `profiles/${username}/bids`;
    const query = { _listings: true };
    const bids = await makeApiRequest(urlPath, 'GET', null, {}, query);

    return bids;
  } catch (error) {
    console.error('Error fetching user bids:', error);
    displayError();
  }
}
