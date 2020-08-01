/**
 * 类型检查工具
 * author fanenjing
 * emil 1508488207@qq.com
 */

const getConstructor = obj => (obj !== null && typeof obj !== 'undefined' ? obj.constructor : null)
const instanceOf = (obj, constructor) => Boolean(obj && constructor && obj instanceof constructor)
const isNullOrUndefined = obj => obj === null || typeof obj === 'undefined'
const isObject = obj => getConstructor(obj) === Object
const isNumber = obj => getConstructor(obj) === Number && !Number.isNaN(obj)
const isString = obj => getConstructor(obj) === String
const isBoolean = obj => getConstructor(obj) === Boolean
const isFunction = obj => getConstructor(obj) === Function
const isArray = obj => Array.isArray(obj)
const isWeakMap = obj => instanceOf(obj, WeakMap)
const isNodeList = obj => instanceOf(obj, NodeList)
const isElement = obj => instanceOf(obj, Element)
const isTextNode = obj => getConstructor(obj) === Text
const isEvent = obj => instanceOf(obj, Event)
const isKeyboardEvent = obj => instanceOf(obj, KeyboardEvent) // 键盘事件
const isCue = obj => instanceOf(obj, window.TextTrackCue) || instanceOf(obj, window.VTTCue)  //监测webVTT字幕
const isTrack = obj => instanceOf(obj, TextTrack) || (!isNullOrUndefined(obj) && isString(obj.kind))
const isPromise = obj => instanceOf(obj, Promise) && isFunction(obj.then)

const isEmpty = obj =>
  isNullOrUndefined(obj) ||
  ((isString(obj) || isArray(obj) || isNodeList(obj)) && !obj.length) ||
  (isObject(obj) && !Object.keys(obj).length)

const isUrl = url => {
  // 判断url对象
  if (instanceOf(url, window.URL)) {
    return true
  }

  // 判断是否为字符串，这里要求必须是字符串
  if (!isString(url)) {
    return false
  }

  // 根据需要添加协议
  let string = url
  if (!url.startsWith('http://') || !url.startsWith('https://')) {
    string = `http://${url}`
  }

  try {
    return !isEmpty(new URL(string).hostname)
  } catch (e) {
    return false
  }
}

export default {
  nullOrUndefined: isNullOrUndefined,
  object: isObject,
  number: isNumber,
  string: isString,
  boolean: isBoolean,
  function: isFunction,
  array: isArray,
  weakMap: isWeakMap,
  nodeList: isNodeList,
  element: isElement,
  textNode: isTextNode,
  event: isEvent,
  keyboardEvent: isKeyboardEvent,
  cue: isCue,
  track: isTrack,
  promise: isPromise,
  url: isUrl,
  empty: isEmpty,
}
