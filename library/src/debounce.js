
/**
 * 防抖
 */
// immediate 立即调用，不等延迟
let delay = restArguments(function (func, wait, args) {
  return setTimeout(function () {
    return func.apply(null, args);
  }, wait);
});

function restArguments(func, startIndex) {
  startIndex = startIndex == null ? func.length - 1 : +startIndex;
  return function () {
    let length = Math.max(arguments.length - startIndex, 0),
      rest = Array(length),
      index = 0;
    for (; index < length; index++) {
      rest[index] = arguments[index + startIndex];
    }
    switch (startIndex) {
      case 0: return func.call(this, rest);
      case 1: return func.call(this, arguments[0], rest);
      case 2: return func.call(this, arguments[0], arguments[1], rest);
    }
    let args = Array(startIndex + 1);
    for (index = 0; index < startIndex; index++) {
      args[index] = arguments[index];
    }
    args[startIndex] = rest;
    return func.apply(this, args);
  };
}

function debounce(func, wait, immediate) {
  let timeout, result;

  const later = function (context, args) {
    timeout = null;
    if (args) result = func.apply(context, args);
  };

  let debounced = restArguments(function (args) {
    if (timeout) clearTimeout(timeout);
    if (immediate) {
      let callNow = !timeout;
      timeout = setTimeout(later, wait);
      if (callNow) result = func.apply(this, args);
    } else {
      timeout = delay(later, wait, this, args);
    }

    return result;
  });

  debounced.cancel = function () {
    clearTimeout(timeout);
    timeout = null;
  };

  return debounced;
}

export default debounce;
  


    // let a = 0
    // let doSome = debounce(function () {
    //   if (a > 6) {
    //     doSome.cancel()
    //   }
    // }, 800, true)

    // document.querySelector("#btn").onclick = doSome
    // document.querySelector("#btn1").onclick = function () {
    //   if (a > 50) {
    //     doSome.cancel()
    //   }
    // }
  

    /*
    返回 function 函数的防反跳版本, 将延迟函数的执行(真正的执行)在函数最后一次调用时刻的 wait 毫秒之后. 对于必须在一些输入（多是一些用户操作）停止到达之后执行的行为有帮助。 例如: 渲染一个Markdown格式的评论预览, 当窗口停止改变大小之后重新计算布局, 等等.

    在 wait 间隔结束时，将使用最近传递给 debounced（去抖动）函数的参数调用该函数。

    传参 immediate 为 true， debounce会在 wait 时间间隔的开始调用这个函数 。（并且在 waite 的时间之内，不会再次调用。）在类似不小心点了提交按钮两下而提交了两次的情况下很有用。

    let lazyLayout = _.debounce(calculateLayout, 300);
    $(window).resize(lazyLayout);
    如果需要取消预定的 debounce ，可以在 debounce 函数上调用 .cancel()。
    */