import _ from 'lodash'

let NoteStorage
NoteStorage = JSON.parse(localStorage.getItem('kandy-Note-Storage'))
function getFromDB () {
  try {
    NoteStorage = JSON.parse(localStorage.getItem('kandy-Note-Storage'))
  } catch (err) {
    console.log(err)
  }
}

function existNote (id) {
  return _.find(NoteStorage, t => {
    return t.id === id
  })
}

function saveNewNote (nt) {
  try {
    NoteStorage.push(nt)
    localStorage.setItem('kandy-Note-Storage', JSON.stringify(NoteStorage))
  } catch (err) {
    console.log(err)
  }
}

function saveExistingNote (nt) {
  let storageDeep = _.cloneDeep(NoteStorage)
  let index = _.findIndex(storageDeep, t => {
    return t.id === nt.id
  })
  if (index > -1) {
    try {
      storageDeep[index] = nt
      localStorage.setItem('kandy-Note-Storage', JSON.stringify(storageDeep))
    } catch (err) {
      console.log(err)
    }
  } else {
    console.log('Error saving note')
  }
}

function deleteNote (id) {
  _.remove(NoteStorage, t => {
    return t.id === id
  })
  localStorage.setItem('kandy-Note-Storage', JSON.stringify(NoteStorage))
}
const NotesService = {
  saveNote: nt => {
    if (NoteStorage) {
      let note = existNote(nt.id)
      if (note) {
        saveExistingNote(nt)
      } else {
        saveNewNote(nt)
      }
    } else {
      NoteStorage = []
      saveNewNote(nt)
    }
  },
  deleteNote: id => {
    if (NoteStorage) {
      let note = existNote(id)
      if (note) {
        deleteNote(id)
      } else {
        console.log('Error deleting note, note not found')
      }
    } else {
      console.log('Error deleting note, storage not found')
    }
  },
  getNotes: () => {
    getFromDB()
    return NoteStorage
  }
}

export default NotesService
