<template lang='pug'>
#editNote
  .confirm-contaier
  .edit-note-container
    form.md-layout.md-gutter(novalidate='', @submit.prevent='validateNote')
      md-card.md-layout-item
        md-card-header
          .md-title Note
        md-card-content
          .md-layout.md-gutter
            .md-layout-item.md-small-size-100.md-xsmall-size-100
              md-field(:class="getValidationClass('date')")
                md-datepicker(v-model='note.date', :disabled='!editNote')
                span.md-error(v-if='!$v.note.date.required') The note title is required
            .md-layout-item.md-small-size-100.md-xsmall-size-100
              md-field(:class="getValidationClass('title')")
                md-input(name='note-title', v-model='note.title', placeholder='Note Title...', :disabled='!editNote')
                span.md-error(v-if='!$v.note.title.required') The note title is required
                span.md-error(v-else-if='!$v.note.title.minlength') Invalid note title
            .md-layout-item.md-small-size-100.md-xsmall-size-100
              md-field(:class="getValidationClass('description')")
                md-textarea(v-model='note.description', placeholder='Write the note here...', :disabled='!editNote')
                span.md-error(v-if='!$v.note.description.required') The note description is required
                span.md-error(v-else-if='!$v.note.description.minlength') Invalid note description
                md-icon description
          md-progress-bar(md-mode='indeterminate', v-if='sending')
          md-card-actions.button-selector
            md-button.md-primary(type='button', :disabled='sending', @click='editNote = !editNote', v-show='!editNote') Edit note
            md-button.md-primary(type='submit', :disabled='sending', v-show='editNote') Save note
            md-button.md-accent(type='button', :disabled='sending', @click='editNote = !editNote', v-show='editNote') Cancel
            md-button.md-accent(type='button', :disabled='sending', v-show='!editNote ', @click='deleteNote') Delete note
            md-button.color-green(type='button', :disabled='sending', @click='closeEdit') Close

</template>

<script>
import Moment from 'moment'
import {mapGetters} from 'vuex'
import { validationMixin } from 'vuelidate'
import {
  required,
  minLength
} from 'vuelidate/lib/validators'
export default {
  name: 'editNote',
  mixins: [validationMixin],
  props: {
    currentNote: {
      type: Object,
      required: true
    }
  },
  computed: {
    ...mapGetters([])
  },
  data () {
    return {
      editNote: false,
      sending: false,
      note: {
        date: Moment().format('YYYY/MM/DD'),
        title: null,
        description: null
      }
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
  mounted () {
    this.note = this.$_.cloneDeep(this.currentNote)
  },
  methods: {
    deleteNote () {
      this.$emit('deleteCurrentNote', this.note)
    },
    getValidationClass (fieldName) {
      const field = this.$v.note[fieldName]
      if (field) {
        return {
          'md-invalid': field.$invalid && field.$dirty
        }
      }
    },
    saveNote () {
      this.$emit('editCurrentNote', this.note)
    },
    validateNote () {
      this.$v.$touch()
      if (!this.$v.$invalid) {
        this.saveNote()
      }
    },
    closeEdit () {
      this.$emit('closeEdit')
    }
  }
}
</script>

<style scoped>

#editNote{
  height: 100vh;
  overflow-y: scroll;
}
.md-progress-bar {
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
}

.button-selector .md-warn{
  color: yellow;
}
.color-green{
  color: green;
}
.md-tooltip{
  z-index: 10;
}
</style>
