import extractNumber from '../extractNumberFromString';
// 接收多参数，返回数组
export default function () {
  // arguments 函数隐藏属性，代表当前数值
  // console.log(arguments)
  const paramsBox = [];
  if (arguments.length <= 0) {
    console.error('参数为空！');
    return paramsBox;
  }
  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < arguments.length; i++) {
    if ((arguments[i] ?? '') === '') {
      // 如果传过来的参数为nul '' undefined，则设置此值为0 
      paramsBox[i] = 0;
    } else {
      paramsBox[i] = Number(extractNumber(arguments[i])) || 0;
    }
  }
  return paramsBox;
}
