/**
 * 动画工具
 * author fanenjing
 * emil 1508488207@qq.com
 */
import is from './is';

export const transitionEndEvent = (() => {
  const element = document.createElement('span');

  const events = {
    WebkitTransition: 'webkitTransitionEnd',
    MozTransition: 'transitionend',
    OTransition: 'oTransitionEnd otransitionend',
    transition: 'transitionend',
  };

  const type = Object.keys(events).find(event => element.style[event] !== undefined);

  return is.string(type) ? events[type] : false;
})();

// 强制重涂
export function repaint(element, delay) {
  debugger
  setTimeout(() => {
    try {
      // eslint-disable-next-line no-param-reassign
      element.hidden = true;

      // eslint-disable-next-line no-unused-expressions
      element.offsetHeight;

      // eslint-disable-next-line no-param-reassign
      element.hidden = false;
    } catch (e) {
      console.log(e)
    }
  }, delay);
}
