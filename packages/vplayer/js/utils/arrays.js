/**
 * Array 数组工具
 */
import is from './is';

// 删除数组中重复的数据
export function dedupe(array) {
  if (!is.array(array)) {
    return array;
  }

  return array.filter((item, index) => array.indexOf(item) === index);
}

//获取数组中最接近指定值的值
export function closest(array, value) {
  if (!is.array(array) || !array.length) {
    return null;
  }

  return array.reduce((prev, curr) => (Math.abs(curr - value) < Math.abs(prev - value) ? curr : prev));
}
