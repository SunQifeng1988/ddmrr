import DDMRR from './DDMRR';

window.getComputedLocation = (dom) => {
  const style = getComputedStyle(dom);
  return {
    left: parseFloat(style.left),
    right: parseFloat(style.right),
    width: parseFloat(style.width),
    height: parseFloat(style.height),
    top: parseFloat(style.top),
    bottom: parseFloat(style.bottom),
    borderTop: parseFloat(style.borderTopWidth),
    borderBottom: parseFloat(style.borderBottomWidth),
    borderLeft: parseFloat(style.borderLeftWidth),
    borderRight: parseFloat(style.borderRightWidth),
  };
};

(() => {
  Array.prototype.forEach.call(document.querySelectorAll('.parent'), (dom) => {
    console.log(getComputedLocation(dom));
    console.log(dom.getBoundingClientRect());
    return new DDMRR(dom);
  });
})();
