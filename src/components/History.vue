<template lang='pug'>
  #history
    md-toolbar.md-primary(:md-elevation='1')
      span.md-titleFull History
    .call-history-container.md-layout.md-gutter.md-alignment-left
      ul(class="md-layout-item md-size-50 md-medium-size-10 md-small-size-10 md-xsmall-size-100")
        li(v-for='call in callHistory', :key='call.recordId')
          md-list.md-double-line
            md-subheader Phone
            md-list-item
              md-button.md-icon-button.md-list-action
                md-icon.md-primary face
              .md-list-item-text
                span {{call.callerDisplayNumber}}
                span {{moment(parseInt(call.startTime)).format('MMMM Do YYYY, h:mm:ss a')}}
                span {{call.direction}}
              md-button.md-icon-button.md-list-action
                span {{moment(parseInt(call.startTime)).format('h:mm')}}
                md-icon call_made

</template>

<script>
/*
    {
        "recordId": "1027986",
        "startTime": "1518768317000",
        "duration": "0",
        "direction": "missed",
        "callerName": "Burak KOCAK",
        "callerDisplayNumber": "bkocak@genband.com",
        "resourceLocation": "/rest/version/1/user/ravci@genband.com/logRecord/1027986"
    }
*/
import Moment from 'moment'
import {mapGetters} from 'vuex'
export default {
  name: 'history',
  data () {
    return {
      moment: Moment
    }
  },
  mounted () {
    this.$kandyJS.getCallHistory()
    let m = Moment
    console.log(m)
    debugger
  },
  computed: {
    ...mapGetters(['callHistory'])
  },
  methods: {

  }
}
</script>

<style scoped>
#history{
    height: 100vh;
  overflow-y: scroll;
}
.call-history-container > ul{
  list-style-type: none;
}
li {
  list-style-type: none;
}
</style>
