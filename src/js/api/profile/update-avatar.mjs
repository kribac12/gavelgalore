import { makeApiRequest } from '../api-service.mjs';
import { getUserInfo } from '../../storage/storage.mjs';
import { displayError } from '../../utilities/messages/error-handler.mjs';

/**
 * Updates avatar for current user. Retrieves user's information,
 * makes API request path, and sends PUT request to update avatar.
 * If user info is not found, it redirects to login page and returns null.
 * Upon success, it returns the response from the API.
 * If there is an error during the request, error is logged and error message displayed.
 *
 * @async
 * @function updateAvatar
 * @param {string} newAvatarUrl - New URL to be set as avatar.
 * @returns {Promise<Object|null>} - Promise that resolves to the API response object upon success,
 * or null if information is not found. Handles error if it occurs.
 */
export async function updateAvatar(newAvatarUrl) {
  const userInfo = getUserInfo();
  if (!userInfo || !userInfo.name) {
    console.error(
      'User information not found. Redirecting to login page or appropriate UI.'
    );
    window.location.href = '/src/html/login-register/index.html';
    return null;
  }

  const username = userInfo.name;
  const path = `profiles/${username}/media`;
  const method = 'PUT';
  const body = { avatar: newAvatarUrl };

  try {
    const response = await makeApiRequest(path, method, body);
    return response;
  } catch (error) {
    console.error('Error updating avatar:', error);
    displayError(
      'Error updating avatar.',
      +error.message,
      'avatarErrorContainer'
    );
    throw error;
  }
}
