/* eslint-disable consistent-return */

function createValidateDOMElement(isRequired = false) {
  // Given a set of props, a propname, and a component that's receiving
  // the props, verify that the prop is a DOM Element, or throw an Error.
  return function validateDOMElement(props, propName, componentName) {
    const prop = props[propName];
    if (prop instanceof Element === false) {
      return new Error(
        `Invalid prop \`${propName}\` supplied to \`${componentName}\`, expected a DOM Element.`,
      );
    }
    if ((prop === null || prop === undefined) && isRequired) {
      return new Error(
        `Missing prop \`${propName}\` not supplied to \`{componentName}\`, expected a DOM Element.`,
      );
    }
  };
}

// validateDOMElement can be passed as a prop-type that will check that
// a given prop is a DOM Element. Comes in required and not-required flavours.
const validateDOMElement = createValidateDOMElement();
validateDOMElement.isRequired = createValidateDOMElement(true);

export default validateDOMElement;
