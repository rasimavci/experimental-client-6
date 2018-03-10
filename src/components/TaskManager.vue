<template>
<div id="taskManager" class="container">
  <header>
    <nav>
      <ul>
        <li><a href="#">home</a></li>
        <li><a onClick="listTasks1()" href="#">tasks</a></li>
        <li><a href="#">contact</a></li>
      </ul>
    </nav>
  </header>
  <h2>{{ title }}</h2>
        <button class="glyphicon glyphicon-th-list" @click="listTasks1()"></button>

  <form v-on:submit.prevent="addNewTask(newTask)">
    <input required class="input-field validate" type="text" placeholder="title" v-model="newTask.title">
    <input required class="input-field validate" type="text" placeholder="description" v-model="newTask.description" maxlength="30">
    <input required class="input-field validate" type="text" placeholder="priority" v-model="newTask.priority">
    <input type="date" class="input-field" v-model="newTask.date">
    <button class="btn">Add</button>
  </form>
  <ul class="collection with-header collapsible" data-collapsible="accordion">
    <li class="collection-header"><h4>{{ title }}</h4></li>
    <li v-for="task in tasks" class="collection-item" :key='task.recordId'>
      {{ task.title }}<span class="badge">{{ task.date }}</span><span class="badge">{{ task.priority }}</span>
      Description: {{ task.description }}
    </li>
  </ul>
          <footer class="page-footer">
          <div class="container">
            <div class="row">
              <div class="col l6 s12">
                <h5 class="white-text">Footer Content</h5>
                <p class="grey-text text-lighten-4">You can use rows and columns here to organize your footer content.</p>
              </div>
              <div class="col l4 offset-l2 s12">
                <h5 class="white-text">Links</h5>
                <ul>
                  <li><a class="grey-text text-lighten-3" href="#!">Link 1</a></li>
                  <li><a class="grey-text text-lighten-3" href="#!">Link 2</a></li>
                  <li><a class="grey-text text-lighten-3" href="#!">Link 3</a></li>
                  <li><a class="grey-text text-lighten-3" href="#!">Link 4</a></li>
                </ul>
              </div>
            </div>
          </div>
          <div class="footer-copyright">
            <div class="container">
            © 2014 Copyright Text
            <a class="grey-text text-lighten-4 right" href="#!">More Links</a>
            </div>
          </div>
        </footer>
</div>
</template>
<script>
import { mapActions } from 'vuex'
// needs 2 extra css libraries
// https://cdnjs.cloudflare.com/ajax/libs/materialize/0.98.2/css/materialize.min.css

export default {
  data () {
    return {
      title: 'Task Manager',
      tasks: [
        {id: null, title: 'Make a session', description: 'Need to go through my checklist of usdk', priority: 'high'},
        {id: null, title: 'Build a new app', description: 'Build a client app with vue.js', priority: 'low', date: ''}
      ],
      newTask: {id: null, title: '', description: '', priority: '', date: ''}
    }
  },
  methods: {
    ...mapActions(['addTask', 'listTasks']),
    addNewTask (newTask) {
      this.addTask(newTask)
      this.tasks.push(newTask)
      this.newTask = {id: null, title: '', description: '', priority: '', date: ''}
    },
    listTasks1 () {
      this.listTasks()
    }
  }
}
</script>
<style scoped>
#taskManager{
  overflow: hidden;
  width: auto;
  padding: 0;
}
  </style>
