import { selectDefaultImage } from '../../utilities/default-image-selector.mjs';
import { createNewElement } from '../../utilities/createHTML.mjs';
import { createBootstrapCarousel } from '../../utilities/carousel.mjs';

/**
 * Populates the image column of a listing with a carousel of images if available, or a default image otherwise.
 *
 * @param {Object} listing - The listing object with media information.
 * @param {HTMLElement} imageColumn - The HTML element where the carousel will be displayed.
 */

export function populateImageColumn(listing, imageColumn) {
  if (listing.media && listing.media.length > 0) {
    // Use the createBootstrapCarousel function
    const carouselId = 'listingCarousel';
    const carousel = createBootstrapCarousel(listing.media, carouselId);
    imageColumn.appendChild(carousel);
  } else {
    // Fallback to default image if no media
    const defaultImage = selectDefaultImage(
      listing.tags,
      listing.title,
      listing.description || ''
    );
    const img = createNewElement('img', {
      classNames: ['listing-image', 'img-fluid', 'w-100'],
      attributes: { src: defaultImage, alt: listing.title },
    });
    img.onerror = () => {
      img.src = defaultImage;
    };
    imageColumn.appendChild(img);
  }
}
