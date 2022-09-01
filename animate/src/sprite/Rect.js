export default function(ctx, params) {
  ctx.fillStyle = params.color;
  ctx.fillRect(params.x, params.y, params.width, params.height);
}
