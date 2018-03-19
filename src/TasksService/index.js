import _ from 'lodash'

let TaskStorage
TaskStorage = JSON.parse(localStorage.getItem('kandy-Task-Storage'))
function getFromDB () {
  try {
    TaskStorage = JSON.parse(localStorage.getItem('kandy-Task-Storage'))
  } catch (err) {
    console.log(err)
  }
}

function existTask (id) {
  return _.find(TaskStorage, t => {
    return t.id === id
  })
}

function saveNewTask (tsk) {
  try {
    TaskStorage.push(tsk)
    localStorage.setItem('kandy-Task-Storage', JSON.stringify(TaskStorage))
  } catch (err) {
    console.log(err)
  }
}

function saveExistingTask (tsk) {
  let storageDeep = _.cloneDeep(TaskStorage)
  let index = _.findIndex(storageDeep, t => {
    return t.id === tsk.id
  })
  if (index > -1) {
    try {
      storageDeep[index] = tsk
      localStorage.setItem('kandy-Task-Storage', JSON.stringify(storageDeep))
    } catch (err) {
      console.log(err)
    }
  } else {
    console.log('Error saving task')
  }
}

function deleteTask (id) {
  _.remove(TaskStorage, t => {
    return t.id === id
  })
  localStorage.setItem('kandy-Task-Storage', JSON.stringify(TaskStorage))
}
const TasksService = {
  saveTask: tsk => {
    if (TaskStorage) {
      let task = existTask(tsk.id)
      if (task) {
        saveExistingTask(tsk)
      } else {
        saveNewTask(tsk)
      }
    } else {
      TaskStorage = []
      saveNewTask(tsk)
    }
  },
  deleteTask: id => {
    if (TaskStorage) {
      let task = existTask(id)
      if (task) {
        deleteTask(id)
      } else {
        console.log('Error deleting task, task not found')
      }
    } else {
      console.log('Error deleting task, storage not found')
    }
  },
  getTasks: () => {
    getFromDB()
    return TaskStorage
  }
}

export default TasksService
