/**
 * 使用XHR避免旧版浏览器出现问题
 */
export default function fetch(url, responseType = 'text') {
  return new Promise((resolve, reject) => {
    try {
      const request = new XMLHttpRequest();

      // 判断CORS支持情况
      if (!('withCredentials' in request)) {
        return;
      }

      request.addEventListener('load', () => {
        if (responseType === 'text') {
          try {
            resolve(JSON.parse(request.responseText));
          } catch (e) {
            resolve(request.responseText);
          }
        } else {
          resolve(request.response);
        }
      });

      request.addEventListener('error', () => {
        throw new Error(request.status);
      });

      request.open('GET', url, true);

      // 设置响应类型
      request.responseType = responseType;

      request.send();
    } catch (e) {
      reject(e);
    }
  });
}
