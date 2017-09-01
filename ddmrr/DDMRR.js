import _ from 'lodash';
import defaultConfig from './defaultConfig';
import Dragable from './Dragable';
import './DDMRR.scss';

class DDMRR {
  constructor(dom, config) {
    if (!dom.children) {
      console.log('dom have no child nodes');  // eslint-disable-line no-console
      this.initialized = false;
    }
    if (dom.children.length > 1) {
      console.log('dom have more than one child node');  // eslint-disable-line no-console
      this.initialized = false;
    }

    this.dom = dom;
    this.child = dom.children[0];

    const finalConfig = _.merge(defaultConfig, config);
    this.initializeDoms(finalConfig);
    this.relocateDom(finalConfig);
    this.initialized = true;
  }

  initializeDoms = (config) => {
    this.initializeMove(config.move);
    this.initializeResize(config.resize);
    this.initializeRotate(config.rotate);
  }

  initializeMove = (moveConfig) => {
    if (!moveConfig.enable) return;
    const panel = document.createElement('div');
    panel.setAttribute('class', 'drag-panel');
    this.dom.appendChild(panel);
    this.dragPanel = new Dragable(this, panel, moveConfig);
  }

  initializeResize = (resizeConfig) => {
    if (!resizeConfig.enable) return;
    this.anchors = [];
    resizeConfig.anchors.forEach((anchorName) => {
      const anchor = document.createElement('div');
      anchor.setAttribute('class', 'resize-anchor');
      anchor.dataset.direction = anchorName;
      this.dom.appendChild(anchor);
      this.anchors.push(new Dragable(this, anchor, resizeConfig));
    });
  }

  initializeRotate = (rotateConfig) => {
    if (!rotateConfig.enable) return;
    const anchor = document.createElement('div');
    anchor.setAttribute('class', 'rotate-anchor');
    this.dom.appendChild(anchor);
    this.rotateAnchor = new Dragable(this, anchor, rotateConfig);
  }

  relocateDom = (config) => {
    config.move.enable && this.relocateMove(config.move);
    config.move.enable && this.relocateResize(config.resize);
    config.move.enable && this.relocateRotate();
  }

  relocateMove = () => {
    const computedLocation = getComputedLocation(this.dom);
    this.dragPanel.dom.style.left = `-${computedLocation.borderLeft}px`;
    this.dragPanel.dom.style.top = `-${computedLocation.borderTop}px`;
    this.dragPanel.dom.style.right = `-${computedLocation.borderRight}px`;
    this.dragPanel.dom.style.bottom = `-${computedLocation.borderBottom}px`;
  }

  /* eslint-disable no-param-reassign */
  relocateResize = () => {
    const computedLocation = getComputedLocation(this.dom);
    this.anchors.forEach((an) => {
      switch (an.dom.dataset.direction) {
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
    });
  }
  /* eslint-disable no-param-reassign */

  relocateRotate = () => {
    const computedLocation = getComputedLocation(this.dom);
    this.rotateAnchor.dom.style.top = `-${computedLocation.borderTop + 24}px`;
    this.rotateAnchor.dom.style.right = `-${computedLocation.borderRight + 24}px`;
  }
}

export default DDMRR;
