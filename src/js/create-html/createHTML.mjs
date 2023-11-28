export function createNewElement(elementType, options = {}) {
  const element = document.createElement(elementType);

  // Apply styles
  if (options.styles) {
    Object.assign(element.style, options.styles);
  }

  // Apply class name
  if (options.classNames) {
    element.classList.add(...options.classNames);
  } else if (options.className) {
    element.className = options.className;
  }

  // Set text content
  if (options.text) {
    element.innerText = options.text;
  }

  // Append child elements
  if (options.childElements) {
    options.childElements.forEach((child) => element.appendChild(child));
  }

  // Set attributes
  if (options.attributes) {
    for (const [key, value] of Object.entries(options.attributes)) {
      element.setAttribute(key, value);
    }
  }

  return element;
}
