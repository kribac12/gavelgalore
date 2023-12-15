import {
  getUserBids,
  getUserListings,
  getUserProfile,
  getUserWins,
} from './user-profile-API.mjs';
/**
 * Fetches user data based on username.
 * Retrieves aspects of user data as profile, listings, wins and bids.
 * Each aspect is fetched from a corresponding service function.
 *
 * @async
 * @function fetchUserData
 * @param {string} username - The user for who the data is fetched.
 * @returns {Promise<Object>} - Promise that resolves to an object containing user data;
 * `userProfile`: profile information, `userListings`: listings made by the user, `userWins`: wins by the user, and `userBids`: bids made by user.
 *
 */
export async function fetchUserData(username) {
  const userProfile = await getUserProfile(username);
  const userListings = await getUserListings(username);
  const userWins = await getUserWins(username);
  const userBids = await getUserBids(username);

  return { userProfile, userListings, userWins, userBids };
}
