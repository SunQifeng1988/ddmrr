class TransformHandler {
  constructor(draggable) {
    this.draggable = draggable;
    this.opTarget = draggable.parent.dom;
    this.container = draggable.parent.container;
  }

  getComputedLocation = (dom) => {
    const domToBeComputed = dom || this.opTarget;

    const location = {
      left: domToBeComputed.offsetLeft,
      top: domToBeComputed.offsetTop,
      width: domToBeComputed.offsetWidth,
      height: domToBeComputed.offsetHeight,
    };
    return location;
  };


  getTransformMatrix = (dom) => {
    const domToBeComputed = dom || this.opTarget;

    const style = getComputedStyle(domToBeComputed);

    const transform = style.transform || style.webkitTransform || style.mozTransform || style.msTransform;
    let mat = transform.match(/^matrix3d\((.+)\)$/);
    if (mat) return parseFloat(mat[1].split(', ')[13]);
    mat = transform.match(/^matrix\((.+)\)$/);
    return mat ? mat[1].split(', ').map(n => parseFloat(n)) : [1, 0, 0, 1, 0, 0];
  }

  getCenter(dom) {
    const domToBeComputed = dom || this.opTarget;
    const location = domToBeComputed.getBoundingClientRect();
    return {
      x: location.left + (location.width / 2),
      y: location.top + (location.height / 2),
    };
  }

  matrixProduct_2d = (m1, m2) => {
    return [
      ((m1[0] * m2[0]) + (m1[1] * m2[2])),
      ((m1[0] * m2[1]) + (m1[1] * m2[3])),
      ((m1[2] * m2[0]) + (m1[3] * m2[2])),
      ((m1[2] * m2[1]) + (m1[3] * m2[3])),
    ];
  }
}

export default TransformHandler;
