export default function isLegacy() {
  // TODO: inspect the DOM to decide whether we are on the legacy UI
  // or not
  return [...document.querySelectorAll('script')]
    .filter(x => x.getAttribute('src'))
    .filter(x => x.getAttribute('src').indexOf('ui26.js') >= 0)
    .length > 0;
}
