import defaultSettings from '/src/settings';

const { showSettings, fixedHeader, sidebarLogo } = defaultSettings;

const state = {
  showSettings,
  fixedHeader,
  sidebarLogo,
};

const mutations = {
  CHANGE_SETTING: (state, { key, value }) => {
    const hasBarProperty = Object.prototype.hasOwnProperty.call(state, key);
    if (hasBarProperty) {
      state[key] = value;
    }
  },
};

const actions = {
  changeSetting({ commit }, data) {
    commit('CHANGE_SETTING', data);
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
