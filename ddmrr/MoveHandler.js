import TransformHandler from './TransformHandler';

class MoveHandler extends TransformHandler {
  constructor(draggable, config) {
    super(draggable.parent.dom);
    this.draggable = draggable;
    this.config = config;
  }

  onStart = (event, dragStart) => {
    this.dragStart = dragStart;

    if (this.draggable.parent.multiple) {
      let index = 0;
      this.draggable.parent.elements.forEach((el) => {
        this.dragStart[index].originalMatrx = this.getTransformMatrix(el);
        index += 1;
      });
    } else {
      this.dragStart.originalMatrx = this.getTransformMatrix();
    }
  }

  onEnd = () => {
    this.draggable.parent.emitter.emit('move_end', {});
  }

  onGoing = (event, dragOver) => {
    if (this.draggable.parent.multiple) {
      let index = 0;
      this.draggable.parent.elements.forEach((el) => {
        const om = this.dragStart[index].originalMatrx;
        const offsetX = dragOver.x - this.dragStart[index].x;
        const offsetY = dragOver.y - this.dragStart[index].y;
        // el.style.webkitTransform // eslint-disable-line no-param-reassign
        //   = `matrix(${om[0]},${om[1]},${om[2]},${om[3]},${om[4] + offsetX},${om[5] + offsetY})`;
        el.style.transform // eslint-disable-line no-param-reassign
          = `matrix(${om[0]},${om[1]},${om[2]},${om[3]},${om[4] + offsetX},${om[5] + offsetY})`;
        index += 1;
      });
    } else {
      const om = this.dragStart.originalMatrx;
      const offsetX = dragOver.x - this.dragStart.x;
      const offsetY = dragOver.y - this.dragStart.y;

      // this.opTarget.style.webkitTransform
      //   = `matrix(${om[0]},${om[1]},${om[2]},${om[3]},${om[4] + offsetX},${om[5] + offsetY})`;
      this.opTarget.style.transform
        = `matrix(${om[0]},${om[1]},${om[2]},${om[3]},${om[4] + offsetX},${om[5] + offsetY})`;
    }
  }
}

export default MoveHandler;
