<template lang='pug'>
  #tasks
    .dialog-container
      md-dialog(:md-active.sync='showDialog', @md-closed='closeEdit')
        edit-task(:currentTask='currentTask', @closeEdit='closeEdit', @editCurrentTask='editTask', @deleteCurrentTask='removeTask')
    md-toolbar.md-primary(:md-elevation='1')
      h3.md-title(style='flex: 1') Tasks
      md-icon.md-primary event
    .tasks-container
      form.md-layout.md-gutter.md-size-100(novalidate='', @submit.prevent='validateTask')
        .md-layout-item.md-small-size-100.md-xsmall-size-100
          md-field(:class="getValidationClass('date')")
            md-datepicker(v-model='task.date')
            span.md-error(v-if='!$v.task.date.required') The task title is required
        .md-layout-item.md-small-size-100.md-xsmall-size-100
          md-field(:class="getValidationClass('title')")
            md-input#task-title(name='task-title', v-model='task.title', placeholder='Task Title...')
            span.md-error(v-if='!$v.task.title.required') The task title is required
            span.md-error(v-else-if='!$v.task.title.minlength') Invalid task title
        .md-layout-item.md-small-size-100.md-xsmall-size-100
          md-field(:class="getValidationClass('description')")
            md-textarea(v-model='task.description', placeholder='Write the task here...')
            span.md-error(v-if='!$v.task.description.required') The task description is required
            span.md-error(v-else-if='!$v.task.description.minlength') Invalid task description
            md-icon description
        md-button.md-primary(type='submit') Add
      ul.md-layout
        li(v-for='tasks, key in groupedTasks')
          md-card
            md-card-content
              h3 {{moment(key).format("MMM Do YY")}}
          md-list.md-double-line(v-for='task in tasks', :key='task.id')
            md-subheader {{task.title}}
            md-list-item
              md-button.md-icon-button.md-list-action()
                md-icon.md-primary event
              .md-list-item-text
                span {{moment(task.date).format('MMMM Do YYYY')}}
                span {{moment(task.date).format('h:mm:ss a')}}
                span {{task.favorite}}
              md-button.md-icon-button.md-list-action(@click='toggleDialog(task)')
                md-icon create
              md-button.md-icon-button.md-list-action(@click='removeTask(task)')
                md-icon delete
</template>

<script>
import TasksService from '../TasksService'
import Moment from 'moment'
import { mapGetters, mapActions } from 'vuex'
import { validationMixin } from 'vuelidate'
import {
  required,
  minLength
} from 'vuelidate/lib/validators'
import EditTask from './EditTask'
export default {
  name: 'tasks',
  mixins: [validationMixin],
  data () {
    return {
      task: {
        date: Moment().format('YYYY/MM/DD'),
        title: null,
        description: null
      },
      divider: {
        currentDate: 1,
        lastDate: 2
      },
      alert: false,
      moment: Moment,
      currentTask: {},
      showDialog: false
    }
  },
  validations: {
    task: {
      date: {
        required
      },
      title: {
        required,
        minLength: minLength(3)
      },
      description: {
        required,
        minLength: minLength(3)
      }
    }
  },
  components: {
    editTask: EditTask
  },
  mounted () {
    this.setTasks(this.$_.cloneDeep(TasksService.getTasks()))
  },
  methods: {
    ...mapActions(['setTasks']),
    validateTask () {
      this.$v.$touch()
      if (!this.$v.$invalid) {
        this.saveTask()
      }
    },
    getValidationClass (fieldName) {
      const field = this.$v.task[fieldName]
      if (field) {
        return {
          'md-invalid': field.$invalid && field.$dirty
        }
      }
    },
    showSeparator () {
      if (this.divider.currentDate === 1) {
        this.divider.currentDate++
        return true
      } else {
        this.divider.currentDate--
        return false
      }
    },
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
    editTask (task) {
      TasksService.saveTask(task)
      this.setTasks(this.$_.cloneDeep(TasksService.getTasks()))
      this.closeEdit()
    },
    removeTask (task) {
      TasksService.deleteTask(task.id)
      this.setTasks(this.$_.cloneDeep(TasksService.getTasks()))
    },
    closeEdit () {
      this.showDialog = false
    },
    toggleDialog (task) {
      this.currentTask = this.$_.cloneDeep(task)
      this.$nextTick(() => {
        this.showDialog = true
      })
    }
  },
  computed: {
    ...mapGetters(['tasks']),
    groupedTasks () {
      return this.$_.groupBy(this.tasks, 'date')
    }
  }
}
</script>

<style scoped>
#tasks {
  height: 100vh;
  overflow-y: scroll;
}
.tasks-container{
  padding-left: 5px;
  padding-right: 5px;
}
.tasks-container > ul {
  list-style-type: none;
}

li {
  list-style-type: none;
}
</style>
