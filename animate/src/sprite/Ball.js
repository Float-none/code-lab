export default function(ctx, params) {
  ctx.beginPath();
  ctx.arc(params.x, params.y, params.radius, 0, Math.PI * 2, true);
  ctx.closePath();
  ctx.fillStyle = params.color;
  ctx.fill();
}
