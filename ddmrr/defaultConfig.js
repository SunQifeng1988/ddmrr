export default {
  anchorBorder: '1px solid rgb(25, 172, 225)',
  anchorBackgroundColor: 'white',
  panelBorder: '1px solid rgb(25, 172, 225)',
  panelBackgroundColor: 'rgba(0,0,0,0.2)',
  move: {
    key: 'move',
    enable: true,
  },
  resize: {
    key: 'resize',
    enable: true,
    preserveAspectRatio: false,
    anchors: ['n', 'e', 's', 'w', 'ne', 'se', 'nw', 'sw'],
  },
  rotate: {
    key: 'rotate',
    enable: true,
  },
};
