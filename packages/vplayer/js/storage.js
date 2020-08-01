/**
 * 存储
 */
import is from './utils/is';
import { extend } from './utils/objects';

class Storage {
  constructor(player) {
    this.enabled = player.config.storage.enabled;
    this.key = player.config.storage.key;
  }

  // 检查支持情况，判断是否可以使用
  static get supported() {
    try {
      if (!('localStorage' in window)) {
        return false;
      }
      const test = '___test';
      window.localStorage.setItem(test, test);
      window.localStorage.removeItem(test);
      return true;
    } catch (e) {
      return false;
    }
  }

  get(key) {
    if (!Storage.supported || !this.enabled) {
      return null;
    }

    const store = window.localStorage.getItem(this.key);

    if (is.empty(store)) {
      return null;
    }

    const json = JSON.parse(store);

    return is.string(key) && key.length ? json[key] : json;
  }

  set(object) {
    //如果浏览器不支持localStorage或已将其禁用，则将其禁掉
    if (!Storage.supported || !this.enabled) {
      return;
    }

    // 只可以存储对象
    if (!is.object(object)) {
      return;
    }

    // 获取当前存储
    let storage = this.get();

    // 默认为空对象
    if (is.empty(storage)) {
      storage = {};
    }

    // 将object源对象复制到目标对象storage
    extend(storage, object);

    // storage对象存储更新
    window.localStorage.setItem(this.key, JSON.stringify(storage));
  }
}
export default Storage;
