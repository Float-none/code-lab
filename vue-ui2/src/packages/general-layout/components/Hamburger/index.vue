<template>
  <div :class="['hamburger-container', theme]" @click="toggleClick">
    <svg-icon
      icon-class="hamburger"
      :class="['hamburger', { 'is-active': isActive }]"
    ></svg-icon>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'Hamburger',
  props: {
    isActive: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    ...mapGetters(['theme']),
  },
  methods: {
    toggleClick() {
      this.$emit('toggleClick');
    },
  },
};
</script>

<style lang="scss" scoped>
@import '/src/styles/variables.scss';

.hamburger-container {
  height: $hamburgerHeight;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  .svg-icon.hamburger {
    display: inline-block;
    vertical-align: middle;
    width: 16px;
    height: 16px;
    margin: 0 !important;
  }

  .hamburger.is-active {
    transform: rotate(180deg);
  }

  &.light {
    background-color: $--color-white;
    border-top: solid 2px $--color-light-10;
  }
  &.dark {
    background-color: $--color-dark-1;
    border-top: solid 2px $--color-dark-6-a4;
  }
}

// .hamburger-container {
//   line-height: 46px;
//   height: 100%;
//   float: left;
//   cursor: pointer;
//   transition: background 0.3s;
//   -webkit-tap-highlight-color: transparent;

//   &:hover {
//     background: rgba(0, 0, 0, 0.025);
//   }
// }
</style>
