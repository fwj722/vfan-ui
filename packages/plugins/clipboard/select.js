/*
 * @Description:
 * @Author: fanwenjing
 * @LastEditors: fanwenjing
 * @Date: 2020-11-16 14:34:28
 * @LastEditTime: 2020-11-16 15:19:59
 */
function select(element) {
  let selectedText;
  // 入股是表单，如INPUT和TEXTAREA时
  if (element.nodeName === "INPUT" || element.nodeName === "TEXTAREA") {
    // 如果表单不是只读，则设置为只读
    let isReadOnly = element.hasAttribute("readonly");
    if (!isReadOnly) {
      element.setAttribute("readonly", "");
    }
    //选中INPUT或者TEXTAREA中文本内容（这里只是选中，方便后续复制选中的内容）
    element.select();
    //设置光标位置，即选中文本的起始和终止位置，这里默认为从文本的0开始，到文本的长度结束
    element.setSelectionRange(0, element.value.length);
    selectedText = element.value;
  } else {
    //如果标签有contenteditable属性，即可编辑时
    if (element.hasAttribute("contenteditable")) {
      element.focus();
    }
    // 选择的文本范围，光标的当前位置
    let selection = window.getSelection();
    //创建range对象
    let range = document.createRange();

    // 选择element节点的子节点
    range.selectNodeContents(element);
    selection.removeAllRanges();
    selection.addRange(range);

    selectedText = selection.toString();
  }

  return selectedText;
}

export default select;
