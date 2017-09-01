class TransformHandler {
  constructor(opTarget) {
    this.opTarget = opTarget;
  }

  getBoundingClientRect = () => {
    return this.opTarget.getBoundingClientRect();
  }

  getComputedLocation = () => {
    const style = getComputedStyle(this.opTarget);
    return {
      left: parseFloat(style.left),
      right: parseFloat(style.right),
      width: parseFloat(style.width),
      height: parseFloat(style.height),
      top: parseFloat(style.top),
      bottom: parseFloat(style.bottom),
    };
  };


  getTransformMatrix = () => {
    const style = getComputedStyle(this.opTarget);
    const transform = style.transform || style.webkitTransform || style.mozTransform;
    let mat = transform.match(/^matrix3d\((.+)\)$/);
    if (mat) return parseFloat(mat[1].split(', ')[13]);
    mat = transform.match(/^matrix\((.+)\)$/);
    return mat ? mat[1].split(', ').map(n => parseFloat(n)) : [1, 0, 0, 1, 0, 0];
  }

  getCenter = () => {
    const location = this.getBoundingClientRect();
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
