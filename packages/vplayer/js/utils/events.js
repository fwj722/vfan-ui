/**
 * 事件工具
 */
import is from './is';

//监测被动监听事件的支持情况
const supportsPassiveListeners = (() => {
  // 通过options对象中的getter进行测试，以查看是否访问了被动属性
  let supported = false;
  try {
    const options = Object.defineProperty({}, 'passive', {
      get() {
        supported = true;
        return null;
      },
    });
    window.addEventListener('test', null, options);
    window.removeEventListener('test', null, options);
  } catch (e) {
    console.log(e)
  }
  return supported;
})();

//事件监听切换
export function toggleListener(element, event, callback, toggle = false, passive = true, capture = false) {
  // 如果没有元素，事件或回调，则不监听
  if (!element || !('addEventListener' in element) || is.empty(event) || !is.function(callback)) {
    return;
  }

  // 允许多事件
  const events = event.split(' ');
 //构建选项,对于不支持被动侦听器的浏览器，默认为捕获布尔值
  let options = capture;

  // 如果支持被动事件侦听
  if (supportsPassiveListeners) {
    options = {
      // 事件监听是否可以是被动的（即永远不会阻止默认设置）
      passive,
      // 监听对象是否是捕获监听
      capture,
    };
  }

  // 如果传了一个节点，请绑定事件监听
  events.forEach(type => {
    if (this && this.eventListeners && toggle) {
      // 缓存事件监听
      this.eventListeners.push({ element, type, callback, options });
    }

    element[toggle ? 'addEventListener' : 'removeEventListener'](type, callback, options);
  });
}

// 绑定事件
export function on(element, events = '', callback, passive = true, capture = false) {
  toggleListener.call(this, element, events, callback, true, passive, capture);
}

// 不绑定事件
export function off(element, events = '', callback, passive = true, capture = false) {
  toggleListener.call(this, element, events, callback, false, passive, capture);
}

// 仅仅绑定一次事件
export function once(element, events = '', callback, passive = true, capture = false) {
  const onceCallback = (...args) => {
    off(element, events, onceCallback, passive, capture);
    callback.apply(this, args);
  };

  toggleListener.call(this, element, events, onceCallback, true, passive, capture);
}

// 事件触发
export function triggerEvent(element, type = '', bubbles = false, detail = {}) {
  // Bail if no element
  if (!is.element(element) || is.empty(type)) {
    return;
  }

  // 创建和派发事件
  const event = new CustomEvent(type, {
    bubbles,
    detail: { ...detail, vplayer: this },
  });

  // 事件派发
  element.dispatchEvent(event);
}

//取消绑定所有缓存的事件监听
export function unbindListeners() {
  if (this && this.eventListeners) {
    this.eventListeners.forEach(item => {
      const { element, type, callback, options } = item;
      element.removeEventListener(type, callback, options);
    });

    this.eventListeners = [];
  }
}

//如果播放器准备就绪，则运行方法
export function ready() {
  return new Promise(resolve =>
    this.ready ? setTimeout(resolve, 0) : on.call(this, this.elements.container, 'ready', resolve),
  ).then(() => {});
}
