<template lang='pug'>
  #history
    md-toolbar.md-primary(:md-elevation='1')
      h3.md-title(style='flex: 1') Tasks
      md-icon.md-primary event
    .call-history-container.md-layout.md-gutter.md-alignment-left
      md-field
        md-icon event
        md-input(v-model='taskDate')
      md-field
        md-input(v-model='taskTitle')
        md-checkbox(v-model="alert")
      md-field
        md-textarea(v-model='textarea')
        md-icon description
      md-button.md-primary(@click='addTask1') Add
      ul(class="md-layout-item md-size-50 md-medium-size-10 md-small-size-10 md-xsmall-size-100")
        li(v-for='task in tasks', :key='task.recordId')
          md-list.md-double-line
            md-subheader Task
            md-list-item
              md-button.md-icon-button.md-list-action(@click='addTask1')
                md-icon.md-primary event
              .md-list-item-text
                md-icon mic
                span {{task.text}}
                span {{moment(parseInt(task.startTime)).format('MMMM Do YYYY')}}
                span {{moment(parseInt(task.startTime)).format('h:mm:ss a')}}
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

export default {
  name: 'tasks',
  data () {
    return {
      taskDate: '1520692473',
      taskTitle: 'Task Title',
      textarea: 'Write the task here',
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
    // this.$kandyJS.getCallHistory()
    let m = Moment
    console.log(m)
    debugger
  },
  methods: {
    ...mapActions(['updateActiveTask', 'addTask', 'editTask', 'deleteTask']),
    addTask1 () {
      const newTask = {
        text: this.textarea,
        reminder: false,
        taskDate: this.taskDate,
        startTime: this.taskDate, // '1520692473',
        alert: this.alert
      }
      this.addTask(newTask)
    },
    editTask1 (task) {
      this.editTask(task)
      task = this.activeTask.text
    },
    deleteTask1 (task) {
      this.deleteTask(task)
      task = this.activeTask.text
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
