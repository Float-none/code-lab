<template>
  <div :class="classObj" class="app-wrapper">
    <div
      v-if="device === 'mobile' && sidebar.opened"
      class="drawer-bg"
      @click="handleClickOutside"
    ></div>
    <div :class="{ 'fixed-header': fixedHeader }">
      <Navbar />
    </div>
    <sidebar class="sidebar-container" />
    <div class="main-container">
      <tabbar></tabbar>
      <sameto-nav></sameto-nav>
      <app-main />
    </div>
  </div>
</template>

<script>
import Vue from 'vue';
import Store from './store'
import Navbar from './components/Navbar';
import SvgIcon from './components/SvgIcon'
import Sidebar from './components/Sidebar';
import Tabbar from './components/Tabbar';
import SametoNav from './components/SameToNav';
import AppMain from './components/AppMain.vue';

Vue.prototype.$store = Store;
Vue.component("SvgIcon",SvgIcon);
// 导入所有icon
const req = require.context('/src/icons/svg/', false, /\.svg$/);
const requireAll = requireContext => requireContext.keys().map(requireContext);
requireAll(req);


export default {
  name: "hc-layout",
  components:{
    Navbar,
    Sidebar,
    AppMain,
    Tabbar,
    SametoNav
  },
  created(){
    // 设置默认主题
    this.$store.dispatch('app/toggleTheme','blue')
  },
  computed: {
    sidebar() {
      return this.$store.state.app.sidebar;
    },
    device() {
      return this.$store.state.app.device;
    },
    fixedHeader() {
      return this.$store.state.settings.fixedHeader;
    },
    classObj() {
      return {
        hideSidebar: !this.sidebar.opened,
        openSidebar: this.sidebar.opened,
        withoutAnimation: this.sidebar.withoutAnimation,
        mobile: this.device === 'mobile',
      };
    },
  },
  methods: {
    handleClickOutside() {
      this.$store.dispatch('app/closeSideBar', { withoutAnimation: false });
    },
  },
};
</script>

<style lang="scss">
@import "/src/styles/mixin.scss";

.app-wrapper {
  @include clearfix;
  position: relative;
  height: 100%;
  width: 100%;

  &.mobile.openSidebar {
    position: fixed;
    top: 0;
  }
}
.drawer-bg {
  background: #000;
  opacity: 0.3;
  width: 100%;
  top: 0;
  height: 100%;
  position: absolute;
  z-index: 999;
}

.fixed-header {
  position: fixed;
  top: 0;
  right: 0;
  z-index: 9;
  // width: calc(100% - #{$sidebarWidth});
  width: 100%;
  transition: width 0.28s;
}

// .hideSidebar .fixed-header {
  // width: calc(100% - 54px);
// }

.mobile .fixed-header {
  width: 100%;
}
</style>