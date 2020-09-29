import {
  ANIMATION_DURATION_MS,
  CLASS_DRIVER_HIGHLIGHTED_ELEMENT,
  CLASS_FIX_STACKING_CONTEXT,
  CLASS_POSITION_RELATIVE,
} from './../utils/constants';
import { getStyleProperty } from './../utils/utils';
import Position from './position';

/**
 * 对DOMElements进行包装实现对element的扩展
 * 重要的功能
 */
export default class Element {
  /**
   * DOM element object
   * @param {Node|HTMLElement} node
   * @param {Object} options
   * @param {Popover} popover
   * @param {Stage} stage
   * @param {Overlay} overlay
   * @param {Window} window
   * @param {Document} document
   */
  constructor({
    node,
    options,
    popover,
    stage,
    overlay,
    window,
    document,
  } = {}) {
    this.node = node;
    this.document = document;
    this.window = window;
    this.options = options;
    this.overlay = overlay;
    this.popover = popover;
    this.stage = stage;
    this.animationTimeout = null;
  }

  /**
   * 检查当前元素在视口中是否可见
   * @returns {boolean}
   * @public
   */
  isInView() {
    let top = this.node.offsetTop;
    let left = this.node.offsetLeft;
    const width = this.node.offsetWidth;
    const height = this.node.offsetHeight;

    let el = this.node;

    while (el.offsetParent) {
      el = el.offsetParent;
      top += el.offsetTop;
      left += el.offsetLeft;
    }

    return (
      top >= this.window.pageYOffset
      && left >= this.window.pageXOffset
      && (top + height) <= (this.window.pageYOffset + this.window.innerHeight)
      && (left + width) <= (this.window.pageXOffset + this.window.innerWidth)
    );
  }

  /**
   * 如果`scrollIntoView`失败，则手动滚动到元素的位置
   * @private
   */
  scrollManually() {
    const elementRect = this.node.getBoundingClientRect();
    const absoluteElementTop = elementRect.top + this.window.pageYOffset;
    const middle = absoluteElementTop - (this.window.innerHeight / 2);

    this.window.scrollTo(0, middle);
  }

  /**
   * 如果不在视图中，则将元素带到视图窗口的中间
   * @public
   */
  bringInView() {
    // 如果该节点不存在或已在视图中
    if (!this.node || this.isInView()) {
      return;
    }

    // 如果浏览器不支持scrollIntoView
    if (!this.node.scrollIntoView) {
      this.scrollManually();
      return;
    }

    try {
      this.node.scrollIntoView(this.options.scrollIntoViewOptions || {
        behavior: 'instant',
        block: 'center',
      });
    } catch (e) {
      // 较旧版本的firefox不允许使用“ block”选项，需要手动进行滚动
      this.scrollManually();
    }
  }

  /**
   * 获取屏幕上的计算位置，根据该位置进行绘制
   * we need to draw
   * @public
   * @return {Position}
   */
  getCalculatedPosition() {
    const body = this.document.body;
    const documentElement = this.document.documentElement;
    const window = this.window;

    const scrollTop = this.window.pageYOffset || documentElement.scrollTop || body.scrollTop;
    const scrollLeft = window.pageXOffset || documentElement.scrollLeft || body.scrollLeft;
    const elementRect = this.node.getBoundingClientRect();

    return new Position({
      top: elementRect.top + scrollTop,
      left: elementRect.left + scrollLeft,
      right: elementRect.left + scrollLeft + elementRect.width,
      bottom: elementRect.top + scrollTop + elementRect.height,
    });
  }

  /**
   * 获取当前元素的弹出窗口
   * @returns {Popover|*}
   * @public
   */
  getPopover() {
    return this.popover;
  }

  /**
   * 在即将取消选择元素时调用，即在将焦点移至下一个关闭元素时调用
   * @public
   */
  onDeselected(hideStage = false) {
    this.hidePopover();

    if (hideStage) {
      this.hideStage();
    }

    this.removeHighlightClasses();

    // 只要有任意一个动画进行，则清除该动画
    this.window.clearTimeout(this.animationTimeout);

    if (this.options.onDeselected) {
      this.options.onDeselected(this);
    }
  }

  /**
   * 检查指定元素是否与当前元素相同
   * @param {Element} element
   * @returns {boolean}
   * @public
   */
  isSame(element) {
    if (!element || !element.node) {
      return false;
    }

    return element.node === this.node;
  }

  /**
   * 在元素将要突出显示时调用
   * @public
   */
  onHighlightStarted() {
    if (this.options.onHighlightStarted) {
      this.options.onHighlightStarted(this);
    }
  }

  /**
   * 成功突出显示元素时调用
   * @public
   */
  onHighlighted() {
    const highlightedElement = this;
    if (!highlightedElement.isInView()) {
      highlightedElement.bringInView();
    }

    // 当该选项渲染到视图，就显示弹出窗口和层级，这将能够处理容器发生滚动溢出的情况
    this.showPopover();
    this.showStage();
    this.addHighlightClasses();

    if (this.options.onHighlighted) {
      this.options.onHighlighted(this);
    }
  }

  /**
   * 删除上下文和高亮的类 
   * @private
   */
  removeHighlightClasses() {
    this.node.classList.remove(CLASS_DRIVER_HIGHLIGHTED_ELEMENT);
    this.node.classList.remove(CLASS_POSITION_RELATIVE);

    const stackFixes = this.document.querySelectorAll(`.${CLASS_FIX_STACKING_CONTEXT}`);
    for (let counter = 0; counter < stackFixes.length; counter++) {
      stackFixes[counter].classList.remove(CLASS_FIX_STACKING_CONTEXT);
    }
  }

  /**
   * 在当前元素和固定的父级节点添加高亮类
   * @private
   */
  addHighlightClasses() {
    this.node.classList.add(CLASS_DRIVER_HIGHLIGHTED_ELEMENT);

    // 如果元素已经设置了定位，就不使其相对
    if (this.canMakeRelative()) {
      this.node.classList.add(CLASS_POSITION_RELATIVE);
    }

    // 检查并重新定义fixStackingContext
    this.fixStackingContext();
  }

  /**
   * Walks through the parents of the current element and fixes
   * the stacking context
   * @private
   */
  fixStackingContext() {
    let parentNode = this.node.parentNode;
    while (parentNode) {
      if (!parentNode.tagName || parentNode.tagName.toLowerCase() === 'body') {
        break;
      }

      const zIndex = getStyleProperty(parentNode, 'z-index');
      const opacity = parseFloat(getStyleProperty(parentNode, 'opacity'));
      const transform = getStyleProperty(parentNode, 'transform', true);
      const transformStyle = getStyleProperty(parentNode, 'transform-style', true);
      const transformBox = getStyleProperty(parentNode, 'transform-box', true);
      const filter = getStyleProperty(parentNode, 'filter', true);
      const perspective = getStyleProperty(parentNode, 'perspective', true);

      // Stacking context gets disturbed if
      // - Parent has z-index
      // - Opacity is below 0
      // - Filter/transform or perspective is applied
      if (
        /[0-9]+/.test(zIndex)
        || opacity < 1
        || (transform && transform !== 'none')
        || (transformStyle && transformStyle !== 'flat')
        || (transformBox && transformBox !== 'border-box')
        || (filter && filter !== 'none')
        || (perspective && perspective !== 'none')
      ) {
        parentNode.classList.add(CLASS_FIX_STACKING_CONTEXT);
      }

      parentNode = parentNode.parentNode;
    }
  }

  /**
   * Checks if we can make the current element relative or not
   * @return {boolean}
   * @private
   */
  canMakeRelative() {
    const currentPosition = this.getStyleProperty('position');
    const avoidPositionsList = ['absolute', 'fixed', 'relative'];

    // Because if the element has any of these positions, making it
    // relative will break the UI
    return avoidPositionsList.indexOf(currentPosition) === -1;
  }

  /**
   * Get current element's CSS attribute value
   * @param {string} property
   * @returns string
   * @private
   */
  getStyleProperty(property) {
    return getStyleProperty(this.node, property);
  }

  /**
   * Shows the stage behind the element
   * @public
   */
  showStage() {
    this.stage.show(this.getCalculatedPosition());
  }

  /**
   * Gets the DOM Element behind this element
   * @returns {Node|HTMLElement|*}
   * @public
   */
  getNode() {
    return this.node;
  }

  /**
   * Hides the stage
   * @public
   */
  hideStage() {
    this.stage.hide();
  }

  /**
   * Hides the popover if possible
   * @public
   */
  hidePopover() {
    if (!this.popover) {
      return;
    }

    this.popover.hide();
  }

  /**
   * Shows the popover on the current element
   * @public
   */
  showPopover() {
    if (!this.popover) {
      return;
    }

    const showAtPosition = this.getCalculatedPosition();

    // For first highlight, show it immediately because there won't be any animation
    let showAfterMs = ANIMATION_DURATION_MS;
    // If animation is disabled or  if it is the first display, show it immediately
    if (!this.options.animate || !this.overlay.lastHighlightedElement) {
      showAfterMs = 0;
    }

    // @todo remove timeout and handle with CSS
    this.animationTimeout = this.window.setTimeout(() => {
      this.popover.show(showAtPosition);
    }, showAfterMs);
  }

  /**
   * @returns {{height: number, width: number}}
   * @public
   */
  getFullPageSize() {
    // eslint-disable-next-line prefer-destructuring
    const body = this.document.body;
    const html = this.document.documentElement;

    return {
      height: Math.max(body.scrollHeight, body.offsetHeight, html.scrollHeight, html.offsetHeight),
      width: Math.max(body.scrollWidth, body.offsetWidth, html.scrollWidth, html.offsetWidth),
    };
  }

  /**
   * Gets the size for popover
   * @returns {{height: number, width: number}}
   * @public
   */
  getSize() {
    return {
      height: Math.max(this.node.scrollHeight, this.node.offsetHeight),
      width: Math.max(this.node.scrollWidth, this.node.offsetWidth),
    };
  }
}
