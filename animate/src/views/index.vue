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
      width: 300,
      height: 300,
      antialias: true,
      transparent: false,
      resolution: 1,
      backgroundColor: 0x1d9ce0,
    });

    this.$refs.container.appendChild(app.view);

    app.loader
      .add({ name: "cat100", url: require("@/assets/cat/cat.json") })
      .load(function (loader, resources) {
        console.log(resources);
      });

    // 绘制正方体
    let rectangle = new PIXI.Graphics();
    rectangle.lineStyle(4, 0xff3300, 1);
    rectangle.beginFill(0x66ccff);
    rectangle.drawRect(0, 0, 64, 64);
    rectangle.endFill();
    rectangle.x = 170;
    rectangle.y = 170;
    app.stage.addChild(rectangle);


    // 绘制文字
    let message = new PIXI.Text("Hello Pixi!");
    message.position.set(54, 96);
    app.stage.addChild(message);
    // console.info(cat)

    // // 创建一个图片精灵
    // const fire = new PIXI.Sprite.from(require("@/assets/fire-700.png"));

    // app.stage.addChild(fire);

    // let elapsed = 0;
    // app.ticker.add((delta) => {
    //   // console.log(delta)
    //   // elapsed += delta;
    //   // console.log(elapsed)
    //   if(delta > 1){
    //     if (elapsed >= 7) {
    //       elapsed = 0;
    //     }
    //     fire.x = -21 + -95 * elapsed;

    //     elapsed++;
    //   }
    // });

    // app.loader
    //   .add({ name: "fire700", url: require("@/assets/fire-700.png") })
    //   .load((loader, resources) => {
    //     const texture = resources.fire700.texture;
    //     let rectangle = new PIXI.Rectangle(96, 64, 32, 32);
    //     texture.frame = rectangle;

    //     const fire = new PIXI.Sprite(texture);

    //     // fire.rotation = 0.5;

    //     // app.stage.addChild(fire);

    //     // let elapsed = 0;
    //     // app.ticker.add((delta) => {
    //     //   if (elapsed >= 7) {
    //     //     elapsed = 0;
    //     //   }
    //     //   fire.x = -21 + -95 * elapsed;

    //     //   elapsed++;
    //     // });

    //     console.log("setup");
    //   });

    //
  },
};
</script>





<style>
.container {
  text-align: center;
}
</style>