<template>
  <div id="ci"></div>
</template>

<script>
import * as PIXI from "pixi.js";
import Ball from "@/utils/ball";
const { Application, Rectangle, Graphics } = PIXI;

let app = null;
const line = new Graphics();

const APP_WIDTH = 1100;
const APP_HEIGHT = 700;
const minDist = 100;
const springAmount = 0.0025;

function spring(partA, partB) {
  let dx = partB.x - partA.x;
  let dy = partB.y - partA.y;
  let dist = Math.sqrt(dx * dx + dy * dy);
  if (dist < minDist) {
    line.lineStyle(1, 0xffffff, 1 - dist / minDist);
    line.moveTo(partA.x, partA.y);
    line.lineTo(partB.x, partB.y);
    let ax = dx * springAmount;
    let ay = dy * springAmount;
    partA.vx += ax / partA.mass;
    partA.vy += ay / partA.mass;
    partB.vx -= ax / partB.mass;
    partB.vy -= ay / partB.mass;
  }
}

export default {
  mounted() {
    app = new Application({
      width: APP_WIDTH,
      height: APP_HEIGHT,
      antialias: true,
      backgroundAlpha: true,
      resolution: 1,
      backgroundColor: 0x000000,
    });
    document.getElementById("ci").appendChild(app.view);

    // 粒子
    const particles = [];
    const numParticles = 30;

    for (let i = 0; i < numParticles; i++) {
      const size = Math.random() * 10 + 2;
      const newBall = new Ball(size, "0xffffff");
      newBall.x = Math.random() * APP_WIDTH;
      newBall.y = Math.random() * APP_HEIGHT;
      newBall.mass = size;
      newBall.vx = Math.random() * 6 - 3;
      newBall.vy = Math.random() * 6 - 3;

      app.stage.addChild(newBall);
      particles.push(newBall);
    }

    app.stage.addChild(line);

    app.ticker.add(function (delta) {
      line.clear();
      for (let i = 0; i < numParticles; i++) {
        let particle = particles[i];
        particle.x += particle.vx;
        particle.y += particle.vy;
        if (particle.x > APP_WIDTH) {
          particle.x = 0;
        } else if (particle.x < 0) {
          particle.x = APP_WIDTH;
        }
        if (particle.y > APP_HEIGHT) {
          particle.y = 0;
        } else if (particle.y < 0) {
          particle.y = APP_HEIGHT;
        }
      }
      for (let i = 0; i < numParticles - 1; i++) {
        let partA = particles[i];
        for (let j = i + 1; j < numParticles; j++) {
          let partB = particles[j];
          spring(partA, partB);
        }
      }
    });
  },
  data() {
    return {};
  },
};
</script>