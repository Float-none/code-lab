<template>
  <div class="logo-container">
    <router-link to="/">
      <div class="app-logo">
        <img
          :src="require(`../../images/navbar/app-logo-${currentTheme}.png`)"
          alt="hcttop-logo"
        />
        <div class="logo-title-box">
          <div class="title-box-style">
            <p class="title-CN-name">{{getProjectTitle}}</p>
            <!-- <p
              class="title-EN-name"
              style="transform: scale(0.8) translate(-10%, 0)"
            >
              Wisdom zero carbon
            </p> -->
          </div>
        </div>
      </div>
    </router-link>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import defaultSettings from '/src/settings';

export default {
  name: 'Logo',
  computed: {
    ...mapGetters(['theme']),
    currentTheme() {
      return this.theme.split('-')[0];
    },
    getProjectTitle() {
      return defaultSettings.title;
    },
  },
};
</script>

<style lang="scss" scoped>
@import '/src/styles/variables.scss';

.app-logo {
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;

  &__title {
    width: auto;
    height: 26px;
    line-height: 24px;
    font-size: 16px;
    font-weight: 600;
    border-radius: 4px;
    padding: 0 10px;

    &--dark-theme {
      background: linear-gradient(
        270deg,
        rgba(98, 70, 223, 0.8) 0%,
        rgba(27, 32, 41, 0.8) 49%,
        rgba(47, 139, 191, 1) 100%
      );
      color: #fff;
      border: 1px solid rgba(57, 135, 255, 1);
      transform: skewX(-10deg);
      & > span {
        display: block;
        transform: skewX(10deg);
      }
    }
    &--blue-theme {
      color: #fff;
      border: 1px solid #f3f5f7;
      font-weight: 400;
    }

    &--light-theme {
      color: $--color-white;
      background: #3987ff;
      border: 1px solid $--color-white;
      border-radius: 4px;
    }
  }
}
.logo-title-box {
  height: 50px;
  padding-top: 14px;
  padding-bottom: 13px;
  display: flex;
  box-sizing: border-box;
}
.title-box-style {
  border-left: 1px solid white;
  height: 100%;
  padding-left: 18px;
}
.title-CN-name {
  margin: 0px;
  font-size: 14px;
  color: #ffffff;
  text-align: left;
  line-height: 23px;
}
.title-EN-name {
  margin: 0px;
  font-size: 7px;
  color: #ffffff;
}
</style>
