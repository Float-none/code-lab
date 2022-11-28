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

// import keyWords from "../data/keywords";

import "../data/main.js";

export default {
  data() {
    return {};
  },
  mounted() {
    
    // 数据
    // const singleFont = {};
    // keyWords.forEach((name) => {
    //   if (name.length > 0) {
    //     name.split("").forEach((element) => {
    //       if (!singleFont[element]) {
    //         singleFont[element] = true;
    //       }
    //     });
    //     return;
    //   }
    //   if (!singleFont[name]) {
    //     singleFont[name] = true;
    //   }
    // });
    // const hasR = '石，油，铁，水，电，车，煤，镁，铝，氧，木，金，土，氮，料，废，烯，气，汽，碳，肥，乙，法，机，乳，米，类，甲，汞，奶，磷，岩，钢，肉，茶，果，瓜，麦，梁，粉，面，铜，地，填，生，纸，板，豆，光，树，想，色，汁，空，蛋，丙，酸，棉，厨，苯，剂，涤，船，马，林，柑，橘，衫，锡，辣，氢，镧，梨，钾，毛，牛，皮，酒，糖，羽，镨，铅，鞋，铜';
    // hasR.split('，').forEach(name=>{
    //   if(singleFont[name]){
    //     delete singleFont[name];
    //   }
    // })

    // const dig = '1，2，3，4，5，6，7，8，9，0，A，a，B，b，C，c，D，d，E，e，F，f，G，g，H，h，I，i，J，j，K，k，L，l，M，m，N，n，O，o，P，p，Q，q，R，r，S，s，T，t，U，u，V，v，W，w，X，x，Y，y，Z，z';

    // dig.split('，').forEach(name=>{
    //   singleFont[name] = true;
    // })

    // console.log(Object.keys(singleFont));
    
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