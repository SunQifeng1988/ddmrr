import TransformHandler from './TransformHandler';

class RotateHandler extends TransformHandler {
  constructor(draggable, config) {
    super(draggable);
    this.config = config;
  }

  onStart = (event, dragStart) => {
    this.dragStart = dragStart;

    this.dragStart.originalMatrx = this.getTransformMatrix();
    this.dragStart.center = this.getCenter();
    this.dragStart.angle = Math.atan2(event.clientY - this.dragStart.center.y, event.clientX - this.dragStart.center.x);

    this.draggable.parent.emitter.emit('rotate_start', {});
  }

  onEnd = () => {
    this.draggable.parent.emitter.emit('rotate_end', {});
  }

  onGoing = (event, dragOver) => {
    const om = this.dragStart.originalMatrx;
    const currentAngle = Math.atan2(dragOver.y - this.dragStart.center.y, dragOver.x - this.dragStart.center.x);
    const da = currentAngle - this.dragStart.angle;

    const c = Math.cos(da);
    const s = Math.sin(da);

    const rm = [c, s, -s, c];
    const nm = this.matrixProduct_2d(om, rm);

    this.opTarget.style.transform
          = `matrix(${nm[0]},${nm[1]},${nm[2]},${nm[3]},${om[4]},${om[5]})`;
    this.opTarget.style.webkitTransform
          = `matrix(${nm[0]},${nm[1]},${nm[2]},${nm[3]},${om[4]},${om[5]})`;

    this.draggable.parent.emitter.emit('rotate_going', {});
  }
}

export default RotateHandler;
