import { createNewElement } from '../../create-html/createHTML.mjs';
import { displayError } from '../../utilities/messages/error-handler.mjs';
import { displaySuccess } from '../../utilities/messages/success.mjs';
import { renderAvatar } from './profile-render.mjs';
import { updateAvatar } from './update-avatar.mjs';

export function renderEditAvatarButton() {
  const editAvatarColumn = document.getElementById('editAvatarColumn');
  const input = createNewElement('input', {
    attributes: {
      type: 'text',
      placeholder: 'Enter new avatar URL',
      id: 'avatarUrlInput',
      style: 'display:none;',
    },
    classNames: ['form-control'],
  });
  const editButton = createNewElement('button', {
    text: 'Edit avatar',
    classNames: ['btn', 'btn-primary'],
  });

  //create update button (hidden initially)
  const updateButton = createNewElement('button', {
    text: 'Update avatar',
    attributes: { id: 'updateAvatarButton', style: 'display:none;' },
    classNames: ['btn', 'btn-primary', 'mt-2'],
  });

  editAvatarColumn.appendChild(input);
  editAvatarColumn.appendChild(updateButton);
  editAvatarColumn.appendChild(editButton);

  editButton.addEventListener('click', () => {
    input.style.display = '';
    updateButton.style.display = '';
    editButton.style.display = 'none';
  });

  updateButton.addEventListener('click', async () => {
    const newAvatarUrl = input.value;

    if (newAvatarUrl) {
      const result = await updateAvatar(newAvatarUrl);

      if (result && result.avatar) {
        // Clear existing avatar
        const avatarColumn = document.getElementById('avatarColumn');
        avatarColumn.innerHTML = '';

        // Render new avatar
        renderAvatar(result.avatar);

        displaySuccess('Avatar updated successfully');

        // Let UI elements back to initial state
        input.style.display = 'none';
        updateButton.style.display = 'none';
        editButton.style.display = '';
        input.value = '';
      } else {
        displayError(
          'Failed to update avatar. Please make sure the URL is correct.'
        );
      }
    } else {
      displayError('Please enter valid URL');
    }
  });
}
