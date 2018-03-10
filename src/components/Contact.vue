<template lang='pug'>
#contact
  .toolbar-container
    md-toolbar.md-large.md-dense.md-primary(md-elevation='1')
      .md-toolbar-row
        .md-toolbar-section-start
          h3.md-title(style='flex: 1') Contacts
        .md-toolbar-section-end
          md-button.md-accent Refresh status
          md-button.md-primary(@click='newContact') Add contact
      .md-toolbar-row
        .md-layout#secondRow
          .md-layout-item.md-size-40
            md-field
              label search...
              md-input(v-model='search.criteria')
  .contact-container
    ul
      li(v-for='contact in filtredContacts', :key='contact.entryId', @click='toggleDialog(contact)')
        contact-card(:contact='contact')
    md-dialog(:md-active.sync='showDialog', @md-closed='closeEdit')
      edit-contact(:currentContact='currentContact', @closeEdit='closeEdit', :isNew='isNew')
</template>

<script>
import {mapGetters} from 'vuex'
import EditContact from './EditContact'
import ContactCard from './ContactCard'
export default {
  name: 'contact',
  data () {
    return {
      search: {
        filter: '',
        criteria: ''
      },
      showDialog: false,
      currentContact: {},
      isNew: false
    }
  },
  components: {
    editContact: EditContact,
    contactCard: ContactCard
  },
  mounted () {
  },
  computed: {
    ...mapGetters(['contacts']),
    filtredContacts () {
      let resultArray = []
      if (this.search.criteria !== '') {
        for (let i = 0; i < this.contacts.length; i++) {
          let find = false
          if (this.contacts[i].firstName.toLowerCase().indexOf(this.search.criteria.toLowerCase()) > -1) find = true
          else if (this.contacts[i].lastName.toLowerCase().indexOf(this.search.criteria.toLowerCase()) > -1) find = true
          else if (this.contacts[i].nickname.toLowerCase().indexOf(this.search.criteria.toLowerCase()) > -1) find = true
          else if (this.contacts[i].primaryContact.toLowerCase().indexOf(this.search.criteria.toLowerCase()) > -1) find = true
          if (find) resultArray.push(this.contacts[i])
        }
        return resultArray
      } else {
        return this.contacts
      }
    }
  },
  methods: {
    newContact () {
      this.isNew = true
      this.$nextTick(() => {
        this.showDialog = true
      })
    },
    editContact () {
      this.isNew = false
      this.$nextTick(() => {
        this.showDialog = true
      })
    },
    closeEdit () {
      this.isNew = false
      this.showDialog = false
    },
    toggleDialog (contact) {
      this.currentContact = contact
      this.$nextTick(() => {
        this.showDialog = true
      })
    },
    touchHandler (contact) {
      return () => {
        console.log('tap tap tap')
      }
    }
  }
}
</script>

<style scoped>
#contact{
  height: 100vh;
  overflow-y: scroll;
}
ul {
  list-style-type: none;
  min-width: 300px;
  width: 90%;
}
.md-card{
  /* min-width: 300px;
  width: 50%; */
  margin-bottom: 20px;
}
.md-dialog{
  width: 100%;
}
#secondRow{
  width: 100vw;
}
</style>
