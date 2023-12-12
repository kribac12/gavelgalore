import { createNewElement } from '../../utilities/createHTML.mjs';

/**
 * Populates the seller details section with information such as the seller's avatar, name, and email.
 *
 * @param {Object} listing - The listing object containing seller information.
 * @param {HTMLElement} sellerDetails - The HTML element where seller details will be displayed.
 */

export function populateSellerDetails(listing, sellerDetails) {
  const sellerAvatar = listing.seller?.avatar || '/assets/images/flower.jpg';
  const sellerName = listing.seller?.name || 'No seller name';
  const sellerEmail = listing.seller?.email || 'No seller email';

  sellerDetails.appendChild(
    createNewElement('h1', {
      text: 'Seller',
      classNames: ['seller-details-title', 'mb-4'],
    })
  );

  sellerDetails.appendChild(
    createNewElement('img', {
      attributes: { src: sellerAvatar, alt: `Avatar of ${sellerName}` },
      classNames: [
        'seller-avatar',
        'rounded-circle',
        'img-fluid',
        'avatar-small',
        'mb-4',
      ],
    })
  );
  sellerDetails.appendChild(
    createNewElement('p', { text: `Seller: ${sellerName}` })
  );
  sellerDetails.appendChild(
    createNewElement('p', { text: `Email: ${sellerEmail}` })
  );
}
