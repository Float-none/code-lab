/*
  四舍六入五成双算法取值
  实例，如以下数字取两位小数点，则
  0.5546 => 0.55
  0.5566 => 0.57
  0.5556 => 0.56
  0.5456 => 0.54
  代入参数
  num : 数字
  precision : 小数点后几位 最大不超过8位~

*/

// export default function bankerRounding(num, precision) {
export default function (num, precision) {
  // 非number类型 返回
  if (typeof num !== 'number') return false;
  // 整数型数字，直接返回
  if (num % 1 === 0) return num;
  // if(typeoof num )
  const decimalPlaces = precision || 2;
  // eslint-disable-next-line no-restricted-properties
  const powForNum = Math.pow(10, decimalPlaces);
  const toFixedForNum = +(decimalPlaces ? num * powForNum : num).toFixed(8);
  const floorForNum = Math.floor(toFixedForNum);
  const eNum = 1e-8;
  // eslint-disable-next-line no-nested-ternary
  // eslint-disable-next-line max-len
  const result = (floorForNum > 0.5 - eNum && floorForNum < 0.5 + eNum) ? ((floorForNum % 2 === 0) ? floorForNum : floorForNum + 1) : Math.round(toFixedForNum);
  return decimalPlaces ? result / powForNum : result;

}
