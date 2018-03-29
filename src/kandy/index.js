import store from '../store'
import IMService from '../IMService'
import _ from 'lodash'
const Kandyjs = {
  kandy: null,
  start: () => {
    console.log('>>>>>STARTING KANDY<<<<<<')
    Kandyjs.loadKandyConfig().then(res => {
      /* eslint-disable no-undef */
      Kandyjs.kandy = createKandy(res)
    }).catch(err => {
      console.log(err)
    })
  },
  loadKandyConfig: () => {
    return new Promise((resolve, reject) => {
      var xobj = new XMLHttpRequest()
      xobj.overrideMimeType('application/json')
      xobj.open('GET', 'static/js/config.json', true)
      xobj.onreadystatechange = function () {
        if (xobj.readyState === 4) {
          if (xobj.status === 200) {
            resolve(JSON.parse(xobj.responseText))
          } else {
            reject(xobj.statusText)
          }
        }
      }
      xobj.send(null)
    })
  },
  addEventListeners: () => {
    Kandyjs.kandy.on('auth:change', data => {
      if (Kandyjs.kandy.getConnection().isConnected === true) {
        Kandyjs.refreshContacts()
        Kandyjs.getDevices()
        Kandyjs.fetchCallHistory()
        Kandyjs.getMessages()
        Kandyjs.getSelf()
      }
    })
    Kandyjs.kandy.on('call:error', err => {
      if (store.getters.activeCall) store.dispatch('toggleActiveCall')
      console.log('call error: ' + err)
    })
    Kandyjs.kandy.on('call:stateChange', call => {
      let calls = Kandyjs.kandy.call.getAll()
      store.commit('UPDATE_CALLS', calls)
      calls.forEach(call => {
        if (call.id === store.state.activeCall.id) {
          store.commit('SET_ACTIVE_CALL', call)
          if (call.state === Kandyjs.kandy.call.states.RINGING) {
            store.commit('RINGING_SOUND', {play: true})
          } else store.commit('RINGING_SOUND', {play: false})
        }
      })
    })
    Kandyjs.kandy.on('call:mediaStateChange', params => {})
    Kandyjs.kandy.on('call:start', params => {
      const calls = Kandyjs.kandy.call.getAll()
      calls.forEach(call => {
        console.log('all call ids curently : ' + params.callId)
        if (call.id === params.callId) {
          store.commit('SET_ACTIVE_CALL', call)
        }
      })
    })
    Kandyjs.kandy.on('call:receive', params => {
      let incomingCallData = {
        callId: params.callId,
        active: true
      }
      store.commit('SET_INCOMING_CALL', incomingCallData)
      store.commit('TOGGLE_INCOMING_CALL_MODAL')
    })
    Kandyjs.kandy.on('contacts:change', params => {
      store.commit('SET_CONTACTS', params.contacts)
      Kandyjs.subscribePresence(params.contacts)
    })
    Kandyjs.kandy.on('directory:change', params => {
      store.commit('REFRESH_DIRECTORY', params.results)
    })
    Kandyjs.kandy.on('conversations:new', params => {
      console.log('new conversation' + params.conversation)
      store.commit('ADD_CONVERSATION', params.conversation)
    })
    Kandyjs.kandy.on('devices:defaultsChange', res => {})
    Kandyjs.kandy.on('media:initialize', res => {})
    Kandyjs.kandy.on('devices:change', res => {})
    Kandyjs.kandy.on('presence:change', res => {
      console.log(res)
      store.dispatch('setContactPresence', res)
    })
    Kandyjs.kandy.on('presence:error', res => {})
    Kandyjs.kandy.on('callHistory:change', res => {
      let history = Kandyjs.kandy.call.history.get()
      console.log(history)
    })
    Kandyjs.kandy.on('conversations:change', res => {
      let conv = Kandyjs.kandy.conversation.get(res.conversationId)
      let messages = {
        conversationId: res.conversationId,
        messages: conv.getMessages()
      }
      IMService.saveMessage(messages)
      Kandyjs.getMessages()
    })
    Kandyjs.kandy.on('messages:change', res => {
      let conv = Kandyjs.kandy.conversation.get(res.conversationId)
      let messages = {
        conversationId: res.conversationId,
        messages: conv.getMessages()
      }
      IMService.saveMessage(messages)
      Kandyjs.getMessages()
    })
    Kandyjs.kandy.on('messages:error', res => {
      console.log(res)
    })
  },
  connect: credentials => new Promise((resolve, reject) => {
    if (credentials.username && credentials.password) {
      Kandyjs.kandy.connect(credentials)
      Kandyjs.addEventListeners()
      resolve('OK')
    } else {
      let err = 'bad credentials'
      reject(err)
    }
  }),
  disconnect: () => {
    console.log('disconnect method runs for ')
    Kandyjs.kandy.disconnect()
  },
  isConnected: () => new Promise((resolve, reject) => {
    try {
      let res = Kandyjs.kandy.getConnection().isConnected
      resolve(res)
    } catch (err) {
      reject(err)
    }
  }),
  refreshContacts: () => {
    Kandyjs.kandy.contacts.refresh()
  },
  updateContact: (id, editContact) => {
    Kandyjs.kandy.contacts.update(btoa(id), editContact)
  },
  addContact: (newContact) => {
    Kandyjs.kandy.contacts.add(newContact)
  },
  removeContact: (id) => {
    Kandyjs.kandy.contacts.remove(btoa(id))
  },
  makeCall: (callee) => {
    Kandyjs.kandy.call.make(callee, store.state.callOptions)
  },
  endCall: () => {
    Kandyjs.kandy.call.end(store.state.activeCall.id)
  },
  answerCall: () => {
    console.log('answer call for id: ' + store.state.incomingCall.callId)
    Kandyjs.kandy.call.answer(store.state.incomingCall.callId)
  },
  rejectCall: () => {
    Kandyjs.kandy.call.reject(store.state.incomingCall.callId)
  },
  muteCall: () => {
    Kandyjs.kandy.call.mute(store.state.activeCall.id)
  },
  unmuteCall: () => {
    Kandyjs.kandy.call.unmute(store.state.activeCall.id)
  },
  startVideo: (options) => {
    Kandyjs.kandy.call.startVideo(store.state.activeCall.id, options)
  },
  stopVideo: () => {
    Kandyjs.kandy.call.stopVideo(store.state.activeCall.id)
  },
  holdCall: () => {
    Kandyjs.kandy.call.hold(store.state.activeCall.id)
  },
  unholdCall: () => {
    Kandyjs.kandy.call.unhold(store.state.activeCall.id)
  },
  startScreenshareVideo: (options) => {
    Kandyjs.getMediaStreamId()
      .then(res => {
        let options = {
          mediaSourceId: res,
          height: 200,
          width: 200,
          frameRate: 5
        }
        Kandyjs.kandy.call.startScreenshare(store.state.activeCall.id, options)
      })
      .catch(err => {
        console.log(err)
      })
  },
  stopScreenshare: () => {
    Kandyjs.kandy.call.stopScreenshare(store.state.activeCall.id)
  },
  getDevices: () => {
    Kandyjs.kandy.media.getDevices()
  },
  getMediaStreamId () {
    return new Promise((resolve, reject) => {
      let extId = 'daohbhpgnnlgkipndobecbmahalalhcp'
      window.chrome.runtime.sendMessage(extId, {
        message: 'chooseDesktopMedia'
      },
      response => {
        if (response && response.mediaSourceId) {
          resolve(response.mediaSourceId)
        } else {
          console.error('Could not get mediaSourceId.')
          reject(response)
        }
      })
    })
  },
  subscribePresence: (contacts) => {
    let contactsIdArray = []
    _.forEach(contacts, (value, key) => {
      contactsIdArray.push(value.primaryContact)
    })
    Kandyjs.kandy.presence.subscribe(contactsIdArray)
  },
  getPresence: id => {
    Kandyjs.kandy.presence.get(id || '')
  },
  updatePresence: () => {
    Kandyjs.kandy.presence.update(STATUS.OPEN, ACTIVITY.ACTIVE)
  },
  fetchCallHistory: (amount = 50, offset = 0) => {
    Kandyjs.kandy.call.history.fetch(amount, offset)
  },
  getCallHistory: () => {
    store.dispatch('setCallHistory', Kandyjs.kandy.call.history.get())
  },
  getMessages: () => {
    let messages = IMService.getMessages()
    store.dispatch('setConversations', _.cloneDeep(messages))
  },
  sendMessage: messageToSend => {
    let conv = Kandyjs.kandy.conversation.get(messageToSend.userId)
    let part = {
      type: messageToSend.type,
      text: messageToSend.text
    }
    let message = conv.createMessage(part)
    message.send()
  },
  getSelf: () => {
    let selfinfo = Kandyjs.kandy.user.getSelf()
    store.dispatch('setSelfinfo', selfinfo)
  }
}

export const STATUS = {
  OPEN: 'open',
  CLOSED: 'closed'
}

/**
* The activity to be shown as presence state
*/
export const ACTIVITY = {
  ACTIVE: 'active',
  IDLE: 'idle',
  AWAY: 'away',
  LUNCH: 'lunch',
  OTHER: 'other',
  BUSY: 'busy',
  VACATION: 'vacation',
  ON_THE_PHONE: 'on-the-phone',
  UNKNOWN: 'unknown'
}

Kandyjs.start()
export default Kandyjs
