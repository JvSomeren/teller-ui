import io from 'socket.io-client'
import store from '../store'

import { SOCKETIO_CONFIG }  from '../config'

export default io(SOCKETIO_CONFIG.domain,
  {
    path: SOCKETIO_CONFIG.path,
    query: { token: store.state.auth.idToken, roomKey: store.state.counter.roomKey }
  });