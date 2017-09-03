class TransformHandler {
  constructor(opTarget) {
    this.opTarget = opTarget;
  }

  getComputedLocation = (dom) => {
    const domToBeComputed = dom || this.opTarget;

    const style = getComputedStyle(domToBeComputed);

    const location = {
      left: parseFloat(style.left),
      width: parseFloat(domToBeComputed.offsetWidth),
      height: parseFloat(domToBeComputed.offsetHeight),
      top: parseFloat(style.top),
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

  getCenter = (dom) => {
    const domToBeComputed = dom || this.opTarget;

    const location = this.getComputedLocation(domToBeComputed);
    const matrix = this.getTransformMatrix(domToBeComputed);

    return {
      x: location.left + (location.width / 2) + matrix[4],
      y: location.top + (location.height / 2) + matrix[5],
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
