// import { login, logout, getInfo } from '@/api';
import { getToken, setToken, removeToken } from '@/utils/auth';
import { resetRouter } from '@/router';

const getDefaultState = () => ({
  token: getToken(),
  name: '',
  avatar: '',
});

const state = getDefaultState();

const mutations = {
  RESET_STATE: state => {
    Object.assign(state, getDefaultState());
  },
  SET_TOKEN: (state, token) => {
    state.token = token;
  },
  SET_NAME: (state, name) => {
    state.name = name;
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar;
  },
};

const actions = {
  // user login
  login({ commit }, userInfo) {
    const { mobile, password, securityCode } = userInfo;
    return new Promise((resolve, reject) => {
      login({ username: mobile.trim(), password })
        .then(response => {
          if (response.code == 200) {
            resolve(response);
          } else {
            reject(response);
          }
          // console.log(response);
          const { data } = response;
          console.log(data);
          commit('SET_TOKEN', data.token);
          setToken(data.token);
        })
        .catch(error => {
          reject(error);
        });
    });
  },

  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getInfo(state.token)
        .then(response => {
          const { data } = response;
          console.log('info--->', response);
          if (!data) {
            return reject(
              new Error('Verification failed, please Login again.')
            );
          }

          const { name, avatar } = data;

          commit('SET_NAME', name);
          commit('SET_AVATAR', avatar);
          return resolve(data);
        })
        .catch(error => {
          reject(error);
        });
    });
  },

  // user logout
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      logout(state.token)
        .then(() => {
          removeToken(); // must remove  token  first
          resetRouter();
          commit('RESET_STATE');
          resolve();
        })
        .catch(error => {
          reject(error);
        });
    });
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      removeToken(); // must remove  token  first
      commit('RESET_STATE');
      resolve();
    });
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
