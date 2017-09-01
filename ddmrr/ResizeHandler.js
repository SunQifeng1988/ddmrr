import TransformHandler from './TransformHandler';

class ResizeHandler extends TransformHandler {
  constructor(draggable, config) {
    super(draggable.parent.dom);
    this.draggable = draggable;
    this.config = config;
  }

  onStart = (event, dragStart) => {
    this.dragStart = dragStart;
    this.transformMatrix = this.getTransformMatrix();
    this.invariantPoint = this.getPoint();
  }

  onEnd = () => {
    // nothing to do here;
  }

  onGoing = (event, dragOver) => {
    const offset = this.getOffset(dragOver);
    this.updateWidthAndHeight(offset);

    const m = this.transformMatrix;
    const os = this.invariantPoint;
    const cs = this.getPoint();

    const currentRect = this.getComputedLocation();

    const vx = (currentRect.width - this.dragStart.rect.width) / 2;
    const vy = (currentRect.height - this.dragStart.rect.height) / 2;
    const otx = (m[0] * os.x) - (m[1] * os.y);
    const oty = (m[3] * os.y) - (m[2] * os.x);
    const ctx = (m[0] * cs.x) - (m[1] * cs.y);
    const cty = (m[3] * cs.y) - (m[2] * cs.x);
    const dx = (otx - ctx) + vx;
    const dy = (oty - cty) + vy;

    this.opTarget.style.webkitTransform
      = `matrix(${m[0]},${m[1]},${m[2]},${m[3]},${m[4] - dx},${m[5] - dy})`;
    this.opTarget.style.transform
      = `matrix(${m[0]},${m[1]},${m[2]},${m[3]},${m[4] - dx},${m[5] - dy})`;
  }

  getPoint = () => {
    const os = this.getComputedLocation();
    switch (this.draggable.dom.dataset.direction) {
      case 'w': {
        const x = -os.width / 2;
        const y = 0;
        return { x, y };
      }
      case 'e': {
        const x = os.width / 2;
        const y = 0;
        return { x, y };
      }
      case 'n': {
        const x = 0;
        const y = -os.height / 2;
        return { x, y };
      }
      case 's': {
        const x = 0;
        const y = os.height / 2;
        return { x, y };
      }
      case 'ne': {
        const x = os.width / 2;
        const y = -os.height / 2;
        return { x, y };
      }
      case 'nw': {
        const x = -os.width / 2;
        const y = -os.height / 2;
        return { x, y };
      }
      case 'se': {
        const x = os.width / 2;
        const y = os.height / 2;
        return { x, y };
      }
      case 'sw': {
        const x = -os.width / 2;
        const y = os.height / 2;
        return { x, y };
      }
      default:
    }
  }

  getOffset = (dragOver) => {
    const m = this.getTransformMatrix();
    const offsets = {
      x: dragOver.x - this.dragStart.x,
      y: dragOver.y - this.dragStart.y,
    };

    const x = (m[0] * offsets.x) + (m[1] * offsets.y);
    const y = (m[2] * offsets.x) + (m[3] * offsets.y);
    return { x, y };
  }

  updateWidthAndHeight = (offset) => {
    switch (this.draggable.dom.dataset.direction) {
      case 'se': {
        this.opTarget.style.width = `${this.dragStart.rect.width + offset.x}px`;
        this.opTarget.style.height = `${this.dragStart.rect.height + offset.y}px`;
        break;
      }
      case 's': {
        this.opTarget.style.height = `${this.dragStart.rect.height + offset.y}px`;
        break;
      }
      case 'e': {
        this.opTarget.style.width = `${this.dragStart.rect.width + offset.x}px`;
        break;
      }
      case 'nw': {
        this.opTarget.style.width = `${this.dragStart.rect.width - offset.x}px`;
        this.opTarget.style.height = `${this.dragStart.rect.height - offset.y}px`;
        break;
      }
      case 'n': {
        this.opTarget.style.height = `${this.dragStart.rect.height - offset.y}px`;
        break;
      }
      case 'w': {
        this.opTarget.style.width = `${this.dragStart.rect.width - offset.x}px`;
        break;
      }
      case 'ne': {
        this.opTarget.style.width = `${this.dragStart.rect.width + offset.x}px`;
        this.opTarget.style.height = `${this.dragStart.rect.height - offset.y}px`;
        break;
      }
      case 'sw': {
        this.opTarget.style.width = `${this.dragStart.rect.width - offset.x}px`;
        this.opTarget.style.height = `${this.dragStart.rect.height + offset.y}px`;
        break;
      }
      default:
    }
  }
}

export default ResizeHandler;
