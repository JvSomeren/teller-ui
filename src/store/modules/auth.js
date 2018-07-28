import { WebAuth } from 'auth0-js'
import { AUTH0_CONFIG } from '../../config'
import $socket from '../../socket-instance'

const TYPE_PREFIX = 'AUTH';

const types = {
  AUTH_LOGIN: `${TYPE_PREFIX}_LOGIN`,

  AUTH_LOGOUT: `${TYPE_PREFIX}_LOGOUT`,
}

const state = {
  accessToken: null,
  idToken: null,
  expiresAt: null,
}

const getters = {
  isAuthenticated: state => (new Date().getTime() < state.expiresAt),
}

const actions = {
  init({ dispatch }) {
    dispatch('recoverSession');
  },

  login({ commit }) {
    webAuth.authorize();
  },

  logout({ commit, dispatch }) {
    return new Promise((resolve, reject) => {
      dispatch('deleteSession');
      $socket.emit('logout');

      resolve();
    });
  },
  
  handleAuthentication({ commit, dispatch }) {
    return new Promise((resolve, reject) => {
      webAuth.parseHash((err, authResult) => {
        if(authResult && authResult.accessToken && authResult.idToken) {
          dispatch('saveSession', authResult);
          dispatch('recoverSession');
          $socket.emit('login', authResult.idToken);


          resolve();
        } else if(err) {
          // logout
          reject(err);
        }
      });
    });
  },

  saveSession({ commit }, auth) {
    localStorage.setItem('access_token', auth.accessToken);
    localStorage.setItem('id_token', auth.idToken);
    localStorage.setItem('expires_at', JSON.stringify(auth.expiresIn * 1000 + new Date().getTime()));
  },

  deleteSession({ commit }) {
    localStorage.removeItem('access_token');
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');

    commit(types.AUTH_LOGOUT);
  },

  recoverSession({ commit }) {
    const auth = {
      accessToken: localStorage.getItem('access_token'),
      idToken: localStorage.getItem('id_token'),
      expiresAt: localStorage.getItem('expires_at')
    }

    commit(types.AUTH_LOGIN, auth);
  },
}

const mutations = {
  [types.AUTH_LOGIN] (state, auth) {
    state.accessToken = auth.accessToken;
    state.idToken = auth.idToken;
    state.expiresAt = auth.expiresAt;
  },

  [types.AUTH_LOGOUT] (state) {
    state.accessToken = null;
    state.idToken = null;
    state.expiresAt = null;
  },
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}

/**
 * Private helpers
 */

let webAuth = new WebAuth({
  domain: AUTH0_CONFIG.domain,
  clientID: AUTH0_CONFIG.clientId,
  redirectUri: `${AUTH0_CONFIG.callbackUrl}/callback`,
  // we will use the api/v2/ to access the user information as payload
  audience: 'https://' + AUTH0_CONFIG.domain + '/api/v2/', 
  responseType: 'token id_token',
  scope: 'openid' // define the scopes you want to use
});
