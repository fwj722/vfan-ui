let now = Date.now || function() {
  return new Date().getTime();
};
 function throttle(func, wait, options) {
  let timeout, context, args, result;
  let previous = 0;
  if (!options) options = {};

  const later = function () {
    previous = options.leading === false ? 0 : now();
    timeout = null;
    result = func.apply(context, args);
    if (!timeout) context = args = null;
  };

  let throttled = function () {
    const _now = now();
    if (!previous && options.leading === false) previous = _now;
    let remaining = wait - (_now - previous);
    context = this;
    args = arguments;
    if (remaining <= 0 || remaining > wait) {
      if (timeout) {
        clearTimeout(timeout);
        timeout = null;
      }
      previous = _now;
      result = func.apply(context, args);
      if (!timeout) context = args = null;
    } else if (!timeout && options.trailing !== false) {
      timeout = setTimeout(later, remaining);
    }
    return result;
  };

  throttled.cancel = function () {
    clearTimeout(timeout);
    previous = 0;
    timeout = context = args = null;
  };

  return throttled;
}
export default throttle;
/*
  var a = 0
    var doSome = throttle(function () {
      console.log(a++)
      if (a > 6) {
        doSome.cancel()
      }
    }, 800, true)
    document.querySelector("#btn").onclick = doSome
*/

  /*
    throttle_.throttle(function, wait, [options])
创建并返回一个像节流阀一样的函数，当重复调用函数的时候，至少每隔 wait毫秒调用一次该函数。对于想控制一些触发频率较高的事件有帮助。

默认情况下，throttle将在你调用的第一时间尽快执行这个function，并且，如果你在wait周期内调用任意次数的函数，都将尽快的被覆盖。如果你想禁用第一次首先执行的话，传递{leading: false}，还有如果你想禁用最后一次执行的话，传递{trailing: false}。

var throttled = _.throttle(updatePosition, 100);
$(window).scroll(throttled);
如果需要取消预定的 throttle ，可以在 throttle 函数上调用 .cancel()。
    */