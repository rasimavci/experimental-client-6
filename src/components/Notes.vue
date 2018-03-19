<template lang='pug'>
  #notes
    .dialog-container
      md-dialog(:md-active.sync='showDialog', @md-closed='closeEdit')
        edit-note(:currentNote='currentNote', @closeEdit='closeEdit', @editCurrentNote='editNote', @deleteCurrentNote='removeNote')
    md-toolbar.md-primary(:md-elevation='1')
      h3.md-title(style='flex: 1') Notes
      md-icon.md-primary event
    .notes-container
      form.md-layout.md-gutter.md-size-100(novalidate='', @submit.prevent='validateNote')
        .md-layout-item.md-small-size-100.md-xsmall-size-100
          md-field(:class="getValidationClass('date')")
            md-datepicker(v-model='note.date')
            span.md-error(v-if='!$v.note.date.required') The note title is required
        .md-layout-item.md-small-size-100.md-xsmall-size-100
          md-field(:class="getValidationClass('title')")
            md-input#note-title(name='note-title', v-model='note.title', placeholder='Note Title...')
            span.md-error(v-if='!$v.note.title.required') The note title is required
            span.md-error(v-else-if='!$v.note.title.minlength') Invalid note title
        .md-layout-item.md-small-size-100.md-xsmall-size-100
          md-field(:class="getValidationClass('description')")
            md-textarea(v-model='note.description', placeholder='Write the note here...')
            span.md-error(v-if='!$v.note.description.required') The note description is required
            span.md-error(v-else-if='!$v.note.description.minlength') Invalid note description
            md-icon description
        md-button.md-primary(type='submit') Add
      ul.md-layout
        li(v-for='notes, key in groupedNotes')
          md-card
            md-card-content
              h3 {{moment(key).format("MMM Do YY")}}
          md-list.md-double-line(v-for='note in notes', :key='note.id')
            md-subheader {{note.title}}
            md-list-item
              md-button.md-icon-button.md-list-action()
                md-icon.md-primary event
              .md-list-item-text
                span {{moment(note.date).format('MMMM Do YYYY')}}
                span {{moment(note.date).format('h:mm:ss a')}}
                span {{note.favorite}}
              md-button.md-icon-button.md-list-action(@click='toggleDialog(note)')
                md-icon create
              md-button.md-icon-button.md-list-action(@click='removeNote(note)')
                md-icon delete
</template>

<script>
import NotesService from '../NotesService'
import Moment from 'moment'
import { mapGetters, mapActions } from 'vuex'
import { validationMixin } from 'vuelidate'
import {
  required,
  minLength
} from 'vuelidate/lib/validators'
import EditNote from './EditNote'
export default {
  name: 'notes',
  mixins: [validationMixin],
  data () {
    return {
      note: {
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
      currentNote: {},
      showDialog: false
    }
  },
  validations: {
    note: {
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
    editNote: EditNote
  },
  mounted () {
    this.setNotes(this.$_.cloneDeep(NotesService.getNotes()))
  },
  methods: {
    ...mapActions(['setNotes']),
    validateNote () {
      this.$v.$touch()
      if (!this.$v.$invalid) {
        this.saveNote()
      }
    },
    getValidationClass (fieldName) {
      const field = this.$v.note[fieldName]
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
    saveNote () {
      let id = 0
      let _notes = this.$_.sortBy(this.notes, t => { return t.id })
      if (_notes.length > 0) {
        id = this.$_.last(_notes).id + 1
      }
      const newNote = {
        id: id,
        title: this.note.title,
        description: this.note.description,
        reminder: false,
        date: Moment(this.note.date).format('YYYY/MM/DD'),
        startTime: Moment(this.note.date).format('YYYY/MM/DD'),
        alert: this.alert
      }
      NotesService.saveNote(newNote)
      this.setNotes(this.$_.cloneDeep(NotesService.getNotes()))
    },
    editNote (note) {
      NotesService.saveNote(note)
      this.setNotes(this.$_.cloneDeep(NotesService.getNotes()))
      this.closeEdit()
    },
    removeNote (note) {
      NotesService.deleteNote(note.id)
      this.setNotes(this.$_.cloneDeep(NotesService.getNotes()))
    },
    closeEdit () {
      this.showDialog = false
    },
    toggleDialog (note) {
      this.currentNote = this.$_.cloneDeep(note)
      this.$nextTick(() => {
        this.showDialog = true
      })
    }
  },
  computed: {
    ...mapGetters(['notes']),
    groupedNotes () {
      return this.$_.groupBy(this.notes, 'date')
    }
  }
}
</script>

<style scoped>
#notes {
  height: 100vh;
  overflow-y: scroll;
}
.notes-container{
  padding-left: 5px;
  padding-right: 5px;
}
.notes-container > ul {
  list-style-type: none;
}

li {
  list-style-type: none;
}
</style>
