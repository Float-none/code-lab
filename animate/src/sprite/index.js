/*
name 精灵名称
painter 绘画
behavior 行为参数
*/
const Sprite = function(name, painter, behaviors) {
  if(name !== undefined){
    this.name = name;
  }
  if(painter !== undefined){
    this.painter = painter;
  }
  const config = {
    x: 0,
    y: 0,
    width: 10,
    height: 10,
    velocityX: 0,
    velocityY: 0,
    visible: true,
    animating: false,
    behaviors: behaviors || []
  };
  this.config = config;
  return this;
};

// 绘画
Sprite.prototype.paint = function(context){
  if(this.painter !== undefined && this.visible){
    this.painter.paint(this,context);
  }
}
// 更新
Sprite.prototype.update = function(context,time){
  this.behaviors.forEach(node =>{
    node.execute(this,context,time)
  })
}

export default Sprite;
