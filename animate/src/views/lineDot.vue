<template>
  <div class="line-frame">
    <div class="line" v-for="(item, index) in lineAry" :key="index">
      <span
        v-for="j in 500"
        :key="j"
        :class="{ real: j % 2 === 1, empty: j % 2 === 0 }"
        :style="`width:${item[j % item.length]}px`"
      ></span>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 2d 类
      // lineAry: [
      //   [0, 3, 15],
      //   [0, 6, 12],
      //   [0, 9, 9],
      //   [0, 12, 6],
      //   [0, 15, 3],
      //   [0, 18, 0],
      //   [1, 0, 2, 15, 0],
      //   [0, 0, 6, 12, 0],
      //   [0, 0, 9, 9, 0],
      //   [0, 0, 12, 6, 0],
      //   [0, 0, 15, 3, 0],
      //   [0, 0, 18, 0, 0],
      // ],
      lineAry: [
        [0, 3, 15],
        [0, 6, 12],
        [0, 9, 9],
        [0, 12, 6],
        [0, 15, 3],
        [0, 18, 0],
        [0, -3, 18],
      ],
    };
  },
};
</script>

<style scoped>
.line-frame {
  padding: 100px 100px 0;
}
.line {
  background-color: #e2e2e2;
  overflow: hidden;
  white-space: nowrap;
  font-size: 0;
  margin-top: 20px;
}
.empty,
.real {
  height: 10px;
  display: inline-block;
  vertical-align: middle;
}
.real {
  background-color: #00b3ff;
}
.empty {
  background-color: #fff;
}
</style>