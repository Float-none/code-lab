// 获取数据中的数字，并返回
export default function (num) {
  if (typeof num === 'string') {
    // eslint-disable-next-line no-param-reassign
    num = num.replace(/[^\d]/g, '');
  }
  return num;
}
