<template lang='pug'>
  #history
    md-toolbar.md-primary(:md-elevation='1')
      h3.md-title(style='flex: 1') Sessions
      span.md-titleFull All Sessions
      md-icon.md-primary list
    .call-history-container.md-layout.md-gutter.md-alignment-left
      ul(class="md-layout-item md-size-50 md-medium-size-10 md-small-size-10 md-xsmall-size-100")
        li(v-for='call in calls', :key='call.recordId')
          md-list.md-double-line
            md-subheader Call
            md-list-item
              md-button.md-icon-button.md-list-action
                md-icon.md-primary phone
              .md-list-item-text
                span {{call.calleeName}}
                span {{moment(parseInt(call.startTime)).format('h:mm:ss a')}}
                span {{call.state}}
              md-button.md-icon-button.md-list-action
                md-icon phone
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
import { mapGetters } from 'vuex'
export default {
  name: 'session',
  data () {
    return {
      moment: Moment
    }
  },
  mounted () {
    // this.$kandyJS.getCallHistory()
    let m = Moment
    console.log(m)
  },
  computed: {
    ...mapGetters(['calls'])
  },
  methods: {

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
