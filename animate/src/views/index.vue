<template>
  <div>
    <!-- <img
      src="../assets/cat-silhouette-game-character-sprite_12402-84.jpg"
    />
    <img
      src="../assets/logo.png"
    /> -->
    <div class="container" ref="container"></div>
  </div>
</template>
<script>
import * as PIXI from "pixi.js";

export default {
  data() {
    return {};
  },
  mounted() {
    const app = new PIXI.Application({
      width: 94,
      height: 263,
      antialias: true,
      transparent: false,
      resolution: 1,
      backgroundColor: 0x1d9ce0,
    });

    this.$refs.container.appendChild(app.view);

    // 创建一个图片精灵
    const fire = new PIXI.Sprite.from(require("@/assets/fire-700.png"));

    app.stage.addChild(fire);

    let elapsed = 0;
    app.ticker.add((delta) => {
      // console.log(delta)
      // elapsed += delta;
      // console.log(elapsed)
      if (elapsed >= 7) {
        elapsed = 0;
      }
      fire.x = -20 + -95 * elapsed;

      elapsed++;
    });

    new PIXI.loader
      .add(require("@/assets/fire-700.png"))
      .on("progress", loadProgressHandler)
      .load(setup);

    function loadProgressHandler(loader, resource) {
      console.log("loading: " + resource.url);
      console.log("progress: " + loader.progress + "%");
    }

    function setup() {
      console.log("All files loaded");
    }
  },
};
</script>





<style>
.container {
  text-align: center;
}
</style>