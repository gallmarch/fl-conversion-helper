import calculateScrollOffset from './calculateScrollOffset';
import scrollTo from './scrollTo';

export default function scrollToComponentByName(name) {
  const selector = 'h3.heading--2';
  const element = [...document.querySelectorAll(selector)].find(_ => _.innerText.trim() === name);
  if (!element) {
    console.error(`I expected to find an element by selector '${selector}' with innerText '${name}', but failed`);
    return;
  }
  const scrollOffset = calculateScrollOffset(element, 0, 'top');
  scrollTo({
    element: document.body,
    start: window.scrollY,
    to: scrollOffset,
    duration: 180, // wheeeeee
  });
}
