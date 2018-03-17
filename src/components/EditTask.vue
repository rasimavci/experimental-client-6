<template lang='pug'>
#editTask
  .confirm-contaier
    //- md-dialog-confirm(:md-active.sync='active', md-title='Warning', md-content='You are currently editing a user, if you leave now your <b>changes will be lost!</b>', md-confirm-text='Agree', md-cancel-text='Disagree', @md-cancel='onCancel', @md-confirm='onConfirm')
    //- md-dialog-confirm(:md-active.sync='activeConfirmDelete', md-title='Warning', md-content='Delete contact?', md-confirm-text='Yes', md-cancel-text='No', @md-cancel='onDeleteContactCancel', @md-confirm='onDeleteContactConfirm')
  .edit-task-container
    form.md-layout.md-gutter(novalidate='', @submit.prevent='validateUser')
      md-card.md-layout-item
        md-card-header
          .md-title(v-if='!editUser && !isNew') Your Task
          .md-title(v-else)
            | {{formTitle}}
        md-card-content
          .md-layout.md-gutter
            .md-layout-item.md-small-size-100.md-xsmall-size-100
              md-field(:class="getValidationClass('firstName')")
              md-field
                md-icon event
                md-input(v-model='taskDate')
              md-field
                md-input(v-model='taskTitle')
                md-checkbox(v-model="alert")
              md-field
                md-textarea(v-model='textarea')
                md-icon description
          md-progress-bar(md-mode='indeterminate', v-if='sending')
          md-card-actions.button-selector
            md-button.md-primary(type='button', :disabled='sending', @click='editUser = !editUser', v-show='!editUser && !isNew') Edit task
            md-button.md-primary(type='submit', :disabled='sending', v-show='editUser || isNew') Save task
            md-button.md-accent(type='button', :disabled='sending', @click='editUser = !editUser', v-show='editUser') Cancel
            md-button.md-accent(type='button', :disabled='sending', v-show='!editUser && !isNew', @click='activeConfirmDelete = true') Delete task
            md-button.color-green(type='button', :disabled='sending', @click='closeEdit') Close

</template>

<script>
import {mapGetters} from 'vuex'
import { validationMixin } from 'vuelidate'
import {
  required,
  minLength
} from 'vuelidate/lib/validators'
export default {
  name: 'editTask',
  mixins: [validationMixin],
  props: {
    currentContact: {
      type: Object,
      required: true
    },
    isNew: {
      type: Boolean,
      required: true
    }
  },
  computed: {
    ...mapGetters(['contacts', 'tasks', 'activeTask'])
  },
  data () {
    return {
      firstname: 'deneme',
      taskDate: '1520692473',
      taskTitle: 'Task Title',
      textarea: 'Write the task here',
      alert: false,
      contact: {
        id: null,
        firstName: null
      },
      userSaved: false,
      sending: false,
      lastUser: null,
      editUser: false,
      deleteUser: false,
      active: false,
      activeConfirmDelete: false,
      formTitle: 'Add Contact'
    }
  },
  validations: {
    contact: {
      firstName: {
        required,
        minLength: minLength(3)
      }
    }
  },
  mounted () {
    if (!this.isNew) {
      this.formTitle = 'Edit Task'
      this.contact.id = this.currentContact.entryId
      this.contact.primaryContact = this.currentContact.primaryContact ? this.currentContact.primaryContact : ''
      this.contact.firstName = this.currentContact.firstName ? this.currentContact.firstName : ''
    }
  },
  methods: {
    onDeleteContactCancel () {
      this.activeConfirmDelete = false
    },
    onDeleteContactConfirm () {
      this.deleteContact()
      this.activeConfirmDelete = false
    },
    deleteContact () {
      debugger
      this.$kandyJS.removeContact(this.contact.nickname)
    },
    getValidationClass (fieldName) {
      const field = this.$v.contact[fieldName]
      if (field) {
        return {
          'md-invalid': field.$invalid && field.$dirty
        }
      }
    },
    clearForm () {
      this.$v.$reset()
      this.contact.id = null
      this.contact.firstName = null
      this.contact.lastName = null
      this.contact.nickname = null
      this.contact.userId = null
      this.contact.username = null
      this.contact.emailAddress = null
      this.contact.mobilePhone = null
      this.contact.homePhone = null
      this.contact.workPhone = null
      this.contact.fax = null
      this.contact.pager = null
      this.contact.friendStatus = null
      this.contact.primaryContact = null
    },
    saveUser () {
      this.sending = true
      if (this.isNew) {
        this.contact.id = this.contacts.length
        this.contact.userId = this.contact.primaryContact
        this.contact.username = this.contact.nickname
        this.$kandyJS.addContact(this.$_.cloneDeep(this.contact))
      } else {
        // nick y objeto
        this.contact.id = btoa(this.currentContact.nickname)
        this.$kandyJS.updateContact(this.currentContact.nickname, this.contact)
      }
      setTimeout(() => {
        this.lastUser = `${this.contact.firstName} ${this.contact.lastName}`
        this.userSaved = true
        this.sending = false
        this.clearForm()
        this.$emit('closeEdit')
      }, 1500)
    },
    validateUser () {
      this.$v.$touch()
      if (!this.$v.$invalid) {
        this.saveUser()
      }
    },
    closeEdit () {
      this.$emit('closeEdit')
      // if (this.editUser || this.isNew) {
      //   this.active = true
      // } else {
      //   this.$emit('closeEdit')
      // }
    },
    onCancel () {
      console.log('no cerrar')
    },
    onConfirm () {
      this.$v.$reset()
      this.$emit('closeEdit')
      console.log('cerrar sin guardar')
    }
  }
}
</script>

<style scoped>

#editTask{
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
