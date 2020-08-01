/**
 * 加载外部脚本
 * 动态载入js文件，并指定载入后执行什么函数
 * 
 * url 要载入的js网址，必选参数
 * 可以使用第二和第三个参数，这两个参数必须是函数
 * 第二个参数表示js载入成功后执行的函数
 * 第三个参数表示js载入失败后执行的函数
 */
import loadjs from 'loadjs';

export default function loadScript(url) {
  return new Promise((resolve, reject) => {
    loadjs(url, {
      success: resolve,
      error: reject,
    });
  });
}
