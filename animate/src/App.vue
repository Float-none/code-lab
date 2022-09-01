<template>
  <div id="app">
    <canvas id="canvas" class="canvas-box" width="700" height="400"></canvas>
  </div>
</template>

<script>
import DrawCanvas from "./sprite/drawCanvas";

export default {
  mounted() {
    const canvas = new DrawCanvas("canvas");
    // canvas.drawBall({
    //   x: 100,
    //   y: 100,
    //   color: 'red',
    //   radius: 50
    // });
    // canvas.drawRect();
    canvas.drawArrow({
      x: 80,
      y: 80,
      color:'red'
    });
  },
};
</script>

<style>
body,
canvas {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}
.canvas-box {
  border: 1px solid #ccc;
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  box-sizing: border-box;
}
</style>
