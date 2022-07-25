<template>
  <div class="navbar flex">
    <div style="display: flex; align-items: center">
      <Logo />
    </div>
    <div class="navbar--right">
      <span>
        <svg-icon icon-class="theme" class="icon-theme"></svg-icon>
      </span>
      <span>
        <svg-icon icon-class="notice" class="icon-notice"></svg-icon>
      </span>
      <span>
        <svg-icon :icon-class="`user-${theme}`" class="icon-user"></svg-icon>
      </span>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import Logo from './Logo';
// import '@/assets/theme/dark/index.css'; // the theme changed version element-ui css
// import '@/assets/theme/light/index.css';
// import '@/assets/theme/blue/index.css';

// import SidebarItem from './SidebarItem.vue';

export default {
  name: 'Navbar',
  components: {
    Logo
    // SidebarItem,
  },
  data() {
    return {
      hidden: true,
      activeIndex: '1',
      activeIndex2: '1',
    };
  },

  computed: {
    ...mapGetters(['avatar', 'theme', 'sidebar']),
    routes() {
      return this.$router.options.routes;
    },
    activeMenu() {
      const route = this.$route;
      const { meta, path } = route;
      // if set path, the sidebar will highlight the path you set
      // console.log(meta, path);
      if (meta.activeMenu) {
        return meta.activeMenu;
      }
      return path;
    },
  },
  methods: {
    openCockpit() {
      const routeUrl = this.$router.resolve({
        path: '/c_cockpit',
      });
      window.open(routeUrl.href, '_blank');
    },
    async logout() {
      await this.$store.dispatch('user/logout');
      this.$router.push(`/login?redirect=${this.$route.fullPath}`);
    },
    toggleTheme(theme) {
      this.$store.dispatch('app/toggleTheme', theme);
    },
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
  },
};
</script>

<style lang="scss" scoped>
@import '/src/styles/variables.scss';
@import '/src/styles/mixin.scss';

.navbar {
  height: 50px;
  overflow: hidden;
  position: relative;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);

  &.flex {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  &--right {
    .svg-icon {
      width: 20px;
      height: 20px;
      margin-right: 30px;
    }
    .svg-icon.icon-user {
      width: 28px;
      height: 28px;
      margin-right: 20px;
    }

    @include flex;
  }
}

.light .navbar {
  background-color: $--color-dark-1;
  .svg-icon.icon-theme,
  .svg-icon.icon-notice {
    color: $--color-white;
  }
}

.dark .navbar {
  background-color: $--color-dark-1;
  .svg-icon.icon-theme,
  .svg-icon.icon-notice {
    color: $--color-dark-6;
  }
}
.blue .navbar {
  background-color: $--color-blue-1;
  .svg-icon.icon-theme,
  .svg-icon.icon-notice {
    color: $--color-blue-icon-off;
  }
}
</style>
