<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>

export default {
  name:'app',
  mounted() {
    
  },
};
</script>

<style>
*{
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
  color: #2c3e50;
  box-sizing: border-box;
}
</style>
