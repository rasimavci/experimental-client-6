/* eslint-disable */
// eslint-no-unused-vars
<template>
<div>
  <ul class="main">
<div class="dialog-container">
    <md-toolbar class="md-primary" md-elevation="1">
     <h3 class="md-title" style='flex: 1'>Schedule</h3>
    </md-toolbar>
</div>
<ul style="width: 600px; height: 800px; overflow: auto">
    <li v-for='(value, key) in groupedTasks' :key='key'>
      <div class="date">
        <h3>{{moment(key).format("MMM Do YY")}}</h3>
        <p>Schedule of Events</p>

      <li class="events cf">
        <ul class="events-detail">
          <li v-for='task in value' :key='task.id' @click='toggleDialog(task)'>
            <a href="#">
              <span class="event-time">2:00pm - {{moment(task.date).format('h:mm:ss a')}}</span>
              <span class="event-name">{{task.title}}</span>
              <br />
              <span class="event-location">{{task.description}}</span>
            </a>
          </li>
        </ul>
      </li>
      </div>

</li>
</ul>
  </ul>
</div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import Moment from 'moment'
import _ from 'lodash'

export default {
  methods: {
    ...mapActions(['']),
    openNewCallModal () {
      this.toggleProfileModal()
    },
    toggleDialog () {

    }
  },
  data () {
    return {
      moment: Moment,
      selectedBook: 1,
      checkedList: [],
      filterByStatus: [],
      filterByName: [],
      filterToggle: false,
      notification: false
    }
  },
  computed: {
    getTasks () {
      // console.log('tasks:' + store.state.tasks)
      return true // store.state.tasks
    },
    checkedAll () {
      return true
    },
    ...mapGetters(['tasks', 'activeTask']),
    groupedTasks () {
      console.log('Grouped tasks ' + JSON.stringify(_.groupBy(this.tasks, 'date')))
      return _.groupBy(this.tasks, 'date')
    }
  }
}
</script>

<style scoped>
.tasks {
  height: 100vh;
  overflow-y: scroll;
}

*,
*:before,
*:after {
  -moz-box-sizing: border-box;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
}

ul.main {
  list-style: none;
  max-width: 77%;
  margin: 0px auto;
}

h3 {
  padding: 0;
  margin: 0;
}

.date {
  width: 17%;
  padding: 15% 1% 0 0;
  float: left;
}

.date h3 {
  font-size: 1.5em;
}

.date p {
  font-size: .8em;
}

.events {
  float: left;
  width: 80%;
  border-left: 1px solid #ccc;
  margin-top: 10%;
  padding-top: 3%;
}

.events-detail {
  max-width: 550px;
}

.events-detail li {
  padding: 10px;
  border-bottom: 1px dashed #ccc;
  line-height: 22px;
  transition: ease .4s all;
}

.events-detail li:hover {
  background: #e9e9e9;
}

.event-time {
  font-weight: 900;
}

.events-detail li a {
  text-decoration: none;
  color: #444;
  width: 100%;
  height: 100%;
  display: block;
}

.event-location {
  font-size: .8em;
  color: tomato;
  margin-left: 70px;
}

@media all and (max-width: 641px) {
  .date {
    width: 100%;
    border-bottom: 1px solid #ccc;
    margin-bottom: 10px;
  }

  .events {
    border: none;
    width: 100%;
    margin-top: 0;
  }

  .events-detail {
    padding: 0;
  }

  li.date p {
    margin: 0;
  }
}
</styled>
