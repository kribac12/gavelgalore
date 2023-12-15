import { createNewElement } from './createHTML.mjs';

export function createFormFieldWithLabel(
  fieldType,
  attributes,
  label,
  containerClassNames = [],
  inputClassNames = []
) {
  // Create container for the input and label
  const container = createNewElement('div', {
    classNames: ['form-group'].concat(containerClassNames),
  });

  // Create the label element
  const labelElement = createNewElement('label', {
    text: label,
    attributes: { for: attributes.id },
  });

  // Create the input element
  const inputElement = createNewElement(fieldType, {
    attributes: attributes,
    classNames: ['form-control'].concat(inputClassNames),
  });

  // Append the label and input to the container
  container.appendChild(labelElement);
  container.appendChild(inputElement);

  return container;
}
