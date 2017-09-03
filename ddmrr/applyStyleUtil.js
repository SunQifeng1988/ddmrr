export default (el, style) => {
  Object.keys(style).forEach((key) => {
    el.style[key] = style[key]; // eslint-disable-line no-param-reassign
  });
};
