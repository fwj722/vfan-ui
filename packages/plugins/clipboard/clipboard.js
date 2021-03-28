/*
 * @Description:
 * @Author: fanwenjing
 * @LastEditors: fanwenjing
 * @Date: 2020-11-16 14:32:56
 * @LastEditTime: 2020-11-16 15:02:08
 */
import select from "./select";

//复制到剪切板的方法
export default function({
  text,
  showSuccessTip = "复制成功",
  showFailureTip = "复制失败",
  successCallback,
  failureCallback
}) {
  //获取当前的document.body元素
  const container = document.body;
  // 创建textarea对象，用于存放复制的内容
  const fakeElem = document.createElement("textarea");
  fakeElem.style.fontSize = "12px";
  fakeElem.style.border = "0";
  fakeElem.style.padding = "0";
  fakeElem.style.margin = "0";
  fakeElem.style.position = "absolute";
  fakeElem.style["left"] = "-9999px";
  let yPos = window.pageYOffset || document.documentElement.scrollTop;
  fakeElem.style.top = `${yPos}px`;
  // 将textarea置为只读
  fakeElem.setAttribute("readonly", "");
  // 将要复制的内容存储在textarea中
  fakeElem.value = text;
  // 将textarea对象挂到body文档流中
  container.appendChild(fakeElem);
  select(fakeElem);
  try {
    // 复制选中的文字到剪贴板
    document.execCommand("copy");
    if (showSuccessTip) {
      this.$msg({
        message:showSuccessTip,
        type:"success"
      });
    }
    if (successCallback) {
      successCallback.call();
    }
  } catch (err) {
    if (showFailureTip) {
      this.$msg({
        message:showFailureTip,
        type:"error"
      });
    }
    if (failureCallback) {
      failureCallback.call();
    }
  }
}
