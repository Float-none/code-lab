<template>
  <div class="ki" id="ki"></div>
</template>

<script>
import * as PIXI from "pixi.js";
import Arrow from "@/utils/arrow";
import Ball from "@/utils/ball";
import Fountain from "@/utils/fountain";
import hitTestRectangle from "@/utils/hitTestRectangle";
import { contains } from "micromatch";

const APP_WIDTH = 1100;
const APP_HEIGHT = 700;
const { Application, Rectangle, Graphics } = PIXI;

let app = null;

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

    app.stage.interactive = true;
    app.stage.hitArea = new PIXI.Rectangle(0, 0, APP_WIDTH, APP_HEIGHT);

    document.getElementById("ki").appendChild(app.view);

    this.drawArrow();
  },
  methods: {
    drawArrow() {
      const arrow = new Arrow();
      let redBall = new Ball(10, 100, 800);
      arrow.x = 550;
      arrow.y = 210;
      // const ball = new Ball(50, 100, 12);

      app.stage.addChild(arrow, redBall);
      let targetX = 0;
      let targetY = 500;
      let angle = 0;
      let range = 0.5;
      let speed = 0.1;
      let centerScale = 1;

      let vx = 0;
      let vy = 0;
      let ax = 0.2;

      let easing = 0.2;
      let spring = 0.01;
      // 喷泉
      // Fountain(app);
      let radius = 250;
      let vr = 0.021;
      let cos = Math.cos(vr);
      let sin = Math.sin(vr);
      let centerX = APP_WIDTH / 2;
      let centerY = APP_HEIGHT / 2;
      const centerBall = new Ball(10, 0, 0);
      const numBalls = 50;
      const ballContainer = [];
      app.stage.addChild(centerBall);

      centerBall.x = centerX - 5;
      centerBall.y = centerY - 5;

      // redBall.x = Math.random() * APP_WIDTH;
      // redBall.y = Math.random() * APP_HEIGHT;

      // 添加球类
      for (let ballIndex = 0; ballIndex <= numBalls; ballIndex++) {
        const ballSprite = new Ball(
          20 * Math.random(),
          Math.random() * 0xffffff
        );
        ballSprite.x = Math.random() * APP_WIDTH;
        ballSprite.y = Math.random() * APP_HEIGHT;
        ballContainer.push(ballSprite);
        app.stage.addChild(ballSprite);
      }
      let mouseX = 543;

      app.ticker.add(function (delta) {
        // console.log(mouseX)
        const angle = (mouseX - APP_WIDTH / 2) * 0.001;
        const cos = Math.cos(angle);
        const sin = Math.sin(angle);
        for (let ids = 0; ids <= numBalls; ids++) {
          const circle = ballContainer[ids];
          const x1 = circle.x - APP_WIDTH / 2;
          const y1 = circle.y - APP_HEIGHT / 2;
          const x2 = cos * x1 - sin * y1;
          const y2 = cos * y1 + sin * x1;
          circle.x = APP_WIDTH / 2 + x2;
          circle.y = APP_HEIGHT / 2 + y2;
        }
        // 围绕一个点做旋转
        // const x1 = redBall.x - APP_WIDTH / 2;
        // const y1 = redBall.y - APP_HEIGHT / 2;
        // const x2 = cos * x1 - sin * y1;
        // const y2 = cos * y1 + sin * x1;
        // redBall.x = APP_WIDTH / 2 + x2;
        // redBall.y = APP_HEIGHT / 2 + y2;
        // 围绕旋转
        // redBall.x = APP_WIDTH / 2 + Math.cos(angle) * radius;
        // redBall.y = APP_HEIGHT / 2 + Math.sin(angle) * radius;
        // angle += vr;
        // 添加缓动效果
        // if (redBall) {
        // const vx = (targetX - redBall.x) * easing;
        // const vy = (targetY - redBall.y) * easing;
        // redBall.x += vx;
        // redBall.y += vy;
        // const dy = targetY - redBall.y;
        // const ay = dy * spring;
        // vy += ay;
        // redBall.y += vy;
        // }
        // arrow.y = 200 + Math.sin(angle) * 50;
        // angle += 0.1;
        // arrow.scale.x = arrow.scale.y = centerScale + Math.sin(angle) * range;
        // angle += speed;
        // vx+= ax;
        // ball.x += vx;
        // if(redBall && hitTestRectangle(redBall,arrow)){
        //   console.log('hit');
        // }
      });

      // app.stage.on("click", function (event) {
      //   // console.log(0);
      //   redBall = new Ball(5);
      //   targetX = redBall.x = event.data.global.x;
      //   redBall.y = event.data.global.y;
      //   app.stage.addChild(redBall);
      // });
      // 绑定鼠标事件
      // 物体随着鼠标转动
      app.stage.on("mousemove", function (event) {
        // mouseX = event.data.global.x;
        // if(redBall){
        // redBall.x = event.data.global.x;
        // redBall.y = event.data.global.y;
        // }
        // console.log(event.data.global.x,event.data.global.y)
        // console.log(event)
        // let dx = event.data.global.x - arrow.x;
        // let dy = event.data.global.y - arrow.y;
        // let radians = Math.atan2(dy, dx);
        // arrow.angle = (radians * 180) / Math.PI;
        // console.log(
        //   dist(event.data.global.x, arrow.x, event.data.global.y, arrow.y)
        // );
        // console.log(Math.atan2(dy, dx))
      });
    },
  },
};
</script>
