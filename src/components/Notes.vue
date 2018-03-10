<template lang='pug'>
  #history
    md-toolbar.md-primary(:md-elevation='1')
      h3.md-title(style='flex: 1') Notes
      md-icon.md-primary edit
    .call-history-container.md-layout.md-gutter.md-alignment-left
      md-textarea.v-model="textarea"
      md-button.md-primary(@click='addNote1') Add
      ul(class="md-layout-item md-size-50 md-medium-size-10 md-small-size-10 md-xsmall-size-100")
        li(v-for='note in notes', :key='note.recordId')
          md-list.md-double-line
            md-subheader Note
            md-list-item
              md-button.md-icon-button.md-list-action(@click='addNote')
                md-icon.md-primary done
              .md-list-item-text
                span {{note.text}}
                span {{moment(parseInt(note.startTime)).format('h:mm:ss a')}}
                span {{note.favorite}}
              md-button.md-icon-button.md-list-action(@click='toggleDialog(note)')
                md-icon create
              md-button.md-icon-button.md-list-action(@click='deleteNote1(note)')
                md-icon delete

    ul
      li(v-for='note in notes', :key='note.entryId', @click='toggleDialog(contact)')
        contact-card(:contact='contact')
    md-dialog(:md-active.sync='showDialog', @md-closed='closeEdit')
      edit-note(:currentContact='currentContact', @closeEdit='closeEdit', :isNew='isNew')

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
import { mapGetters, mapActions } from 'vuex'
import EditNote from './EditNote'

export default {
  name: 'session',
  data () {
    return {
      moment: Moment,
      currentContact: {},
      textarea: true,
      showDialog: false
    }
  },
  components: {
    editNote: EditNote
  },
  mounted () {
    // this.$kandyJS.getCallHistory()
    let m = Moment
    console.log(m)
    debugger
  },
  methods: {
    ...mapActions(['updateActiveNote', 'addNote', 'editNote', 'deleteNote']),
    addNote1 () {
      this.addNote()
    },
    editNote1 (note) {
      this.editNote(note)
      note = this.activeNoteText
    },
    deleteNote1 (note) {
      this.deleteNote(note)
      note = this.activeNoteText
    },
    closeEdit () {
      this.isNew = false
      this.showDialog = false
    },
    toggleDialog (note) {
      this.currentContact = note
      this.$nextTick(() => {
        this.showDialog = true
      })
    }
  },
  computed: {
    ...mapGetters(['notes', 'activeNoteText'])
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
