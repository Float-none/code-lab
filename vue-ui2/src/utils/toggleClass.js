/**
 * 动态切换主题
 *
 * @export
 * @param {*} element 目标元素
 * @param {*} className 主题包命名空间 如: light-theme dark-theme
 * @returns
 */
export default function (element, className) {
  const el = element;
  if (!el || !className) {
    return;
  }
  let classString = el.className;
  const nameIndex = classString.indexOf(className);
  if (nameIndex === -1) {
    // classString += "" + className;
    if (classString) {
      classString = "";
      classString += `${className}`;
    } else {
      classString += `${className}`;
    }
  } else {
    classString =
      classString.substr(0, nameIndex) +
      classString.substr(nameIndex + className.length);
  }
  // Don’t Reassign Your Function Arguments 不要重新给函数参数赋值
  if (classString) {
    el.className = classString;
  }
}
