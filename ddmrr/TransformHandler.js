class TransformHandler {
  constructor(opTarget) {
    this.opTarget = opTarget;
  }

  getTransformMatrix = () => {
    const style = getComputedStyle(this.opTarget);
    const transform = style.transform || style.webkitTransform || style.mozTransform;
    let mat = transform.match(/^matrix3d\((.+)\)$/);
    if (mat) return parseFloat(mat[1].split(', ')[13]);
    mat = transform.match(/^matrix\((.+)\)$/);
    return mat ? mat[1].split(', ').map(n => parseFloat(n)) : [1, 0, 0, 1, 0, 0];
  }

  // matrixProduct_2d = (m1, m2) => {
  //   return [(m1[0] * m2[0] + m1[1] * m1[2])];
  // }
}

export default TransformHandler;
