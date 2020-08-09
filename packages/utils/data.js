
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

/**
 * 数组去重
 * 兼容性好的通用的数组去重，包括 对undefined,null,NaN,""等的去重
 *
 * @param   {[Array]}  array  数组
 * 
 * @return  {[Array]}         去重后的数组
 */
export function unique (array) {
  let arr = [];
  let flag = true;
  if(array.constructor !== Array){
    array = [].slice.call(array)
  }
  for (let i = 0; i < array.length; i++) {
    if (arr.indexOf(array[i]) == -1) {
      if (array[i] != array[i]) {
        if (flag) {
          arr.push(array[i]);
          flag = false;
        }
      } else {
        arr.push(array[i]);
      }
    }
  }
  return arr;
}

/**
 * 数组去重
 * 只适用于支持ES6+语法的环境
 * @param   {[Array]}  array  数组
 * 
 * @return  {[Array]}        去重后的数组
 */
export function setUnique (array) {
  return Array.from(new Set(array));
}

/**
 * 数组合并再去重
 *
 * @param   {[Array]}  arr1  数组1
 * @param   {[Array]}  arr2  数组2
 * 
 * @return  {[Array]}        返回新的数组
 */
export function concatArr(arr1, arr2){
  if(arr1.constructor !== Array){
    arr1 = [].slice.call(arr1)
  }
  if(arr2.constructor!==Array){
    arr2 = [].slice.call(arr2)
  }
  let arr = arr1.concat(arr2);
  arr = unique(arr);//再引用上面的任意一个去重方法
  return arr;
}

/**
 * 普通数组排序
 *
 * @param   {[Array]}  arr  要排序的数组
 * @param   {[Number]}  type  0||省略-正序；1-倒序
 *
 * @return  {[Array]}        排序后的数组
 */
export function sort(arr,type){
  if(arr.constructor!==Array){
    arr = [].slice.call(arr)
  }
  arr.sort(function(x,y){
    if (x < y) {
        return type?1:-1;
    } else if (x > y) {
        return type?-1:1;
    } else {
        return 0;
    }})
  return arr
} 

/**
 * 数组对象排序
 * 根据指定属性进行排序
 * @param   {[Array]}  arr    需要排序的数组
 * @param   {[String]}  attr  根据指定的属性
 * @param   {[Number]}  type  0||省略-正序；1-倒序
 * 
 * @return  {[Array]}       返回新的数组
 */
export function arrayObjSort(arr,attr,type){
  function compare(prop) {
    return function (obj1, obj2) {
        let val1 = obj1[prop];
        let val2 = obj2[prop];
        if (!isNaN(Number(val1)) && !isNaN(Number(val2))) {
            val1 = Number(val1);
            val2 = Number(val2);
        }
        if (val1 < val2) {
            return type?1:-1;
        } else if (val1 > val2) {
            return type?-1:1;
        } else {
            return 0;
        }            
    } 
  }
   return arr.sort(compare(attr))
}