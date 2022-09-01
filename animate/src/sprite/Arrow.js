export default function(ctx, params) {
  const X = params.x;
  const Y = params.y;
  // -50,-25
  const arrowPoint = [
    [X + 50, Y],
    [X + 50, Y - 25],
    [X + 100, Y + 25],
    [X + 50, Y + 75],
    [X + 50, Y + 50],
    [X, Y + 50],
    [X, Y]
  ];
  ctx.beginPath();
  ctx.moveTo(X, Y);
  arrowPoint.forEach(item => {
    ctx.lineTo(item[0], item[1]);
  });
  ctx.fillStyle = params.color;
  ctx.fill();
}
