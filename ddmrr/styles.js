const dragPanel = {
  position: 'absolute',
  cursor: 'move',
  display: 'none',
};

const resizeAnchor = {
  position: 'absolute',
  pointerEvents: 'auto',
  width: '12px',
  height: '12px',
  cursor: 'default',
  display: 'none',
};

const rotateAnchor = {
  position: 'absolute',
  width: '12px',
  height: '12px',
  borderRadius: '12px',
  display: 'none',
};

export default {
  dragPanel,
  resizeAnchor,
  rotateAnchor,
};
