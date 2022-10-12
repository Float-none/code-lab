<template>
  <div>
    <div class="ki" id="ki"></div>
    <!-- <el-slider
      v-model="value2"
      :min="-90"
      :max="90"
      @change="change"
    ></el-slider> -->
  </div>
</template>

<script>
import * as PIXI from "pixi.js";
import Segment from "@/utils/segment";
const { Application, Rectangle, Graphics } = PIXI;

let app = null;
let segment = null;

const APP_WIDTH = 1100;
const APP_HEIGHT = 700;

export default {
  methods: {
    change(value) {
      segment.rotation = value;
    },
  },
  data() {
    return {
      value2: 0,
    };
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
    segment = new Segment(100, 20);

    let cycle = 0;
    let offset =  1.3;
    segment.x = 200;
    segment.y = 200;
    app.stage.addChild(segment);
    const segment1 = new Segment(100, 20);
    // console.log(segment.getPin());
    app.stage.addChild(segment1);
    segment1.x = segment.getPin().x;
    segment1.y = segment.getPin().y;
    app.ticker.add(function (delta) {
      cycle += 0.05;
      let angle0 = Math.sin(cycle) * 45 + 90;
      let angle1 = Math.sin(cycle + offset) * 45 + 45;
      segment.angle = angle0;
      segment1.angle = segment.angle + angle1;
      segment1.x = segment.getPin().x;
      segment1.y = segment.getPin().y;
    });
  },
};
</script>