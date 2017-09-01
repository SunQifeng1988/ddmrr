import TransformHandler from './TransformHandler';

class MoveHandler extends TransformHandler {
  constructor(draggable, config) {
    super(draggable.parent.dom);
    this.draggable = draggable;
    this.config = config;
  }
  onStart = (event, dragStart) => {
    this.dragStart = dragStart;
    this.originalMatrx = this.getTransformMatrix();
  }

  onEnd = () => {
    // nothing to do here;
  }

  onGoing = (event, dragOver) => {
    const om = this.originalMatrx;
    const offsetX = dragOver.x - this.dragStart.x;
    const offsetY = dragOver.y - this.dragStart.y;

    this.opTarget.style.webkitTransform
      = `matrix(${om[0]},${om[1]},${om[2]},${om[3]},${om[4] + offsetX},${om[5] + offsetY})`;
    this.opTarget.style.transform
      = `matrix(${om[0]},${om[1]},${om[2]},${om[3]},${om[4] + offsetX},${om[5] + offsetY})`;
  }
}

export default MoveHandler;
