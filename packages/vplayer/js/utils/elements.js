/**
 * dom元素工具
 */
import is from './is';
import { extend } from './objects';

// Wrap an element
export function wrap(elements, wrapper) {
  // 如果不是数组或者不具有length属性时，将元素转成数组
  const targets = elements.length ? elements : [elements];

  // 从第一个元素开始循环遍历
  Array.from(targets).reverse().forEach((element, index) => {
      const child = index > 0 ? wrapper.cloneNode(true) : wrapper;
      //将同级和父级缓存起来
      const parent = element.parentNode;
      const sibling = element.nextSibling;

      // 元素保包装
      child.appendChild(element);

      // 如果元素有同级，则在同级之前插入wrapper以维护HTML结构； 否则，只需将其附加到父项即可
      if (sibling) {
        parent.insertBefore(child, sibling);
      } else {
        parent.appendChild(child);
      }
    });
}

// 属性设置
export function setAttributes(element, attributes) {
  if (!is.element(element) || is.empty(attributes)) {
    return;
  }
  Object.entries(attributes)
    .filter(([,value]) => !is.nullOrUndefined(value))
    .forEach(([key, value]) => element.setAttribute(key, value));
}

// 创建一个DocumentFragment
export function createElement(type, attributes, text) {
  // 创建一个新的元素
  const element = document.createElement(type);

  // 给所有符合要求的元素设置属性
  if (is.object(attributes)) {
    setAttributes(element, attributes);
  }

  // 添加文本节点
  if (is.string(text)) {
    element.innerText = text;
  }
  return element;
}

// 插入一个元素
export function insertAfter(element, target) {
  if (!is.element(element) || !is.element(target)) {
    return;
  }

  target.parentNode.insertBefore(element, target.nextSibling);
}

// 插入一个DocumentFragment
export function insertElement(type, parent, attributes, text) {
  if (!is.element(parent)) {
    return;
  }

  parent.appendChild(createElement(type, attributes, text));
}

// 删除一个（多个）元素
export function removeElement(element) {
  if (is.nodeList(element) || is.array(element)) {
    Array.from(element).forEach(removeElement);
    return;
  }

  if (!is.element(element) || !is.element(element.parentNode)) {
    return;
  }

  element.parentNode.removeChild(element);
}

// 删除所有子元素
export function emptyElement(element) {
  if (!is.element(element)) {
    return;
  }

  let { length } = element.childNodes;

  while (length > 0) {
    element.removeChild(element.lastChild);
    length -= 1;
  }
}

// 替换元素
export function replaceElement(newChild, oldChild) {
  if (!is.element(oldChild) || !is.element(oldChild.parentNode) || !is.element(newChild)) {
    return null;
  }

  oldChild.parentNode.replaceChild(newChild, oldChild);

  return newChild;
}

// 获取属性对象
// 例如：'.test' to { class: 'test' }
// '#test' to { id: 'test' }
// '[data-test="test"]' to { 'data-test': 'test' }
export function getAttributesFromSelector(sel, attribute) {
  if (!is.string(sel) || is.empty(sel)) {
    return {};
  }

  const attributes = {};
  const existing = extend({}, attribute);

  sel.split(',').forEach(s => {
    // 去除空格
    const selector = s.trim();
    const className = selector.replace('.', '');
    const stripped = selector.replace(/[[\]]/g, '');

    const parts = stripped.split('=');
    const [key] = parts;
    const value = parts.length > 1 ? parts[1].replace(/["']/g, '') : '';
    // 获取第一个字符
    const start = selector.charAt(0);

    switch (start) {
      case '.':
        // 类选择器 添加现有的classname
        if (is.string(existing.class)) {
          attributes.class = `${existing.class} ${className}`;
        } else {
          attributes.class = className;
        }
        break;

      case '#':
        // ID 选择器
        attributes.id = selector.replace('#', '');
        break;

      case '[':
        // 属性选择器
        attributes[key] = value;

        break;

      default:
        break;
    }
  });

  return extend(existing, attributes);
}

// 切换到隐藏
export function toggleHidden(element, hidden) {
  if (!is.element(element)) {
    return;
  }

  let hide = hidden;

  if (!is.boolean(hide)) {
    hide = !element.hidden;
  }

  // eslint-disable-next-line no-param-reassign
  element.hidden = hide;
}

// class切换，兼容IE
export function toggleClass(element, className, force) {
  if (is.nodeList(element)) {
    return Array.from(element).map(e => toggleClass(e, className, force));
  }

  if (is.element(element)) {
    let method = 'toggle';
    if (typeof force !== 'undefined') {
      method = force ? 'add' : 'remove';
    }

    element.classList[method](className);
    return element.classList.contains(className);
  }

  return false;
}

// 有class
export function hasClass(element, className) {
  return is.element(element) && element.classList.contains(className);
}

// 元素匹配选择器
export function matches(element, selector) {
  const { prototype } = Element;

  function match() {
    return Array.from(document.querySelectorAll(selector)).includes(this);
  }

  const method =
    prototype.matches ||
    prototype.webkitMatchesSelector ||
    prototype.mozMatchesSelector ||
    prototype.msMatchesSelector ||
    match;

  return method.call(element, selector);
}

// 最接近的祖先元素匹配选择器（也测试元素本身）
export function closest(element, selector) {
  const { prototype } = Element;

  // https://developer.mozilla.org/en-US/docs/Web/API/Element/closest#Polyfill
  function closestElement() {
    let el = this;

    do {
      if (matches.matches(el, selector)) return el;
      el = el.parentElement || el.parentNode;
    } while (el !== null && el.nodeType === 1);
    return null;
  }

  const method = prototype.closest || closestElement;

  return method.call(element, selector);
}

// 获取所有的元素
export function getElements(selector) {
  return this.elements.container.querySelectorAll(selector);
}

// 获取单个元素
export function getElement(selector) {
  return this.elements.container.querySelector(selector);
}

// 设置焦点和标签焦点类
export function setFocus(element = null, tabFocus = false) {
  if (!is.element(element)) {
    return;
  }

  // 设置焦点 方式滚动
  element.focus({ preventScroll: true });

  // 通过标签模拟键盘焦点
  if (tabFocus) {
    toggleClass(element, this.config.classNames.tabFocus);
  }
}
