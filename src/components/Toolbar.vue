<template lang='pug'>
  #toolbar
    router-link(to='/')
      i.glyphicon.glyphicon-user(data-popover='true')
    i.glyphicon.glyphicon-phone-alt(@click='openNewCallModal')
    //- router-link(to='/map')
    //-   i.glyphicon.glyphicon-home
    router-link(to='/sessions')
      i.glyphicon.glyphicon-th-list
    router-link(to='/tasks')
      i.glyphicon.glyphicon-list-alt
    //- router-link(to='/chart')
    //-   i.glyphicon.glyphicon-star
    router-link(to='/contact')
      i.glyphicon.glyphicon-book
    router-link(to='/notes')
      i.glyphicon.glyphicon-edit
    router-link(to='/schedule')
      i.glyphicon.glyphicon-calendar
    router-link(to='/message')
      i.glyphicon.glyphicon-download-alt
    router-link(to='/mail')
      i.glyphicon.glyphicon-envelope()
    router-link(to='/history')
      i.glyphicon.glyphicon-time
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'toolbar',
  methods: {
    ...mapActions(['toggleNewCallModal']),
    openNewCallModal () {
      this.toggleNewCallModal()
    }
  }
}
</script>

<style scoped>
#toolbar {
  width: 80px;
  height: 100vh;
  float: left;
  background-color: #30414D;
  color: #767676;
  padding: 35px 25px 25px 25px;
  overflow: scroll;
}
#toolbar i {
  font-size: 30px;
  margin-bottom: 35px;
  cursor: pointer;
  opacity: 0.8;
  transition: opacity 0.5s ease;
}

#toolbar i:hover {
  opacity: 1;
}

#toolbar a{
  color: #767676;
}
</style>
