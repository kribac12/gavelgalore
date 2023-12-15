import { createNewElement } from './createHTML.mjs';

/**
 * Creates a Bootstrap carousel component with given images.
 *
 * @param {string[]} imageUrls - Array of URLs for the images to be included in the carousel.
 * @param {string} carouselId - Unique identifier for the carousel element.
 * @returns {HTMLElement} - A Bootstrap carousel element populated with images.
 */
export function createBootstrapCarousel(imageUrls, carouselId) {
  const carousel = createNewElement('div', {
    classNames: ['carousel', 'slide'],
    attributes: { id: carouselId },
  });

  const indicators = createNewElement('ol', {
    classNames: ['carousel-indicators'],
  });
  const inner = createNewElement('div', { classNames: ['carousel-inner'] });

  imageUrls.forEach((url, index) => {
    const indicator = createNewElement('li', {
      attributes: {
        'data-bs-target': `#${carouselId}`,
        'data-bs-slide-to': index.toString(),
        'aria-label': `Slide ${index + 1}`,
      },
      classNames: index === 0 ? ['active'] : [],
    });

    const item = createNewElement('div', {
      classNames: ['carousel-item', ...(index === 0 ? ['active'] : [])],
    });

    const img = createNewElement('img', {
      classNames: ['d-block', 'w-100'],
      attributes: { src: url, alt: `Slide ${index + 1}` },
    });

    item.appendChild(img);
    inner.appendChild(item);
    indicators.appendChild(indicator);
  });

  carousel.appendChild(indicators);
  carousel.appendChild(inner);

  const prevButton = createNewElement('button', {
    classNames: ['carousel-control-prev'],
    attributes: {
      type: 'button',
      'data-bs-target': `#${carouselId}`,
      'data-bs-slide': 'prev',
    },
    childElements: [
      createNewElement('span', {
        classNames: ['carousel-control-prev-icon'],
        attributes: { 'aria-hidden': 'true' },
      }),
      createNewElement('span', {
        classNames: ['visually-hidden'],
        text: 'Previous',
      }),
    ],
  });

  const nextButton = createNewElement('button', {
    classNames: ['carousel-control-next'],
    attributes: {
      type: 'button',
      'data-bs-target': `#${carouselId}`,
      'data-bs-slide': 'next',
    },
    childElements: [
      createNewElement('span', {
        classNames: ['carousel-control-next-icon'],
        attributes: { 'aria-hidden': 'true' },
      }),
      createNewElement('span', {
        classNames: ['visually-hidden'],
        text: 'Next',
      }),
    ],
  });

  carousel.appendChild(prevButton);
  carousel.appendChild(nextButton);

  return carousel;
}
