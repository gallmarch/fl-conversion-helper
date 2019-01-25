// Taken from:
// https://github.com/flyingant/react-scroll-to-component/blob/1d11ffa525dec9ade68a3f4b52612ed4a17716af/index.js
export default function calculateScrollOffset(element, offset, alignment) {
  const body = document.body;
  const html = document.documentElement;
  const elementRect = element.getBoundingClientRect();
  const clientHeight = html.clientHeight;
  const documentHeight = Math.max(
    body.scrollHeight,
    body.offsetHeight,
    html.clientHeight,
    html.scrollHeight,
    html.offsetHeight,
  );
  let scrollPosition;
  switch (alignment) {
    case 'top':
      scrollPosition = elementRect.top;
      break;
    case 'middle':
      scrollPosition = elementRect.bottom - (clientHeight / 2) - (elementRect.height / 2);
      break;
    case 'bottom':
      scrollPosition = elementRect.bottom - clientHeight;
      break;
    default:
      scrollPosition = elementRect.bottom - (clientHeight / 2) - (elementRect.height / 2);
      break; // default to middle
  }
  const maxScrollPosition = documentHeight - clientHeight;
  return Math.min(scrollPosition + (offset || 0) + window.pageYOffset, maxScrollPosition);
}
