import { createNewElement } from '../../utilities/createHTML.mjs';

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
