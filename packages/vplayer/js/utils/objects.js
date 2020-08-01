/**
 * 对象工具
 */
import is from './is';

// 深拷贝嵌套对象
export function cloneDeep(object) {
  return JSON.parse(JSON.stringify(object));
}

// 获取对象中的指定值
export function getDeep(object, path) {
  return path.split('.').reduce((obj, key) => obj && obj[key], object);
}

// 将所有可枚举属性的值从一个或多个源对象复制到目标对象，类似于Object.assign
export function extend(target = {}, ...sources) {
  if (!sources.length) {
    return target;
  }

  const source = sources.shift();

  if (!is.object(source)) {
    return target;
  }

  Object.keys(source).forEach(key => {
    if (is.object(source[key])) {
      if (!Object.keys(target).includes(key)) {
        Object.assign(target, { [key]: {} });
      }

      extend(target[key], source[key]);
    } else {
      Object.assign(target, { [key]: source[key] });
    }
  });

  return extend(target, ...sources);
}
