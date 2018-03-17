import Vue from 'vue'
import Vuex from 'vuex'
import state from './state'
import * as actions from './actions'
import * as getters from './getters'
import * as types from './mutation-types'
import _ from 'lodash'
Vue.use(Vuex)

const store = new Vuex.Store({
  strict: true,
  state,
  actions,
  getters,
  mutations: {
    [types.SET_USER_CREDENTIAKS] (state, credentials) {
      state.credentials = credentials
    },
    [types.KANDY_CONNECT] (state, credentials) {
      state.credentials = credentials
    },
    [types.TOGGLE_NEW_CALL_MODAL] (state) {
      state.newCallModal = !state.newCallModal
    },
    [types.TOGGLE_INCOMING_CALL_MODAL] (state) {
      state.incomingCallModal = !state.incomingCallModal
    },
    [types.SET_CONTACTS] (state, contacts) {
      state.contacts = contacts
    },
    [types.SET_ACTIVE_CALL] (state, activeCall) {
      state.activeCall = activeCall
    },
    [types.RINGING_SOUND] (state, options) {
      if (options.play) {
        state.sounds.ringing.loop = true
        state.sounds.ringing.play()
      } else {
        state.sounds.ringing.pause()
        state.sounds.ringing.load()
      }
    },
    [types.UPDATE_CALLS] (state, calls) {
      state.firstState = calls[0].state
      state.calls = calls
    },
    [types.SET_INCOMING_CALL] (state, incomingCall) {
      state.incomingCall = incomingCall
    },
    [types.SET_CONTACT_PRESENCE] (state, presence) {
      let contactIndex = -1
      contactIndex = _.findIndex(state.contacts, c => {
        return c.primaryContact === presence.userId
      })
      state.contacts[contactIndex].presence = presence
    },
    [types.SET_CALL_HISTORY] (state, callHistory) {
      state.callHistory = callHistory
    },
    [types.SET_CALL_OPTIONS] (state, options) {
      try {
        for (let i = 0; i < options.length; i++) {
          state.callOptions[options[i].key] = options[i].value
        }
      } catch (err) {
        console.log(err)
      }
    },
    [types.SET_CONVERSATIONS] (state, conversations) {
      state.conversations = conversations
    },
    [types.ADD_CONVERSATION] (state, conversation) {
      state.conversations.push(conversation)
    },
    [types.CHANGE_DIAL_VALUE] (state, dialValue) {
      state.dialValue = dialValue
    },
    [types.SET_SELFINFO] (state, selfinfo) {
      state.selfinfo = selfinfo
    },
    [types.ADD_TASK] (state, newTask) {
      // console.log('New task added ' + text)
      // const newTask = {
      //   text: text,
      //   favorite: false,
      //   startTime: 1520692473
      // }
      state.tasks.push(newTask)
      state.activeTask = newTask
    },
    [types.ADD_NOTE] (state, text) {
      console.log('New note added ' + text)
      const newNote = {
        text: text,
        favorite: false,
        startTime: 1520692473
      }
      state.notes.push(newNote)
      state.activeNote = newNote
    },
    [types.EDIT_NOTE] (state, text) {
      state.activeNote.text = text
    },
    [types.DELETE_NOTE] (state) {
      state.notes.$remove(state.activeNote)
      state.activeNote = state.notes[0]
    },
    [types.TOGGLE_FAVORITE] (state) {
      state.activeNote.favorite = !state.activeNote.favorite
    },
    [types.SET_ACTIVE_NOTE] (state, note) {
      state.activeNote = note
    }
  }
})
export default store
