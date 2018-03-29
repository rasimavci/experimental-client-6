<template>
<div id="app">
  <h2>Tasks:</h2>
  <ul v-for='(grp, idx) in taskGroupsByDate' :key='idx'>
    <h2>Group {{ idx }}</h2>
    <li v-for='task in grp' :key='task.id'>
      <label>
          {{ task.text }} - {{ getTime(task.date) }}
      </label>
    </li>
  </ul>
</div>

</template>
<script>

import moment from 'moment'
import _ from 'lodash'

const INPUT_DATE_FORMAT = 'DDMMMYYYY h:mm:ss a'
const OUTPUT_DATE_FORMAT = 'h:mm:ss a'

export default {
  computed: {
    taskGroupsByDate () {
      return _.groupBy(this.tasks, (task) => {
        return moment(task.date, INPUT_DATE_FORMAT).format('DD.MM.YYYY')
      })
    }
  },
  data () {
    return {
      tasks: [
        {date: '01Jan2018, 1:12:44 pm', text: 'Test1'},
        {date: '01Jan2018, 1:11:45 pm', text: 'Test2'},
        {date: '01Jan2018, 2:10:44 pm', text: 'Test3'},
        {date: '02Jan2018, 5:01:44 pm', text: 'Test4'},
        {date: '03Jan2018, 6:01:44 pm', text: 'Test5'},
        {date: '03Jan2018, 7:01:44 pm', text: 'Test6'}
      ]
    }
  },

  methods: {
    getTime (dateStr) {
      return moment(dateStr, INPUT_DATE_FORMAT).format(OUTPUT_DATE_FORMAT)
    }
  }
}
</script>

<style>
body {
  background: #20262E;
  padding: 20px;
  font-family: Helvetica;
}

#app {
  background: #fff;
  border-radius: 4px;
  padding: 20px;
  transition: all 0.2s;
}

h2 {
  font-weight: bold;
  margin-bottom: 15px;
}

ul {
  margin: 10px;
  border: 1px solid black;
}
</style>
