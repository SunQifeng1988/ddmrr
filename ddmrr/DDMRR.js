import defaultConfig from './defaultConfig';
import Draggable from './Draggable';
import Emitter from './Emitter';
import applyStyleUtil from './applyStyleUtil';
import styles from './styles';

class DDMRR {
  constructor(dom, container, config) {
    this.dom = dom;
    this.container = container;

    Array.prototype.forEach.call(dom.querySelectorAll('.ddmrr-drag-drop'), (ddd) => {
      ddd.parentNode.removeChild(ddd);
    });

    this.config = {
      ...defaultConfig,
      ...config,
    };
    this.initializeDoms(this.config);
    this.relocateDom(this.config);

    this.emitter = new Emitter();
  }

  initializeDoms = (config) => {
    this.initializeMove(config.move);
    this.initializeResize(config.resize);
    this.initializeRotate(config.rotate);
  }

  initializeMove = (moveConfig) => {
    if (!moveConfig.enable) return;
    const panel = document.createElement('div');
    panel.setAttribute('class', 'ddmrr-drag-drop drag-panel');
    applyStyleUtil(panel, {
      ...styles.dragPanel,
      backgroundColor: this.config.panelBackgroundColor,
      border: this.config.panelBorder,
    });
    this.dom.appendChild(panel);
    this.dragPanel = new Draggable(this, panel, moveConfig);

    this.dragPanel.dom.addEventListener('dblclick', () => {
      event.stopPropagation();

      this.emitter.emit('dblclick', {});
    });
  }

  initializeResize = (resizeConfig) => {
    if (!resizeConfig.enable) return;
    this.anchors = [];
    resizeConfig.anchors.forEach((anchorName) => {
      const anchor = document.createElement('div');
      anchor.setAttribute('class', 'ddmrr-drag-drop resize-anchor');
      anchor.setAttribute('data-direction', anchorName);

      applyStyleUtil(anchor, {
        ...styles.resizeAnchor,
        backgroundColor: this.config.anchorBackgroundColor,
        border: this.config.anchorBorder,
      });

      this.dom.appendChild(anchor);
      this.anchors.push(new Draggable(this, anchor, resizeConfig));
    });
  }

  initializeRotate = (rotateConfig) => {
    if (!rotateConfig.enable) return;
    const anchor = document.createElement('div');
    anchor.setAttribute('class', 'ddmrr-drag-drop rotate-anchor');

    applyStyleUtil(anchor, {
      ...styles.rotateAnchor,
      backgroundColor: this.config.anchorBackgroundColor,
      border: this.config.anchorBorder,
    });

    this.dom.appendChild(anchor);
    this.rotateAnchor = new Draggable(this, anchor, rotateConfig);
  }

  relocateDom = (config) => {
    config.move.enable && this.relocateMove(config.move);
    config.resize.enable && this.relocateResize(config.resize);
    config.rotate.enable && this.relocateRotate();
  }

  relocateMove = () => {
    const computedLocation = this.getComputedBorderWidth();
    this.dragPanel.dom.style.left = `-${computedLocation.borderLeft}px`;
    this.dragPanel.dom.style.top = `-${computedLocation.borderTop}px`;
    this.dragPanel.dom.style.right = `-${computedLocation.borderRight}px`;
    this.dragPanel.dom.style.bottom = `-${computedLocation.borderBottom}px`;
    this.dragPanel.dom.style.display = 'block';
  }

  /* eslint-disable no-param-reassign */
  relocateResize = () => {
    const computedLocation = this.getComputedBorderWidth();
    this.anchors.forEach((an) => {
      switch (an.dom.getAttribute('data-direction')) {
        case 'se': {
          an.dom.style.bottom = `-${computedLocation.borderBottom + 6}px`;
          an.dom.style.right = `-${computedLocation.borderRight + 6}px`;
          break;
        }
        case 'ne': {
          an.dom.style.top = `-${computedLocation.borderTop + 6}px`;
          an.dom.style.right = `-${computedLocation.borderRight + 6}px`;
          break;
        }
        case 'sw': {
          an.dom.style.bottom = `-${computedLocation.borderBottom + 6}px`;
          an.dom.style.left = `-${computedLocation.borderLeft + 6}px`;
          break;
        }
        case 'nw': {
          an.dom.style.top = `-${computedLocation.borderTop + 6}px`;
          an.dom.style.left = `-${computedLocation.borderLeft + 6}px`;
          break;
        }
        case 'n': {
          an.dom.style.top = `-${computedLocation.borderTop + 6}px`;
          an.dom.style.left = '50%';
          an.dom.style.marginLeft = '-6px';
          break;
        }
        case 's': {
          an.dom.style.bottom = `-${computedLocation.borderBottom + 6}px`;
          an.dom.style.left = '50%';
          an.dom.style.marginLeft = '-6px';
          break;
        }
        case 'e': {
          an.dom.style.right = `-${computedLocation.borderRight + 6}px`;
          an.dom.style.top = '50%';
          an.dom.style.marginTop = '-6px';
          break;
        }
        case 'w': {
          an.dom.style.left = `-${computedLocation.borderLeft + 6}px`;
          an.dom.style.top = '50%';
          an.dom.style.marginTop = '-6px';
          break;
        }
        default:
      }
      an.dom.style.display = 'block';
    });
  }
  /* eslint-disable no-param-reassign */

  relocateRotate = () => {
    const computedLocation = this.getComputedBorderWidth();
    this.rotateAnchor.dom.style.top = `-${computedLocation.borderTop + 24}px`;
    this.rotateAnchor.dom.style.right = `-${computedLocation.borderRight + 24}px`;
    this.rotateAnchor.dom.style.display = 'block';
  }

  getComputedBorderWidth = () => {
    const style = getComputedStyle(this.dom);
    return {
      borderTop: parseFloat(style.borderTopWidth),
      borderBottom: parseFloat(style.borderBottomWidth),
      borderLeft: parseFloat(style.borderLeftWidth),
      borderRight: parseFloat(style.borderRightWidth),
    };
  }

  release = () => {
    if (this.config.resize.enable) {
      this.anchors.forEach((anchor) => {
        anchor.unlinkEvents();
        this.dom.removeChild(anchor.dom);
      });
    }

    if (this.config.move.enable) {
      this.dragPanel.unlinkEvents();
      this.dom.removeChild(this.dragPanel.dom);
    }

    if (this.config.rotate.enable) {
      this.rotateAnchor.unlinkEvents();
      this.dom.removeChild(this.rotateAnchor.dom);
    }
  }
}

export default DDMRR;
