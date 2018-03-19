import * as types from './mutation-types'

export const setUserCredentials = ({ commit }, credentials) => {
  commit(types.SET_USER_CREDENTIAKS, credentials)
}

export const toggleNewCallModal = ({ commit }) => {
  commit(types.TOGGLE_NEW_CALL_MODAL)
}

export const toggleIncomingCallModal = ({ commit }) => {
  commit(types.TOGGLE_INCOMING_CALL_MODAL)
}

export const setContacts = ({ commit }, contacts) => {
  commit(types.SET_CONTACTS)
}

export const setCallOptions = ({ commit }, callOptions) => {
  commit(types.SET_CALL_OPTIONS, callOptions)
}

export const setActiveCall = ({ commit }, activeCall) => {
  commit(types.SET_ACTIVE_CALL, activeCall)
}

export const setContactPresence = ({ commit }, presence) => {
  if (presence) commit(types.SET_CONTACT_PRESENCE, presence)
}

export const setCallHistory = ({ commit }, callHistory) => {
  if (callHistory) commit(types.SET_CALL_HISTORY, callHistory)
}

export const setConversations = ({ commit }, conversations) => {
  if (conversations) commit(types.SET_CONVERSATIONS, conversations)
}

export const addConversation = ({ commit }, conversation) => {
  if (conversation) commit(types.ADD_CONVERSATION, conversation)
}

export const changeDialValue = ({ commit }, dialValue) => {
  commit(types.CHANGE_DIAL_VALUE, dialValue)
}

export const updateActiveNote = ({ commit }, note) => {
  commit(types.SET_ACTIVE_NOTE, note)
}

export const toggleFavorite = ({ commit }) => {
  commit(types.TOGGLE_FAVORITE)
}

export const setTasks = ({ commit }, tasks) => {
  if (tasks) commit(types.SET_TASKS, tasks)
}

export const setNotes = ({ commit }, notes) => {
  if (notes) commit(types.SET_NOTES, notes)
}
