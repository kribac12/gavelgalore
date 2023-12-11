import { displayError } from '../../utilities/messages/error-handler.mjs';
import { makeApiRequest } from '../api-service.mjs';

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

export async function getUserListings(username) {
  try {
    const urlPath = `profiles/${username}/listings`;

    const query = { _seller: true, _bids: true };
    const listings = await makeApiRequest(urlPath, 'GET', null, {}, query);
    console.log('getUserListings data:', listings);
    return listings;
  } catch (error) {
    console.error('Error fetching user listings:', error);
    displayError();
  }
}

export async function getUserWins(username) {
  try {
    const userProfile = await getUserProfile(username);
    console.log('User profile wins:', userProfile.wins);
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
