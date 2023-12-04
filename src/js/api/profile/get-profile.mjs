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
