import { makeApiRequest } from '../api-service.mjs';
import { getUserInfo } from '../../storage/storage.mjs';
import { displayError } from '../../utilities/messages/error-handler.mjs';

export async function updateAvatar(newAvatarUrl) {
  const userInfo = getUserInfo();
  if (!userInfo || !userInfo.name) {
    console.error('User information not found.');
    return null;
  }

  const username = userInfo.name;
  const path = `profiles/${username}/media`;
  const method = 'PUT';
  const body = { avatar: newAvatarUrl };
  console.log('Updating avatar for:', username);
  console.log('New avatar URL:', newAvatarUrl);

  try {
    const response = await makeApiRequest(path, method, body);
    console.log('Api response:', response);
    return response;
  } catch (error) {
    console.error('Error updating avatar:', error);
    displayError();
  }
}
