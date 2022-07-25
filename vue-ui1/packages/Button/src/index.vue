<template>
  <div class="hc-button">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "hc-button",
  props: {
    type: String,
  },
};
</script>

<style scoped>
.hc-button {
  display: inline-block;
  padding: 3px 6px;
  background: rgb(172, 31, 31);
  color: rgb(255, 255, 255);
}
</style>
