import Cookies from 'js-cookie';
import toggleClass from '/src/utils/toggleClass.js';
import { getTheme, setTheme } from '/src/utils/theme.js';

const state = {
  sidebar: {
    opened: Cookies.get('sidebarStatus')
      ? !!+Cookies.get('sidebarStatus')
      : true,
    withoutAnimation: false,
  },
  device: 'desktop',
  theme: getTheme(),
};

const mutations = {
  TOGGLE_SIDEBAR: state => {
    state.sidebar.opened = !state.sidebar.opened;
    state.sidebar.withoutAnimation = false;
    // if (state.sidebar.opened) {
      // Cookies.set('JSESSIONID', '1B9D263F860A62BA10AF4386CD82504F');
    // } else {
      // Cookies.set('JSESSIONID', '1B9D263F860A62BA10AF4386CD82504F');
    // }
  },
  CLOSE_SIDEBAR: (state, withoutAnimation) => {
    // Cookies.set('JSESSIONID', '1B9D263F860A62BA10AF4386CD82504F');
    state.sidebar.opened = false;
    state.sidebar.withoutAnimation = withoutAnimation;
  },
  TOGGLE_DEVICE: (state, device) => {
    state.device = device;
  },
  TOGGLE_THEME: (_state, theme) => {
    setTheme(theme);
    toggleClass(document.body, theme);
    state.theme = theme;
  },
};

const actions = {
  toggleSideBar({ commit }) {
    commit('TOGGLE_SIDEBAR');
  },
  closeSideBar({ commit }, { withoutAnimation }) {
    commit('CLOSE_SIDEBAR', withoutAnimation);
  },
  toggleDevice({ commit }, device) {
    commit('TOGGLE_DEVICE', device);
  },
  toggleTheme({ commit }, theme) {
    commit('TOGGLE_THEME', theme);
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
