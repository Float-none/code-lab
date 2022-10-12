<template>
  <div id="ci"></div>
</template>

<script>
import * as PIXI from "pixi.js";
import Ball from "@/utils/ball";
const { Application, Rectangle, Graphics } = PIXI;

let app = null;

const APP_WIDTH = 1100;
const APP_HEIGHT = 700;

function gravitate(partA, partB) {
  var dx = partB.x - partA.x;
  var dy = partB.y - partA.y;
  var distSQ = dx * dx + dy * dy;
  var dist = Math.sqrt(distSQ);
  var force = (partA.mass * partB.mass) / distSQ;
  var ax = (force * dx) / dist;
  var ay = (force * dy) / dist;
  partA.vx += ax / partA.mass;
  partA.vy += ay / partA.mass;
  partB.vx -= ax / partB.mass;
  partB.vy -= ay / partB.mass;
}

export default {
  mounted() {
    app = new Application({
      width: APP_WIDTH,
      height: APP_HEIGHT,
      antialias: true,
      backgroundAlpha: true,
      resolution: 1,
      backgroundColor: 0xcccccc,
    });
    document.getElementById("ci").appendChild(app.view);

    // 粒子
    const particles = [];
    const numParticles = 30;
    for (let i = 0; i < numParticles; i++) {
      const size = Math.random() * 25 + 5;
      const newBall = new Ball(size);
      newBall.x = Math.random() * APP_WIDTH;
      newBall.y = Math.random() * APP_HEIGHT;
      newBall.mass = size;
      newBall.vx = 0;
      newBall.vy = 0;

      app.stage.addChild(newBall);
      particles.push(newBall);
    }
    // const ball1 = new Ball(20);
    // const ball2 = new Ball(40);
    // ball1.x = 100;
    // ball1.y = 100;
    // ball1.radius = 20;
    // ball1.mass = 1;
    // ball1.vx = 1;
    // ball2.x = 400;
    // ball2.y = 100;
    // ball2.mass = 2;
    // ball2.vx = -1;
    // ball2.radius = 40;
    // app.stage.addChild(ball1, ball2);

    app.ticker.add(function (delta) {
      // 引力计算
      for (let i = 0; i < numParticles; i++) {
        const particle = particles[i];
        particle.x += particle.vx;
        particle.y += particle.vy;
      }
      for (let i = 0; i < numParticles - 1; i++) {
        const partA = particles[i];
        for (let j = i + 1; j < numParticles; j++) {
          const partB = particles[j];
          gravitate(partA, partB);
        }
      }

      // ball1.x += ball1.vx;
      // ball2.x += ball2.vx;
      // const dist = ball1.x - ball2.x;
      // if (Math.abs(dist) < ball1.radius + ball2.radius) {
      //   // 执行反作用力
      //   const vx0Final =
      //     ((ball1.mass - ball2.mass) * ball1.vx + 2 * ball2.mass * ball2.vx) /
      //     (ball1.mass + ball2.mass);
      //   const vx1Final =
      //     ((ball2.mass - ball1.mass) * ball2.vx + 2 * ball1.mass * ball1.vx) /
      //     (ball1.mass + ball2.mass);
      //   ball1.vx = vx0Final;
      //   ball2.vx = vx1Final;
      //   ball1.x += ball1.vx;
      //   ball2.x += ball2.vx;
      // }
    });
  },
  data() {
    return {};
  },
};
</script>