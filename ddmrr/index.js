import DDMRR from './DDMRR';

(() => {
  Array.prototype.forEach.call(document.querySelectorAll('.parent'), (dom) => {
    return new DDMRR(dom);
  });
})();
