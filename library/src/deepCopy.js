
/**
 * 深拷贝
 * 但不能拷贝函数/方法，undefined，symbol等
 *
 * @param   {[Object && Array]}  obj  [不包含函数、undefined，symbol等的数组或对象]
 * 
 * @return  {[Object && Array]}       [拷贝的新的数据对象]
 */
export function jsonDeepClone (obj) {
  const o = JSON.parse(JSON.stringify(obj))
  return o
}

/**
 * 通用的深拷贝
 * 可以拷贝带undefined，null，函数，深嵌套等
 *
 * @param   {[Object && Array]}  obj  [可以是数组、对象等任意数据]
 * 
 * @return  {[Object && Array]}       [拷贝的新的数据对象]
 */
export function objDeepClone (obj) {
  let o = obj.constructor === Array ? [] : {};
  for (let i in obj) {
    o[i] = obj[i] !== null && typeof obj[i] === "object" ? objDeepClone(obj[i]) : obj[i];
  }
  return o;
}
