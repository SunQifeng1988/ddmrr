import MoveHandler from './MoveHandler';
import ResizeHandler from './ResizeHandler';
import RotateHandler from './RotateHandler';

class Dragable {
  constructor(parent, dom, config) {
    this.parent = parent;
    this.dom = dom;
    this.handler = this.getEventHander(config);

    this.linkEvents();
  }

  getEventHander = (config) => {
    switch (config.key) {
      case 'move': {
        return new MoveHandler(this, config);
      }
      case 'resize': {
        return new ResizeHandler(this, config);
      }
      case 'rotate': {
        return new RotateHandler(this, config);
      }
      default:
    }
  }

  linkEvents = () => {
    this.dom.addEventListener('mousedown', this.mousedown);
    window.addEventListener('mousemove', this.mousemove);
    window.addEventListener('mouseup', this.mouseup);
  }

  mousedown = (event) => {
    event.stopPropagation();

    const dragStart = {
      x: event.clientX,
      y: event.clientY,
      rect: this.parent.dom.getBoundingClientRect(),
    };

    this.isActive = true;
    this.handler && this.handler.onStart(event, dragStart);
  }

  mouseup = (event) => {
    event.stopPropagation();

    if (this.isActive) {
      const dragEnd = {
        x: event.clientX,
        y: event.clientY,
      };
      this.handler && this.handler.onEnd(event, dragEnd);
      this.isActive = false;
    }
  }

  mousemove = (event) => {
    event.stopPropagation();
    if (this.isActive) {
      const dragOver = {
        x: event.clientX,
        y: event.clientY,
      };
      this.handler && this.handler.onGoing(event, dragOver);
    }
  }
}

export default Dragable;
