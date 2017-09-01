import TransformHandler from './TransformHandler';

class ResizeHandler extends TransformHandler {
  constructor(draggable, config) {
    super(draggable.parent.dom);
    this.draggable = draggable;
    this.config = config;
  }
  onStart = (event, dragStart) => {
    console.log('on resize start'); // eslint-disable-line no-console
    this.dragStart = dragStart;
    this.originalMatrx = this.getTransformMatrix();
  }

  onEnd = () => {
    // nothing to do here;
    console.log('on resize end'); // eslint-disable-line no-console
  }

  onGoing = (event, dragOver) => {
    console.log('on resizing'); // eslint-disable-line no-console

    const offset = this.getOffset(dragOver);

    this.updateWidthAndHeight(offset);
  }

  getOffset = (dragOver) => {
    const x = dragOver.x - this.dragStart.x;
    const y = dragOver.y - this.dragStart.y;

    return {
      x, y,
    };
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
