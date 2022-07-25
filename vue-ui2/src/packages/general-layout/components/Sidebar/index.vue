<template>
  <div :class="[theme, { 'has-logo': showLogo }]" style="backgroundcolor: red">
    <!-- <logo v-if="showLogo" :collapse="isCollapse" /> -->
    <!-- :background-color="variables.menuBg" menuBgDark -->
    <!-- :text-color="variables.menuText" -->
    <!-- :active-text-color="variables.menuActiveText" -->

    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
        :default-active="activeMenu"
        :collapse="isCollapse"
        :unique-opened="true"
        :collapse-transition="false"
        mode="vertical"
      >
        <sidebar-item
          v-for="(route, key) in routes"
          :key="key"
          :item="route"
          :base-path="route.path"
        />
      </el-menu>
    </el-scrollbar>
    <Hamburger :is-active="sidebar.opened" @toggleClick="toggleSideBar" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import Hamburger from '../Hamburger';
import SidebarItem from './SidebarItem.vue';

export default {
  components: { SidebarItem, Hamburger },
  computed: {
    ...mapGetters(['sidebar', 'theme']),
    routes() {
      return this.$router.options.routes;
    },
    activeMenu() {
      const route = this.$route;
      const { meta, path } = route;
      // if set path, the sidebar will highlight the path you set
      if (meta.activeMenu) {
        return meta.activeMenu;
      }
      return path;
    },
    showLogo() {
      return this.$store.state.settings.sidebarLogo;
    },
    // variables() {
    //   return variables;
    // },
    isCollapse() {
      return !this.sidebar.opened;
    },
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('app/toggleSideBar');
    },
  },
};
</script>
<style lang="scss">
@import '/src/styles/variables.scss';
@import '/src/styles/sidebar.scss';

.el-menu-item is-active submenu-title-noDropdown {
  padding-left: 10px !important;
}
#app .sidebar-container .el-menu .nest-menu .el-menu-item,
#app .sidebar-container .el-menu .nest-menu .el-submenu > .el-submenu__title {
  padding-left: 50px !important;
}
blue .el-submenu {
  list-style: none;
  margin: 0;
  padding-left: 5px;
}
.blue .el-submenu .el-menu-item {
  min-width: 173px;
}
.blue .el-menu {
  padding-left: 5px;
}
</style>