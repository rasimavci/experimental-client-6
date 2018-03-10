<template lang='pug'>
#newMessage
  .dialog-new-message-container
    md-dialog(:md-active.sync='activeDialog')
      md-dialog-title Message to:
       md-field
        label search...
        md-input(v-model='search.criteria')
      ul
        li(v-for='contact in filtredContacts', :key='contact.entryId', @click='selectContact(contact)' ref='contactLi')
          contact-card(:contact='contact', :data-id='contact.primaryContact')
      md-dialog-actions
        md-button.md-primary(@click='activeDialog = false') Finish
  .messages-container
    md-toolbar.md-primary
      md-button.md-icon-button(to='/message')
          md-icon.fas.fa-angle-left
      h3.md-title(style='flex: 1')
        b {{selectedContacts.length > 0 ? selectedContacts[0].firstName + ' - ' + selectedContacts[0].lastName : ''}}
      md-button.md-icon-button(@click='activeDialog = true')
        md-icon.fas.fa-address-card
    .chat-div(v-for='message in filtredMessages', :key='message.timestamp', v-if='renderMessages')
      left-chat-bubble(:message='message', v-if='message.sender === conversationId', :contact='selectedContacts[0]')
      right-chat-bubble(:message='message', v-else)
  .bottombar.md-primary
    .md-layout
      .md-layout-item.md-size-70
        md-field
          label() Message
          md-input(v-model='message', @keyup.enter='sendMessage')
      .md-layout-item.md-size-10(@click='sendMessage', style='line-height: 50px;')
        md-icon.send-icon.far.fa-paper-plane
</template>
<script>
import NoImg from '../assets/img/noimage.jpg'
import ContactCard from './ContactCard'
import LeftChatBubble from './LeftChatBubble'
import RightChatBubble from './RightChatBubble'
import {mapGetters} from 'vuex'
export default {
  name: 'newMessage',
  data () {
    return {
      test: 5,
      activeDialog: false,
      message: '',
      renderMessages: false,
      selectedContacts: [],
      noImg: NoImg,
      search: {
        criteria: ''
      },
      conversationId: this.$route.params.id,
      contactSelected: false
    }
  },
  components: {
    contactCard: ContactCard,
    leftChatBubble: LeftChatBubble,
    rightChatBubble: RightChatBubble
  },
  computed: {
    ...mapGetters(['contacts', 'conversations']),
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
    },
    filtredMessages () {
      let resultArray = []
      for (let i = 0; i < this.conversations.length; i++) {
        if (this.conversations[i].conversationId === this.conversationId) {
          resultArray = this.conversations[i].messages
        }
      }
      this.$nextTick(() => {
        $('.messages-container').scrollTop($('.messages-container').height())
      })
      return resultArray
    },
    selectContacts () {
      let isSelected = false
      for (let i = 0; i < this.selectedContacts.length; i++) {
        for (let k = 0; k < this.contacts.length; k++) {
          if (parseInt(this.contacts[k].entryId) === parseInt(this.selectedContacts[i])) {
            isSelected = true
            break
          }
        }
      }
      return isSelected
    }
  },
  mounted () {
    if (this.$route.params.id === '-1') {
      this.activeDialog = true
      this.renderMessages = true
    } else this.getContactInfo()
  },
  methods: {
    getContactInfo () {
      let primaryContact = this.$route.params.id
      let contact = this.$_.find(this.contacts, c => {
        return c.primaryContact === primaryContact
      })
      contact.photoUrl = contact.photoUrl || this.noImg
      this.selectedContacts.push(this.$_.cloneDeep(contact))
      this.$nextTick(() => {
        this.renderMessages = true
      })
    },
    selectContact (contact) {
      this.selectedContacts = []
      debugger
      this.selectedContacts.push(contact)
      this.activeDialog = false
    },
    sendMessage () {
      let messageToSend = {
        userId: this.selectedContacts[0].primaryContact,
        type: 'text',
        text: this.message
      }
      this.message = ''
      this.$kandyJS.sendMessage(messageToSend)
    }
  }
}
</script>

<style scoped>
.messages-container{
  height: calc(100vh - 50px);
  overflow-y: scroll;
}
.messages-container ul{
  width: 400px;
}
.bottombar{
  height: 50px;
  width: 100vw;
  margin-left: 80px;
  background-color: #465A69;
}
.md-dialog ul{
  list-style-type: none;
  overflow-y: scroll;
  padding: 10px;
}
.md-dialog ul li{
  padding-bottom: 5px;
}
.selected-contact{
  background: lightsteelblue;
}
</style>
