// ==========================================================================
// String utils
// ==========================================================================

import is from './is';

//  生成一个随机ID
export function generateId(prefix) {
  return `${prefix}-${Math.floor(Math.random() * 10000)}`;
}

// 格式字符串
export function format(str, ...args) {
  if (is.empty(str)) {
    return str;
  }

  return str.toString().replace(/{(\d+)}/g, (match, i) => args[i].toString());
}

// 取得百分比
export function getPercentage(current, max) {
  if (current === 0 || max === 0 || Number.isNaN(current) || Number.isNaN(max)) {
    return 0;
  }

  return ((current / max) * 100).toFixed(2);
}

// 替换字符串中所有出现的字符串
export const replaceAll = (input = '', find = '', replace = '') =>
  input.replace(new RegExp(find.toString().replace(/([.*+?^=!:${}()|[\]/\\])/g, '\\$1'), 'g'), replace.toString());

// 标题大小写转换
export const toTitleCase = (str = '') =>
str.toString().replace(/\w\S*/g, text => text.charAt(0).toUpperCase() + text.substr(1).toLowerCase());


export function toPascalCase(str = '') {
  let string = str.toString();

  // Convert kebab case
  string = replaceAll(string, '-', ' ');

  // Convert snake case
  string = replaceAll(string, '_', ' ');

  // Convert to title case
  string = toTitleCase(string);

  // Convert to pascal case
  return replaceAll(string, ' ', '');
}

// Convert string to pascalCase
export function toCamelCase(input = '') {
  let string = input.toString();

  // Convert to pascal case
  string = toPascalCase(string);

  // Convert first character to lowercase
  return string.charAt(0).toLowerCase() + string.slice(1);
}

// 从字符串中删除HTML
export function stripHTML(source) {
  const fragment = document.createDocumentFragment();
  const element = document.createElement('div');
  fragment.appendChild(element);
  element.innerHTML = source;
  return fragment.firstChild.innerText;
}

// 获得html，也适用于DocumentFragment
export function getHTML(element) {
  const wrapper = document.createElement('div');
  wrapper.appendChild(element);
  return wrapper.innerHTML;
}
