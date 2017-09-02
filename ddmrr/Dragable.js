import MoveHandler from './MoveHandler';
import ResizeHandler from './ResizeHandler';
import RotateHandler from './RotateHandler';

class Dragable {
  constructor(parent, dom, config) {
    this.config = config;
    this.parent = parent;
    this.dom = dom;
    this.handler = this.getEventHander();

    this.linkEvents();
  }

  getEventHander = () => {
    switch (this.config.key) {
      case 'move': {
        return new MoveHandler(this, this.config);
      }
      case 'resize': {
        return new ResizeHandler(this, this.config);
      }
      case 'rotate': {
        return new RotateHandler(this, this.config);
      }
      default:
    }
  }

  stopPropagation = (event) => {
    event.stopPropagation();
  }

  unlinkEvents = () => {
    this.dom.removeEventListener('mousedown', this.mousedown);
    this.parent.container.removeEventListener('mousemove', this.mousemove);
    this.parent.container.removeEventListener('mouseup', this.mouseup);

    this.dom.removeEventListener('click', this.stopPropagation);
    this.dom.removeEventListener('click', this.stopPropagation);
  }

  linkEvents = () => {
    this.dom.addEventListener('mousedown', this.mousedown);
    this.parent.container.addEventListener('mousemove', this.mousemove);
    this.parent.container.addEventListener('mouseup', this.mouseup);

    this.dom.addEventListener('click', this.stopPropagation);
    this.dom.addEventListener('click', this.stopPropagation);
  }

  mousedown = (event) => {
    event.stopPropagation();

    let dragStart;

    if (this.parent.multiple && this.config.key === 'move') {
      dragStart = [];
      this.parent.elements.forEach((el) => {
        dragStart.push({
          x: event.clientX,
          y: event.clientY,
          rect: this.handler.getComputedLocation(el),
        });
      });
    } else {
      dragStart = {
        x: event.clientX,
        y: event.clientY,
        rect: this.handler.getComputedLocation(),
      };
    }

    this.isActive = true;
    this.handler && this.handler.onStart(event, dragStart);
  }

  mouseup = (event) => {
    // event.stopPropagation();

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
    // event.stopPropagation();

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
