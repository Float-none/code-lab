<template>
  <div class="ki" id="ki"></div>
</template>

<script>
import * as PIXI from "pixi.js";
import Arrow from "@/utils/arrow";
import Ball from "@/utils/ball";
import Fountain from "@/utils/fountain";
import hitTestRectangle from "@/utils/hitTestRectangle"

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
      arrow.x = 550;
      arrow.y = 210;
      // const ball = new Ball(50, 100, 12);

      app.stage.addChild(arrow);
      let redBall = null;
      let targetX = 0;
      let targetY = 500;
      app.stage.on("click", function (event) {
        // console.log(0);
        redBall = new Ball(5);
        targetX = redBall.x = event.data.global.x;
        redBall.y = event.data.global.y;
        app.stage.addChild(redBall);
      });
      // 绑定鼠标事件
      // 物体随着鼠标转动
      app.stage.on("mousemove", function (event) {
        if(redBall){
        redBall.x = event.data.global.x;
        redBall.y = event.data.global.y;

        }
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
      // 平滑上下移动
      app.ticker.add(function (delta) {
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
        if(redBall && hitTestRectangle(redBall,arrow)){
          console.log('hit');
        }
      });
    },
  },
};
</script>
