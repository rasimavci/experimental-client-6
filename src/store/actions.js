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

export const addTask = ({ commit }, newTask) => {
  commit(types.ADD_TASK, newTask)
}

export const editTask = ({ commit }, e) => {
  commit(types.EDIT_TASK, e.target.value)
}

export const deleteTask = ({ commit }) => {
  commit(types.DELETE_TASK)
}

export const updateActiveTask = ({ commit }, task) => {
  commit(types.SET_ACTIVE_TASK, task)
}

export const addNote = ({ commit }, newNote) => {
  commit(types.ADD_NOTE, newNote)
}

export const editNote = ({ commit }, e) => {
  commit(types.EDIT_NOTE, e.target.value)
}

export const deleteNote = ({ commit }) => {
  commit(types.DELETE_NOTE)
}

export const updateActiveNote = ({ commit }, note) => {
  commit(types.SET_ACTIVE_NOTE, note)
}

export const toggleFavorite = ({ commit }) => {
  commit(types.TOGGLE_FAVORITE)
}
