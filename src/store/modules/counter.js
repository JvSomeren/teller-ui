import $socket from '../../socket-instance'

const TYPE_PREFIX = 'COUNTER';

const types = {
  COUNTER_ROOM_JOIN: `${TYPE_PREFIX}_ROOM_JOIN`,
  COUNTER_ROOM_LEAVE: `${TYPE_PREFIX}_ROOM_LEAVE`,

  COUNTER_COUNT_INCREASE : `${TYPE_PREFIX}_COUNT_INCREASE`,
  COUNTER_COUNT_DECREASE: `${TYPE_PREFIX}_COUNT_DECREASE`,
  COUNTER_COUNT_SET: `${TYPE_PREFIX}_COUNT_SET`,
  COUNTER_COUNT_RESET: `${TYPE_PREFIX}_COUNT_RESET`,

  COUNTER_MESSAGE_SET: `${TYPE_PREFIX}_MESSAGE_SET`,
  COUNTER_MESSAGE_CLEAR: `${TYPE_PREFIX}_MESSAGE_CLEAR`,

  SOCKET_ROOM_COUNT: `SOCKET_ROOMCOUNT`,
  SOCKET_ROOM_MESSAGE: `SOCKET_ROOMMESSAGE`,
  SOCKET_ROOM_HISTORY: `SOCKET_ROOMHISTORY`,
  SOCKET_ROOM_DATA: `SOCKET_ROOMDATA`,
}

const state = {
  count: null,
  message: "",
  history: [],
  roomKey: 'ssr',
}

const getters = {
  roomData: state => ({ count: state.count, message: state.message, history: state.history }),
}

const actions = {
  joinRoom({ commit }, roomKey) {
    commit(types.COUNTER_ROOM_JOIN, roomKey);

    $socket.emit('room join', roomKey);
  },

  leaveRoom({ commit }) {
    commit(types.COUNTER_ROOM_LEAVE);

    $socket.emit('room leave');
  },

  getRoomData({ commit }) {
    $socket.emit('room get');
  },

  countIncrease({ commit, state }) {
    if(!(state.count < 9999))
      return;

    commit(types.COUNTER_COUNT_INCREASE);

    $socket.emit('count increase');
  },

  countDecrease({ commit }) {
    if(!(state.count > 0))
      return;

    commit(types.COUNTER_COUNT_DECREASE);

    $socket.emit('count decrease');
  },

  countSet({ commit }, val) {
    if(!(val >= 0 && val <= 9999))
      return;

    commit(types.COUNTER_COUNT_SET, val);

    $socket.emit('count set', val);
  },

  countReset({ commit }) {
    commit(types.COUNTER_COUNT_RESET);

    $socket.emit('count reset');
  },

  messageSet({ commit }, message) {
    return new Promise((resolve, reject) => {
      commit(types.COUNTER_MESSAGE_SET, message);
  
      $socket.emit('message set', message);

      resolve();
    });
  },

  messageClear({ commit }) {
    return new Promise((resolve, reject) => {
      commit(types.COUNTER_MESSAGE_CLEAR);
  
      $socket.emit('message clear');

      resolve();
    });
  },

  socket_connect() {
    // $socket.emit('room get')
  }
}

const mutations = {
  [types.COUNTER_ROOM_JOIN] (state, roomKey) {
    state.roomKey = roomKey;
  },

  [types.COUNTER_ROOM_LEAVE] (state) {
    state.roomKey = null;
  },


  [types.COUNTER_COUNT_INCREASE] (state) {
    state.count++;
  },
  
  [types.COUNTER_COUNT_DECREASE] (state) {
    state.count--;
  },

  [types.COUNTER_COUNT_SET] (state, count) {
    state.count = count;
  },

  [types.COUNTER_COUNT_RESET] (state) {
    state.count = 0;
  },

  [types.COUNTER_MESSAGE_SET] (state, message) {
    state.message = message;
  },

  [types.COUNTER_MESSAGE_CLEAR] (state) {
    state.message = "";
  },


  [types.SOCKET_ROOM_COUNT] (state, count) {
    state.count = count;
  },

  [types.SOCKET_ROOM_MESSAGE] (state, message) {
    state.message = message;
  },

  [types.SOCKET_ROOM_HISTORY] (state, history) {
    state.history = history;
  },

  [types.SOCKET_ROOM_DATA] (state, data) {
    state.count     = data.count;
    state.message   = data.message;
    state.history   = data.history;
  },
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
