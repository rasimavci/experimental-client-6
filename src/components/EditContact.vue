<template lang='pug'>
#editContact
  .confirm-contaier
    //- md-dialog-confirm(:md-active.sync='active', md-title='Warning', md-content='You are currently editing a user, if you leave now your <b>changes will be lost!</b>', md-confirm-text='Agree', md-cancel-text='Disagree', @md-cancel='onCancel', @md-confirm='onConfirm')
    //- md-dialog-confirm(:md-active.sync='activeConfirmDelete', md-title='Warning', md-content='Delete contact?', md-confirm-text='Yes', md-cancel-text='No', @md-cancel='onDeleteContactCancel', @md-confirm='onDeleteContactConfirm')
  .edit-contact-container
    form.md-layout.md-gutter(novalidate='', @submit.prevent='validateUser')
      md-card.md-layout-item
        md-card-header
          .md-title(v-if='!editUser && !isNew') Contact Info
          .md-title(v-else)
            | {{formTitle}}
          md-speed-dial.md-top-right(md-direction='bottom', v-if='!isNew')
            md-speed-dial-target(class="md-primary")
              md-icon.md-morph-initial add
              md-icon.md-morph-final.fas.fa-list-ul
            md-speed-dial-content
              md-button.md-icon-button
                md-tooltip(md-direction='left') Start phone call
                md-icon.fas.fa-phone
              md-button.md-icon-button()
                md-tooltip(md-direction='left') Start video call
                md-icon.fas.fa-video
              md-button.md-icon-button
                md-tooltip(md-direction='left') Start screen share
                md-icon.fas.fa-desktop
              md-button.md-icon-button
                md-tooltip(md-direction='left') Start chat
                md-icon.fas.fa-comments
        md-card-content
          .md-layout.md-gutter
            .md-layout-item.md-small-size-100.md-xsmall-size-100
              md-field(:class="getValidationClass('firstName')")
                label(for='first-name') First Name
                md-input#first-name(name='first-name', autocomplete='given-name', v-model='contact.firstName', :disabled='sending || !editUser && !isNew')
                  span.md-error(v-if='!$v.contact.firstName.required') The first name is required
                  span.md-error(v-else-if='!$v.contact.firstName.minlength') Invalid first name
            .md-layout-item.md-small-size-100.md-xsmall-size-100
              md-field(:class="getValidationClass('lastName')")
                label(for='last-name') Last Name
                md-input#last-name(name='last-name', autocomplete='family-name', v-model='contact.lastName', :disabled='sending || !editUser && !isNew')
                  span.md-error(v-if='!$v.contact.lastName.required') The last name is required
                  span.md-error(v-else-if='!$v.contact.lastName.minlength') Invalid last name
          .md-layout.md-gutter
            .md-layout-item.md-small-size-100.md-xsmall-size-100
              md-field(:class="getValidationClass('primaryContact')")
                label(for='primary-contact') Primary Contact
                md-input#last-name(name='primary-contact', autocomplete='primaryContact', v-model='contact.primaryContact', :disabled='sending || !editUser && !isNew')
                  span.md-error(v-if='!$v.contact.primaryContact.required') The primary contact is required
                  span.md-error(v-else-if='!$v.contact.primaryContact.minlength') Invalid primary contact
            .md-layout-item.md-small-size-100.md-xsmall-size-100
              md-field(:class="getValidationClass('nickname')")
                label(for='nickname') Nickname
                md-input#last-name(name='nickname', autocomplete='nickname', v-model='contact.nickname', :disabled='sending || !editUser && !isNew')
                  span.md-error(v-if='!$v.contact.nickname.required') The nickname is required
                  span.md-error(v-else-if='!$v.contact.nickname.minlength') Invalid nickname
          .md-layout.md-gutter
            .md-layout-item.md-small-size-33.md-xsmall-size-100
              md-field(:class="getValidationClass('mobilePhone')")
                label(for='mobile-phone') Mobile Phone
                md-input#last-name(name='mobile-phone', autocomplete='mobile-phone', v-model='contact.mobilePhone', :disabled='sending || !editUser && !isNew')
                  span.md-error(v-if='!$v.contact.mobilePhone.minlength') Invalid mobile phone
            .md-layout-item.md-small-size-33.md-xsmall-size-100
              md-field(:class="getValidationClass('workPhone')")
                label(for='work-phone') Work Phone
                md-input#last-name(name='work-phone', autocomplete='work-phone', v-model='contact.workPhone', :disabled='sending || !editUser && !isNew')
                  span.md-error(v-if='!$v.contact.workPhone.minlength') Invalid work phone
            .md-layout-item.md-small-size-33.md-xsmall-size-100
              md-field(:class="getValidationClass('homePhone')")
                label(for='home-phone') Home Phone
                md-input(name='home-phone', autocomplete='home-phone', v-model='contact.homePhone', :disabled='sending || !editUser && !isNew')
                  span.md-error(v-if='!$v.contact.homePhone.minlength') Invalid home phone
          .md-layout.md-gutter
            .md-layout-item.md-small-size-100.md-xsmall-size-100
              md-field(:class="getValidationClass('emailAddress')")
                label(for='email-address') Email Address
                md-input#email(type='email', name='email-address', autocomplete='email-address', v-model='contact.emailAddress', :disabled='sending || !editUser && !isNew')
                  span.md-error(v-if='!$v.contact.emailAddress') Invalid email address
            .md-layout-item.md-small-size-100.md-xsmall-size-100
                md-field(:class="getValidationClass('fax')")
                  label(for='fax') Fax
                  md-input(name='fax', autocomplete='fax', v-model='contact.fax', :disabled='sending || !editUser && !isNew')
                    span.md-error(v-if='!$v.contact.fax.minlength') Invalid fax
          .md-layout.md-gutter
            .md-layout-item.md-small-size-100.md-xsmall-size-100
              md-field(:class="getValidationClass('pager')")
                label(for='pager') Pager
                md-input#pager(name='pager', autocomplete='', v-model='contact.pager', :disabled='sending || !editUser && !isNew')
                  span.md-error(v-if='!$v.contact.pager') Invalid pager
            .md-layout-item.md-small-size-100.md-xsmall-size-100
              md-switch.md-primary(v-model='contact.friendStatus') Friend Status: {{contact.friendStatus? 'Friend': 'Not Friend'}}
          md-progress-bar(md-mode='indeterminate', v-if='sending')
          md-card-actions.button-selector
            md-button.md-primary(type='button', :disabled='sending', @click='editUser = !editUser', v-show='!editUser && !isNew') Edit contact
            md-button.md-primary(type='submit', :disabled='sending', v-show='editUser || isNew') Save contact
            md-button.md-accent(type='button', :disabled='sending', @click='editUser = !editUser', v-show='editUser') Cancel
            md-button.md-accent(type='button', :disabled='sending', v-show='!editUser && !isNew', @click='activeConfirmDelete = true') Delete contact
            md-button.color-green(type='button', :disabled='sending', @click='closeEdit') Close
      md-snackbar(:md-active.sync='userSaved') The user {{ lastUser }} was saved with success!
</template>

<script>
import {mapGetters} from 'vuex'
import { validationMixin } from 'vuelidate'
import {
  required,
  minLength,
  email
} from 'vuelidate/lib/validators'
export default {
  name: 'editContact',
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
    ...mapGetters(['contacts'])
  },
  data () {
    return {
      contact: {
        id: null,
        firstName: null,
        lastName: null,
        nickname: null,
        mobilePhone: null,
        userId: null,
        username: null,
        emailAddress: null,
        homePhone: null,
        workPhone: null,
        fax: null,
        pager: null,
        friendStatus: false,
        primaryContact: null
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
      },
      lastName: {
        required,
        minLength: minLength(3)
      },
      nickname: {
        required,
        minLength: minLength(3)
      },
      mobilePhone: {
        minLength: minLength(3)
      },
      workPhone: {
        minLength: minLength(3)
      },
      homePhone: {
        minLength: minLength(3)
      },
      fax: {
        minLength: minLength(3)
      },
      pager: {
        minLength: minLength(3)
      },
      primaryContact: {
        required,
        primaryContact: minLength(3)
      },
      emailAddress: {
        email
      }
    }
  },
  mounted () {
    if (!this.isNew) {
      this.formTitle = 'Edit Contact'
      this.contact.id = this.currentContact.entryId
      this.contact.primaryContact = this.currentContact.primaryContact ? this.currentContact.primaryContact : ''
      this.contact.firstName = this.currentContact.firstName ? this.currentContact.firstName : ''
      this.contact.lastName = this.currentContact.firstName ? this.currentContact.firstName : ''
      this.contact.nickname = this.currentContact.nickname ? this.currentContact.nickname : ''
      this.contact.userId = this.currentContact.primaryContact ? this.currentContact.primaryContact : ''
      this.contact.username = this.currentContact.primaryContact ? this.currentContact.primaryContact : ''
      this.contact.emailAddress = this.currentContact.emailAddress ? this.currentContact.emailAddress : ''
      this.contact.mobilePhone = this.currentContact.mobilePhone ? this.currentContact.mobilePhone : ''
      this.contact.workPhone = this.currentContact.workPhone ? this.currentContact.workPhone : ''
      this.contact.homePhone = this.currentContact.homePhone ? this.currentContact.homePhone : ''
      this.contact.fax = this.currentContact.fax ? this.currentContact.fax : ''
      this.contact.friendStatus = this.currentContact.friendStatus
      this.contact.pager = this.currentContact.pager ? this.currentContact.pager : ''
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

#editContact{
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
