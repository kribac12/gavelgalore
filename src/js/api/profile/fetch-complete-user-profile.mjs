import {
  getUserBids,
  getUserListings,
  getUserProfile,
  getUserWins,
} from './user-profile-API.mjs';

export async function fetchUserData(username) {
  const userProfile = await getUserProfile(username);
  const userListings = await getUserListings(username);
  const userWins = await getUserWins(username);
  const userBids = await getUserBids(username);

  return { userProfile, userListings, userWins, userBids };
}
