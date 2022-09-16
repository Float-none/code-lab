
// 计算两点之间的距离
export function dist(x, y, x1, y1) {
  const dx = x1 - x;
  const dy = y1 - y;
  return Math.sqrt(dx * dx + dy * dy);
}

// 向量 加速度 角速度
// 角速度转换为 x,y 速度向量：
vx = speed * Math.cos(angle); 
vy = speed * Math.sin(angle);
// 角加速度(作用于物体上的 force )转换为 x,y 加速度：
ax = force * Math.cos(angle); 
ay = force * Math.sin(angle);