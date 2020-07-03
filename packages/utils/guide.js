import Guide from "./../guide/src/";
let myGuide = (steps, params) => {
  const ops = {
    animate: true,
    opacity: 0.8,
    padding: 5,
    showButtons: true
  };
  let options = params || ops;
  if (!Object.prototype.toString.call(options) === "[object Object]") {
    console.error(
      "options 参数应该为一个object类型，或者不传参使用默认参数"
    );
    return false;
  }
  if (!Object.prototype.toString.call(steps) === "[object Array]") {
    console.error("steps 参数应该为一个数组对象");
    return false;
  }
  const guide = new Guide(options);
  guide.defineSteps(steps);
  guide.start();
}

export default myGuide