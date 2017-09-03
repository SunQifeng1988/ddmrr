import DDMRR from './DDMRR';

(() => {
  const target1 = document.querySelector('.target1');
  const target2 = document.querySelector('.target2');
  const target3 = document.querySelector('.target3');
  const target4 = document.querySelector('.target4');

  target1.addEventListener('click', (event) => {
    event.stopPropagation();
    window.target1 = new DDMRR(target1, window);
  });

  target2.addEventListener('click', (event) => {
    event.stopPropagation();
    window.target2 = new DDMRR(target2, window, {
      resize: {
        key: 'resize',
        enable: true,
        preserveAspectRatio: true,
        anchors: ['n', 'e', 's', 'w', 'ne', 'se', 'nw', 'sw'],
      },
    });
  });

  target3.addEventListener('click', (event) => {
    event.stopPropagation();
    window.target3 = new DDMRR(target3, window, {
      resize: {
        key: 'resize',
        enable: true,
        preserveAspectRatio: true,
        anchors: ['n', 'e', 's', 'w', 'ne', 'se', 'nw', 'sw'],
      },
    });

    window.target3.multiple = true;
    window.target3.elements = [document.querySelector('.target3'), document.querySelector('.target4')];
  });

  target4.addEventListener('click', (event) => {
    event.stopPropagation();
    window.target4 = new DDMRR(target4, window, {
      resize: {
        key: 'resize',
        enable: true,
        preserveAspectRatio: true,
        anchors: ['n', 'e', 's', 'w', 'ne', 'se', 'nw', 'sw'],
      },
    });
  });

  window.addEventListener('mousedown', () => {
    window.target1 && window.target1.release();
    window.target1 = null;
    window.target2 && window.target2.release();
    window.target2 = null;
    window.target3 && window.target3.release();
    window.target3 = null;
    window.target4 && window.target4.release();
    window.target4 = null;
  });
})();
