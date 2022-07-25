// 文件导出下载
export default function (content, fileName) {
  const aTag = document.createElement('a');
  aTag.setAttribute('download', fileName);
  // const blob = new Blob([content], { type: res.type });
  aTag.setAttribute('href', URL.createObjectURL(content));
  document.body.appendChild(aTag);
  aTag.click();
  document.body.removeChild(aTag);
}
