import DDMRR from './DDMRR';

(() => {
  const target = document.querySelector('.parent');

  target.addEventListener('click', (event) => {
    event.stopPropagation();
    window.draggingObject = new DDMRR(target);
  });

  window.addEventListener('click', () => {
    window.draggingObject && window.draggingObject.reset();
  });
})();
