import is from './is';
/**
 * 这对于避免无害但可能会引起混淆的“未捕获”很有用
 * promise对错误消息进行尽禁止
 * @param  {Object} value
 */
export function silencePromise(value) {
  if (is.promise(value)) {
    value.then(null, () => {});
  }
}

export default { silencePromise };
