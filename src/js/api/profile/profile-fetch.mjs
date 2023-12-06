import { displayError } from '../../utilities/messages/error-handler.mjs';
import { makeApiRequest } from '../api-service.mjs';

export async function getUserProfile(username) {
  try {
    const urlPath = `profiles/${username}`;
    const query = { _listings: true };

    return await makeApiRequest(urlPath, 'GET', null, {}, query);
  } catch (error) {
    console.error('Error fetching user profile:', error);
    displayError();
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
    const wins = userProfile.wins.map((winId) =>
      makeApiRequest(`listings/${winId}`, 'GET')
    );
    return Promise.all(wins);
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

    console.log('getUserBids data:', bids);
    return bids;
  } catch (error) {
    console.error('Error fetching user bids:', error);
    displayError();
  }
}
