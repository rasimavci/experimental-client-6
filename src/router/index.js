import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import LoginScreen from '@/components/LoginScreen'
import Contact from '@/components/Contact'
import History from '@/components/History'
import Message from '@/components/Message'
import NewMessage from '@/components/NewMessage'
import Sessions from '@/components/Sessions'
import TaskManager from '@/components/TaskManager'
import Notes from '@/components/Notes'
import Tasks from '@/components/Tasks'
import Schedule from '@/components/Schedule'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/login',
      name: 'LoginScreen',
      component: LoginScreen
    },
    {
      path: '/contact',
      name: 'Contact',
      component: Contact
    },
    {
      path: '/history',
      name: 'History',
      component: History
    },
    {
      path: '/message',
      name: 'Message',
      component: Message
    },
    {
      path: '/newMessage/:id',
      name: 'NewMessage',
      component: NewMessage
    },
    {
      path: '/sessions',
      name: 'Sessions',
      component: Sessions
    },
    {
      path: '/taskmanager',
      name: 'TaskManager',
      component: TaskManager
    },
    {
      path: '/notes',
      name: 'Notes',
      component: Notes
    },
    {
      path: '/tasks',
      name: 'Tasks',
      component: Tasks
    },
    {
      path: '/schedule',
      name: 'Schedule',
      component: Schedule
    }
  ]
})
