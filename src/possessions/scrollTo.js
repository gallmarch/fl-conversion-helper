/* eslint-disable */
// Slightly adapted from:
// https://gist.github.com/andjosh/6764939

export default function scrollTo({ element, start, to, duration }) {
  const change = to - start;
  const increment = 20;

  let currentTime = 0;

  const animateScroll = () => {
    currentTime += increment;
    const val = easeInOutQuad(currentTime, start, change, duration);
    window.scrollTo(0, val);
    if (currentTime < duration) {
      setTimeout(animateScroll, increment);
    }
  };

  animateScroll();
}


// t = current time
// b = start value
// c = change in value
// d = duration
export function easeInOutQuad(t, b, c, d) {
  t /= d / 2;
  if (t < 1) return c / 2 * t * t + b;
  t--;
  return -c / 2 * (t * (t - 2) - 1) + b;
};
