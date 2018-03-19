<template>
  <li class="date">
    <h3>Dec 18</h3>
    <p>Schedule of Events</p>
  </li>
  <li class= "events">
    <ul class="events-detail">
      <li>
        <a href="#">
          <span class="event-time">2:00pm - </span>
          <span class="event-name">Kickoff Ceremony</span>
          <br />
          <span class="event-location">Headquarters</span>
        </a>
      </li>

       <li>
        <a href="#">
          <span class="event-time">2:00pm - </span>
          <span class="event-name">Kickoff Ceremony</span>
          <br />
          <span class="event-location">Headquarters</span>
        </a>
      </li>

       <li>
        <a href="#">
          <span class="event-time">2:00pm - </span>
          <span class="event-name">Kickoff Ceremony</span>
          <br />
          <span class="event-location">Headquarters</span>
        </a>
      </li>

       <li>
        <a href="#">
          <span class="event-time">2:00pm - </span>
          <span class="event-name">Kickoff Ceremony</span>
          <br />
          <span class="event-location">Headquarters</span>
        </a>
      </li>

       <li>
        <a href="#">
          <span class="event-time">2:00pm - </span>
          <span class="event-name">Kickoff Ceremony</span>
          <br />
          <span class="event-location">Headquarters</span>
        </a>
      </li>
    </ul>

  </li>

    <li class="date">
    <h3>Dec 19</h3>
    <p>Schedule of Events</p>
  </li>
  <li class= "events cf">
    <ul class="events-detail">
      <li>
        <a href="#">
          <span class="event-time">2:00pm - </span>
          <span class="event-name">Kickoff Ceremony</span>
          <br />
          <span class="event-location">Headquarters</span>
        </a>
      </li>

       <li>
        <a href="#">
          <span class="event-time">2:00pm - </span>
          <span class="event-name">Kickoff Ceremony</span>
          <br />
          <span class="event-location">Headquarters</span>
        </a>
      </li>

       <li>
        <a href="#">
          <span class="event-time">2:00pm - </span>
          <span class="event-name">Kickoff Ceremony</span>
          <br />
          <span class="event-location">Headquarters</span>
        </a>
      </li>

       <li>
        <a href="#">
          <span class="event-time">2:00pm - </span>
          <span class="event-name">Kickoff Ceremony</span>
          <br />
          <span class="event-location">Headquarters</span>
        </a>
      </li>

       <li>
        <a href="#">
          <span class="event-time">2:00pm - </span>
          <span class="event-name">Kickoff Ceremony</span>
          <br />
          <span class="event-location">Headquarters</span>
        </a>
      </li>
    </ul>

  </li>
</template>

<script>
// tasks and notes old actions
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

</script>
