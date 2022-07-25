// 递归数组层级数据
// arr的结构
// [
//   {
//     title: '',
//     item: [
//       {
//         title:'',
//         item : [
//           {
//             title:'',
//             item: []
//           }
//         ]
//       }
//     ]
//   }
// ];
export default function (arrAttrName) {
  const arrName = arrAttrName || 'item';
  return {
    recursion(arr, callbackFn, level, preItem) {
      if (Array.isArray(arr)) {
        // eslint-disable-next-line no-unused-expressions
        typeof level === 'number' ? level++ : (level = 0);
        arr.forEach((item, index) => {
          callbackFn(item, index, level, preItem);
          if (item[arrName] && item[arrName].length > 0) {
            this.recursion(item[arrName], callbackFn, level, item);
          }
        });
      }
      return false;
    },
  };
}
