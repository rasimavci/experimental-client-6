/*
ravci@genband.com, yjke9884
bkocak@genband.com, pneg4200

conversationId
:
"bkocak@genband.com"
messageId
:
"6867784010829416974"

var kandy1
function debugKandy(){
  kandy1 = createKandy({
    authentication: {
      subscription: {
        expires: 3600,
        service: [
          'IM', 'Presence', 'call'
        ],
        protocol: 'https',
        server: 'spidr-ucc.genband.com',
        version: '1',
        port: '443'
      },
      websocket: {
        protocol: 'wss',
        server: 'spidr-ucc.genband.com',
        port: '443'
      }
    },
    logs: {
      logLevel: 'debug',
      enableFcsLogs: true
    },
    call: {
      chromeExtensionId: 'daohbhpgnnlgkipndobecbmahalalhcp',
      serverProvidedTurnCredentials: true,
      iceserver: [{
        url: 'stun:turn-ucc-1.genband.com:3478?transport=udp'
      }, {
        url: 'stun:turn-ucc-2.genband.com:3478?transport=udp'
      }, {
        url: 'turns:turn-ucc-1.genband.com:443?transport=tcp',
        credential: ''
      }, {
        url: 'turns:turn-ucc-2.genband.com:443?transport=tcp',
        credential: ''
      }]
    }
  })
  kandy1.connect({username: 'ravci@genband.com', password: 'yjke9884'})
}
debugKandy()
*/
import store from '../store'
import IMService from '../IMService'
import _ from 'lodash'
let kandy = {}
function loadKandyConfig (callback) {
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
}

function loadKandy (config) {
  debugger
  /* eslint-disable no-undef */
  kandy = createKandy(config)
}
function addEventListeners () {
  kandy.on('auth:change', data => {
    if (kandy.getConnection().isConnected === true) {
      Kandyjs.refreshContacts()
      Kandyjs.getDevices()
      Kandyjs.fetchCallHistory()
      Kandyjs.getMessages()
    }
  })
  kandy.on('call:error', err => {
    debugger
    if (store.getters.activeCall) store.dispatch('toggleActiveCall')
    console.log('call error: ' + err)
  })
  kandy.on('call:stateChange', call => {
    let calls = kandy.call.getAll()
    store.commit('UPDATE_CALLS', calls)
    calls.forEach(call => {
      if (call.id === store.state.activeCall.id) {
        store.commit('SET_ACTIVE_CALL', call)
        if (call.state === kandy.call.states.RINGING) {
          store.commit('RINGING_SOUND', {play: true})
        } else store.commit('RINGING_SOUND', {play: false})
      }
    })
  })
  kandy.on('call:mediaStateChange', params => {})
  kandy.on('call:start', params => {
    const calls = kandy.call.getAll()
    calls.forEach(call => {
      console.log('all call ids curently : ' + params.callId)
      if (call.id === params.callId) {
        store.commit('SET_ACTIVE_CALL', call)
      }
    })
  })
  kandy.on('call:receive', params => {
    let incomingCallData = {
      callId: params.callId,
      active: true
    }
    store.commit('SET_INCOMING_CALL', incomingCallData)
    store.commit('TOGGLE_INCOMING_CALL_MODAL')
  })
  kandy.on('contacts:change', params => {
    store.commit('SET_CONTACTS', params.contacts)
    Kandyjs.subscribePresence(params.contacts)
  })
  kandy.on('directory:change', params => {
    store.commit('REFRESH_DIRECTORY', params.results)
  })
  kandy.on('conversations:new', params => {
    console.log('new conversation' + params.conversation)
    store.commit('ADD_CONVERSATION', params.conversation)
  })
  kandy.on('devices:defaultsChange', res => {})
  kandy.on('media:initialize', res => {})
  kandy.on('devices:change', res => {})
  kandy.on('presence:change', res => {
    console.log(res)
    store.dispatch('setContactPresence', res)
  })
  kandy.on('presence:error', res => { debugger })
  kandy.on('callHistory:change', res => {
    let history = kandy.call.history.get()
    console.log(history)
  })
  kandy.on('conversations:change', res => {
    debugger
    console.log(res)
  })
  kandy.on('messages:change', res => {
    let messages = IMService.getMessages()
    store.dispatch('setConversations', messages)
    // Kandyjs.getMessages()
    // console.log(messages)
  })
  kandy.on('messages:error', res => {
    debugger
    console.log(res)
  })
}

const Kandyjs = {
  connect: credentials => new Promise((resolve, reject) => {
    if (credentials.username && credentials.password) {
      kandy.connect(credentials)
      addEventListeners()
      resolve('OK')
    } else {
      let err = 'bad credentials'
      reject(err)
    }
  }),
  disconnect: () => {
    console.log('disconnect method runs for ')
    kandy.disconnect()
  },
  isConnected: () => new Promise((resolve, reject) => {
    try {
      let res = kandy.getConnection().isConnected
      resolve(res)
    } catch (err) {
      reject(err)
    }
  }),
  refreshContacts: () => {
    kandy.contacts.refresh()
  },
  updateContact: (id, editContact) => {
    debugger
    kandy.contacts.update(btoa(id), editContact)
  },
  addContact: (newContact) => {
    kandy.contacts.add(newContact)
  },
  removeContact: (id) => {
    debugger
    kandy.contacts.remove(btoa(id))
  },
  makeCall: (callee) => {
    kandy.call.make(callee, store.state.callOptions)
  },
  endCall: () => {
    kandy.call.end(store.state.activeCall.id)
  },
  answerCall: () => {
    console.log('answer call for id: ' + store.state.incomingCall.callId)
    kandy.call.answer(store.state.incomingCall.callId)
  },
  rejectCall: () => {
    kandy.call.reject(store.state.incomingCall.callId)
  },
  muteCall: () => {
    kandy.call.mute(store.state.activeCall.id)
  },
  unmuteCall: () => {
    kandy.call.unmute(store.state.activeCall.id)
  },
  startVideo: (options) => {
    kandy.call.startVideo(store.state.activeCall.id, options)
  },
  stopVideo: () => {
    kandy.call.stopVideo(store.state.activeCall.id)
  },
  holdCall: () => {
    kandy.call.hold(store.state.activeCall.id)
  },
  unholdCall: () => {
    kandy.call.unhold(store.state.activeCall.id)
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
        kandy.call.startScreenshare(store.state.activeCall.id, options)
      })
      .catch(err => {
        console.log(err)
      })
  },
  stopScreenshare: () => {
    kandy.call.stopScreenshare(store.state.activeCall.id)
  },
  getDevices: () => {
    kandy.media.getDevices()
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
    kandy.presence.subscribe(contactsIdArray)
  },
  getPresence: id => {
    kandy.presence.get(id || '')
  },
  updatePresence: () => {
    debugger
    kandy.presence.update(STATUS.OPEN, ACTIVITY.ACTIVE)
  },
  fetchCallHistory: (amount = 50, offset = 0) => {
    kandy.call.history.fetch(amount, offset)
  },
  getCallHistory: () => {
    store.dispatch('setCallHistory', kandy.call.history.get())
  },
  getMessages: () => {
    // kandy.conversation.fetch()
    let messages = IMService.getMessages()
    store.dispatch('setConversations', messages)
  },
  sendMessage: messageToSend => {
    let convExist = false
    let conv = kandy.conversation.get(messageToSend.userId)
    let part = {
      type: messageToSend.type,
      text: messageToSend.text
    }
    let message = conv.createMessage(part)
    // dont add it ıf already exist in the state
    store.state.conversations.forEach(c => {
      if (c.destination === conv.destination) convExist = true
    })
    if (!convExist) store.dispatch('addConversation', conv)
    message.send()
    message.direction = 'SENT'
    IMService.saveMessage(message)
  }
}

loadKandyConfig().then(res => {
  loadKandy(res)
}).catch(err => {
  console.log('Error reading kandy config file: ' + err)
})

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

export default Kandyjs
