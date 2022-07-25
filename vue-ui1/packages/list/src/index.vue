<template>
  <ul class="hc-list">
    <li>aaa</li>
    <li>aaa</li>
    <li>aaa</li>
    <li>aaa</li>
    <slot></slot>
  </ul>
</template>

<script>
export default {
  name: "hc-list",
  props: {
    type: String,
  },
};
</script>

<style scoped>
.hc-list {
  padding: 3px 6px;
  background: rgb(172, 31, 31);
  color: rgb(255, 255, 255);
}
</style>
