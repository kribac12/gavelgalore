/**
 * Creates a new HTML element with properties and attributes.
 *
 * @param {*} elementType - Type of the HTML element.
 * @param {Object} options - Options to customize element.
 * @param {Object} options.styles - Styles to apply.
 * @param {string} options.className - Class name for the element.
 * @param {Array<string>} options.classNames - Array of class names for the element.
 * @param {string} options.text - Text to be set as innerText.
 * @param {HTMLElement[]} options.childElements - Array of child elements to append.
 * @param {Object} options.attributes - Additional attributes.
 * @returns {HTMLElement} - The created HTML element.
 */

export function createNewElement(
  elementType,
  { styles, className, classNames, text, childElements, ...attributes } = {}
) {
  const element = document.createElement(elementType);
  if (styles) {
    Object.assign(element.style, styles);
  }
  if (classNames) {
    element.classList.add(...classNames);
  } else if (className) {
    element.className = className;
  }
  if (text) {
    element.innerText = text;
  }

  if (childElements) {
    childElements.forEach((child) => element.appendChild(child));
  }

  Object.assign(element, attributes);

  return element;
}
