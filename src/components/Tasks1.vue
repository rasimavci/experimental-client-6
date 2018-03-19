<template lang='pug'>
  #history
    md-toolbar.md-primary(:md-elevation='1')
      h3.md-title(style='flex: 1') Tasks
      md-icon.md-primary event
    .call-history-container.md-layout.md-gutter.md-alignment-left
      md-datepicker(v-model='date')
      md-field
        md-input(v-model='title')
        md-checkbox(v-model="alert")
      md-field
        md-textarea(v-model='description')
        md-icon description
      md-button.md-primary(@click='saveTask1') Add
      ul(class="md-scrollbar md-layout-item md-size-50 md-medium-size-10 md-small-size-10 md-xsmall-size-100")
        li(v-for='task in tasks', :key='task.recordId')
          md-list.md-double-line
            md-subheader Task
            md-list-item
              md-button.md-icon-button.md-list-action(@click='saveTask1')
                md-icon.md-primary event
              .md-list-item-text
                span {{task.text}}
                span {{moment(task.date).format('MMMM Do YYYY')}}
                span {{moment(task.date).format('h:mm:ss a')}}
                span {{task.favorite}}
              md-button.md-icon-button.md-list-action(@click='toggleDialog(task)')
                md-icon create
              md-button.md-icon-button.md-list-action(@click='deleteTask1(task)')
                md-icon delete

    ul
      li(v-for='task in tasks', :key='task.entryId', @click='toggleDialog(task)')
    md-dialog(:md-active.sync='showDialog', @md-closed='closeEdit')
      edit-task(:currentContact='currentContact', @closeEdit='closeEdit', :isNew='isNew')

</template>

<script>
import Moment from 'moment'
import { mapGetters, mapActions } from 'vuex'
import EditTask from './EditTask'
import TasksService from '../TasksService'
import _ from 'lodash'

export default {
  name: 'tasks',
  data () {
    return {
      date: null,
      taskDate: '1520692473',
      title: 'Task Title',
      description: 'Write the task here',
      alert: false,
      moment: Moment,
      currentContact: {},
      showDialog: false,
      isNew: false
    }
  },
  components: {
    editTask: EditTask
  },
  mounted () {
    this.setTasks(_.cloneDeep(TasksService.getTasks()))
    // this.$kandyJS.getCallHistory()
    let m = Moment
    console.log(m)
    debugger
  },
  methods: {
    ...mapActions(['updateActiveTask', 'addTask', 'editTask', 'deleteTask', 'setTasks']),
    saveTask () {
      let id = 0
      let _tasks = this.$_.sortBy(this.tasks, t => { return t.id })
      if (_tasks.length > 0) {
        id = this.$_.last(_tasks).id + 1
      }
      const newTask = {
        id: id,
        title: this.task.title,
        description: this.task.description,
        reminder: false,
        date: Moment(this.task.date).format('YYYY/MM/DD'),
        startTime: Moment(this.task.date).format('YYYY/MM/DD'),
        alert: this.alert
      }
      TasksService.saveTask(newTask)
      this.setTasks(this.$_.cloneDeep(TasksService.getTasks()))
    },
    saveTask1 () {
      let id = 0
      let _tasks = _.sortBy(this.tasks, t => { return t.id })
      if (_tasks.length > 0) {
        id = _.last(_tasks).id + 1
      }
      const newTask = {
        id: id,
        title: this.title,
        description: this.description,
        reminder: false,
        date: Moment(this.date).format('YYYY/MM/DD'),
        startTime: Moment(this.date).format('YYYY/MM/DD'),
        alert: this.alert
      }
      TasksService.saveTask(newTask)
      this.setTasks(_.cloneDeep(TasksService.getTasks()))
    },
    addTask1 () {
      const newTask = {
        title: this.title,
        description: this.description,
        reminder: false,
        date: this.date,
        startTime: '', // 1520692473,
        alert: this.alert
      }
      this.addTask(newTask)
    },
    editTask1 (task) {
      this.editTask(task)
      task = this.activeTask.text
    },
    deleteTask1 (task) {
      TasksService.deleteTask(task.id)
      this.setTasks(this.$_.cloneDeep(TasksService.getTasks()))
    },
    closeEdit () {
      this.isNew = false
      this.showDialog = false
    },
    toggleDialog (task) {
      this.currentContact = task
      this.$nextTick(() => {
        this.showDialog = true
      })
    }
  },
  computed: {
    ...mapGetters(['tasks', 'activeTask'])
  }
}

</script>

<style scoped>
#history {
  height: 100vh;
  overflow-y: scroll;
}

.call-history-container>ul {
  list-style-type: none;
}

li {
  list-style-type: none;
}
</style>
