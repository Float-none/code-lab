<template>
  <div class="ki" id="ki"></div>
</template>

<script>
import * as PIXI from "pixi.js";
import Ball from "@/utils/ball";
const { Application, Rectangle, Graphics } = PIXI;

let app = null;

const APP_WIDTH = 1100;
const APP_HEIGHT = 700;

export default {
  data() {
    return {};
  },
  mounted() {
    app = new Application({
      width: APP_WIDTH,
      height: APP_HEIGHT,
      antialias: true,
      backgroundAlpha: true,
      resolution: 1,
      backgroundColor: 0xcccccc,
    });
    document.getElementById("ki").appendChild(app.view);

    const ball = new Ball(4);
    ball.radius = 4;
    ball.x = 100;
    ball.y = 50;
    ball.vx = 0;
    ball.vy = 0;
    const lines = [];
    const numLines = 5;
    const gravity = 0.3;
    const bounce = -0.6;

    // 创建 5 个 line 影片
    for (let num = 0; num < numLines; num++) {
      const line = new Graphics();
      line.lineStyle(1);
      line.moveTo(-50, 0);
      line.lineTo(50, 0);
      app.stage.addChild(line);
      lines.push(line);
    }
    // 放置并旋转
    lines[0].x = 100;
    lines[0].y = 100;
    lines[0].rotation = 30;
    lines[1].x = 100;
    lines[1].y = 230;
    lines[1].rotation = 45;
    lines[2].x = 250;
    lines[2].y = 180;
    lines[2].rotation = -30;
    lines[3].x = 150;
    lines[3].y = 330;
    lines[3].rotation = 10;
    lines[4].x = 230;
    lines[4].y = 250;
    lines[4].rotation = -30;
    app.stage.addChild(ball);

    function checkLine(line) {
      // 获得 line 的边界
      var bounds = line.getBounds(this);
      if (ball.x > bounds.left && ball.x < bounds.right) {
        // 获取角度与正余弦值
        var angle = (line.rotation * Math.PI) / 180;
        var cos = Math.cos(angle);
        var sin = Math.sin(angle);
        // 获取 ball 与 line 的相对位置
        var x1 = ball.x - line.x;
        var y1 = ball.y - line.y;
        // 旋转坐标
        var y2 = cos * y1 - sin * x1;
        // 旋转速度向量
        var vy1 = cos * ball.vy - sin * ball.vx;
        // 实现反弹
        if (y2 > -ball.height / 2 && y2 < vy1) {
          // 旋转坐标
          var x2 = cos * x1 + sin * y1;
          // 旋转速度向量
          var vx1 = cos * ball.vx + sin * ball.vy;
          y2 = -ball.height / 2;
          vy1 *= bounce;
          // 将一切旋转回去
          x1 = cos * x2 - sin * y2;
          y1 = cos * y2 + sin * x2;
          ball.vx = cos * vx1 - sin * vy1;
          ball.vy = cos * vy1 + sin * vx1;
          ball.x = line.x + x1;
          ball.y = line.y + y1;
        }
      }
    }
    app.ticker.add(function (delta) {
      // 正常移动
      ball.vy += gravity;
      ball.x += ball.vx;
      ball.y += ball.vy;
      // 舞台四周的反弹
      if (ball.x + ball.radius > APP_WIDTH) {
        ball.x = APP_WIDTH - ball.radius;
        ball.vx *= bounce;
      } else if (ball.x - ball.radius < 0) {
        ball.x = ball.radius;
        ball.vx *= bounce;
      }
      if (ball.y + ball.radius > APP_HEIGHT) {
        ball.y = APP_HEIGHT - ball.radius;
        ball.vy *= bounce;
      } else if (ball.y - ball.radius < 0) {
        ball.y = ball.radius;
        ball.vy *= bounce;
      }
      // 检查每条线
      for (var i = 0; i < numLines; i++) {
        checkLine(lines[i]);
      }
    });
  },
};
</script>