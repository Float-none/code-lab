import Ball from "./Ball";
import Rect from "./Rect";
import Arrow from "./Arrow";

// 参数模板
const baseConfig = {
  x: 10,
  y: 10,
  width: 100,
  height: 100,
  radius: 10,
  color: "green"
};

function InitCanvas(element) {
  // 如果元素为空，则抛出错误
  if (!element) {
    throw new Error("参数为空！");
  }
  let canvas = document.getElementById(element);

  this.draw2D = canvas.getContext("2d");

  // this.baseConfig = baseConfig;

  // 嵌入内置一些固定方法
  const embedMethods = {
    'drawBall': Ball,
    'drawRect': Rect,
    'drawArrow': Arrow
  };

  Object.keys(embedMethods).forEach(name => {
    this.embedInitCanvas(name, embedMethods[name]);
  });
}
// 内置入自定义canvas中一些方法
InitCanvas.prototype.embedInitCanvas = function(name, fn) {
  const installParams = function(obj){
    const params = obj || baseConfig;
    return fn.bind(this)(this.draw2D,params);
  }
  this[name] = installParams;
};

export default InitCanvas;
