<template lang='pug'>
#message
  .messages-container
    md-toolbar.md-primary
      h3.md-title(style='flex: 1') Messages
      md-button.md-icon-button(@click='newMessage')
        md-icon.fas.fa-plus-circle
    .contacts-messages-container.md-layout
      ul.md-layout-item.md-size-40.md-medium-size-60.md-small-size-80.md-xsmall-size-100
        li(v-for='contacts in filtredContacts', :key='contacts.contact.entryId', @click='showMessages(contacts.contact)' ref='contactLi')
          contact-card(:contact='contacts.contact', :lastMessage='contacts.lastMessage',:data-id='contacts.contact.primaryContact')
</template>

<script>
import ContactCard from './ContactCard'
import {mapGetters} from 'vuex'
export default {
  name: 'message',
  components: {
    contactCard: ContactCard
  },
  computed: {
    ...mapGetters(['conversations', 'contacts']),
    filtredContacts () {
      let resultArray = []
      for (let i = 0; i < this.conversations.length; i++) {
        for (let k = 0; k < this.contacts.length; k++) {
          if (this.conversations[i].conversationId === this.contacts[k].primaryContact) {
            let last = this.$_.last(this.conversations[i].messages)
            resultArray.push({contact: this.contacts[k], lastMessage: last.parts[0].text})
          }
        }
      }
      return resultArray
    }
  },
  methods: {
    showMessages (contact) {
      console.log(contact)
      this.$router.push('/newMessage/' + contact.primaryContact)
    },
    newMessage () {
      this.$router.push('/newMessage/-1')
    }
  }
}
</script>

<style scoped>
.messages-container{
  height: calc(100vh - 50px);
  overflow-y: scroll;
}

ul{
  list-style-type: none;
  overflow-y: scroll;
  padding: 10px;
}
ul li{
  padding: 10px;
}
</style>
