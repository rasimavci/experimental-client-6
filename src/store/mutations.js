import * as types from './mutation-types'


const mutations = {
  [types.SET_USER] (state, user) {
    state.user = user
  },
  [types.CONNECT] (state, username, password) {
    state.user = user
  },
  [types.CALL_MAKE] (state) {
    state.user = user
  },
  [types.UPDATE_CONTACTS] (state, contacts) {
    state.contacts = contacts
  }

}

export default {
  mutations
}

