// 简单封装localstorage 与 sessionstorage方法
export default function(mode) {
  // const abc = mode || 'localStorage';
  let methods = null;
  try {
    methods = {
      localStorage: window.localStorage,
      sessionStorage: window.sessionStorage,
    };
  } catch (err) {
    console.error(
      '浏览器不支持window.localStorage 或者 window.sessionstorage~'
    );
    return false;
  }

  return {
    set(mark, data) {
      if (!data) {
        return false;
      }
      methods[mode].setItem(mark, JSON.stringify(data));
    },
    get(mark) {
      const data = methods[mode].getItem(mark);
      if (data) {
        return JSON.parse(data);
      }
      return false;
    },
    remove(mark) {
      methods[mode].removeItem(mark);
    },
    removeAll() {
      methods[mode].clear();
    },
  };
}

