import Ball from "./ball";

export default function(app) {
  const balls = [];
  const count = 100;
  const gravity = 0.5;
  const wind = -5;
  const BallRadius = 4;
  for (let i = 0; i < count; i++) {
    let ball = new Ball(BallRadius, Math.random() * 0xffffff);
    ball.x = app.screen.width / 2;
    ball.y = app.screen.height;
    ball.vx = Math.random() * 5 - 1;
    ball.vy = Math.random() * -40;
    app.stage.addChild(ball);
    ball.radius = BallRadius;
    balls.push(ball);
  }
  app.ticker.add(function(delta) {
    for (let i = 0; i < balls.length; i++) {
      const ball = balls[i];
      ball.vy += gravity;
      ball.x += ball.vx + wind;
      ball.y += ball.vy;
      if (
        ball.x - ball.radius > app.screen.width ||
        ball.x + ball.radius < 0 ||
        ball.y - ball.radius > app.screen.height ||
        ball.y + ball.radius < 0
      ) {
        ball.x = app.screen.width / 2;
        ball.y = app.screen.height;
        ball.vx = Math.random() * 2 - 1;
        ball.vy = Math.random() * -10 - 10;
      }
    }
  });
}
