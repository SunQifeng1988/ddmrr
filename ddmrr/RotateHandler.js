import TransformHandler from './TransformHandler';

class RotateHandler extends TransformHandler {
  constructor(draggable, config) {
    super(draggable.parent.dom);
    this.draggable = draggable;
    this.config = config;
  }

  onStart = (event, dragStart) => {
    console.log('on rotate start'); // eslint-disable-line no-console
    this.dragStart = dragStart;
    this.originalMatrx = this.getTransformMatrix();
  }

  onEnd = () => {
    // nothing to do here;
    console.log('on rotating'); // eslint-disable-line no-console
  }

  onGoing = (event, dragOver) => {
    console.log('on rotating'); // eslint-disable-line no-console
    const om = this.originalMatrx;
    const currentAngle = Math.atan2(dragOver.y - this.dragStart.center.y, dragOver.x - this.dragStart.center.x);
    const da = currentAngle - this.dragStart.angle;

    const c = Math.cos(da);
    const s = Math.sin(da);

    const rm = [c, s, -s, c];

    const nm = this.matrixProduct_2d(om, rm);

    this.opTarget.style.webkitTransform
          = `matrix(${nm[0]},${nm[1]},${nm[2]},${nm[3]},${om[4]},${om[5]})`;
    this.opTarget.style.transform
          = `matrix(${nm[0]},${nm[1]},${nm[2]},${nm[3]},${om[4]},${om[5]})`;
  }
}

export default RotateHandler;
