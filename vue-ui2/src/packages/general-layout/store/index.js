/* eslint-disable no-restricted-syntax */
import Vue from 'vue';
import Vuex from 'vuex';
import getters from './getters';
import app from './modules/app';
import settings from './modules/settings';
// import user from '@/store/modules/user';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    visitedTags: [],
  },
  mutations: {
    ADD_VISITED_TAGS: (state, tag) => {
      //  some()方法检测是否tags数组中是否包含该tag
      if (!state.visitedTags.some(t => t.name === tag.name)) {
        // 查找当前数组中是否存在多个路由共用的便签，
        // 覆盖其中路由，
        const index = state.visitedTags.findIndex(item => item.syntony);
        // 便签信息
        const tagInfo = {
          name: tag.name,
          path: tag.path,
          query: tag.query,
          title: tag.meta.title,
          syntony: tag.meta.syntony,
        };
        if (tag.meta.syntony && index !== -1) {
          state.visitedTags[index] = tagInfo;
          return;
        }
        state.visitedTags.push(tagInfo);
      } else {
        // console.log('tags', state.visitedTags);
        state.visitedTags.map(res => {
          if (res.name === tag.name) {
            // eslint-disable-next-line no-param-reassign
            res.path = tag.path;
          }
          return res;
        });
      }
    },
    DEL_VISITED_TAGS: (state, tag) => {
      for (const [i, t] of state.visitedTags.entries()) {
        if (t.name === tag.name) {
          state.visitedTags.splice(i, 1);
          break;
        }
      }
    },
  },
  actions: {
    // 添加标签
    addVisitedTags({ commit, state }, tag) {
      return new Promise(resolve => {
        commit('ADD_VISITED_TAGS', tag);
        resolve([...state.visitedTags]);
      });
    },
    // 删除标签
    delVisitedTags({ commit, state }, tag) {
      return new Promise(resolve => {
        commit('DEL_VISITED_TAGS', tag);
        resolve([...state.visitedTags]);
      });
    },
  },
  modules: {
    app,
    settings,
    // user,
  },
  getters,
});

export default store;
