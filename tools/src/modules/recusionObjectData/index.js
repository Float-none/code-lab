import isObject from '../isObject/index.js';

export default function(obj, callbackFn) {
  Object.keys(obj).forEach(name => {
    callbackFn(name, obj);
    if (isObject(obj[name])) {
      recursion(obj[name], callbackFn);
    }
  });
}
