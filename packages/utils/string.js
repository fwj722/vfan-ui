
/**
 * 去除字符串的空格
 *
 * @param   {[String]}  str   要去除空格的字符串
 * @param   {[String]}  type  去除空格的地方，如果不传则默认去除首尾空格：
 ***************************** ——fore-aft除头和尾
 ***************************** ——all去除所有空格
 ***************************** ——left去除左边所有空格
 ***************************** ——right去右边所有空格
 * @return  {[String]}        返回处理后的字符串
 */
export function trim (str, type) {
  if (type === "fore-aft" || type === undefined) {
    return str.replace(/^[" "||" "]*/, "").replace(/[" "|" "]*$/, "");// 去除头和尾
  } else if (type === "all") {
    return str.replace(/\s/g, '');//去除所有空格
  } else if (type === "right") {
    return str.replace(/(\s*$)/g, "");//去除右边所有空格
  }else if(type === "left"){
    return str.replace(/^\s*/g, "");//去除左边所有空格
  }
}