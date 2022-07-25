// 复制一份新副本 返回
export default function (obj, deepClone, hash = new WeakMap()) {
  if (deepClone) {
    // 递归拷贝
    if (obj instanceof RegExp) return new RegExp(obj);
    if (obj instanceof Date) return new Date(obj);
    if (obj === null || typeof obj !== 'object') {
      // 如果不是复杂数据类型，直接返回
      return obj;
    }
    if (hash.has(obj)) {
      return hash.get(obj);
    }
    /**
     * 如果obj是数组，那么 obj.constructor 是 [Function: Array]
     * 如果obj是对象，那么 obj.constructor 是 [Function: Object]
     */
    const t = new obj.constructor();
    hash.set(obj, t);
    // eslint-disable-next-line no-restricted-syntax
    for (const key in obj) {
      // 递归
      // eslint-disable-next-line no-prototype-builtins
      if (obj.hasOwnProperty(key)) {
        // 是否是自身的属性
        t[key] = copyNewValue(obj[key], deepClone, hash);
      }
    }
    return t;
  }
  return JSON.parse(JSON.stringify(obj));
  // return { ...obj };
}

