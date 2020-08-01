/**
 * [excel文件导出]
 * data 接口返回的数据
 * name 文件的名字
 * [注]：如果出现导出乱码，在调用接口的参数中添加参数responseType: 'blob'即可
 */
export function exportExcel(data, name) {
  const blob = new Blob([data],{type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8'});
  const fileName = name; //下载文件名称

  if (window.navigator.msSaveBlob) {
    // 兼容IE11+
    window.navigator.msSaveBlob(blob, fileName);
  } else {
    // 其他浏览器下载
    const eLink = document.createElement("a");
    eLink.download = fileName;
    eLink.style.display = "none";
    eLink.href = URL.createObjectURL(blob);
    document.body.appendChild(eLink);
    eLink.click();
    URL.revokeObjectURL(eLink.href); // 释放URL 对象
    document.body.removeChild(eLink);
  }
}
