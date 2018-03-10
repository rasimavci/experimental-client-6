// eslint-disable-next-line
import state from './state'

const credentials = state => state.credentials
const newCallModal = state => state.newCallModal
const incomingCallModal = state => state.incomingCallModal
const contacts = state => state.contacts
const activeCall = state => state.activeCall
const incomingCall = state => state.incomingCall
const callHistory = state => state.callHistory
const callOptions = state => state.callOptions
const conversations = state => state.conversations
const dialValue = state => state.dialValue
export {
  credentials,
  newCallModal,
  incomingCallModal,
  contacts,
  activeCall,
  incomingCall,
  callHistory,
  callOptions,
  conversations,
  dialValue
}
