<template lang='pug'>
.calling-component-container
  .md-layout.md-alignment-bottom-center
    .md-layout-item.md-size-100
      .video-container(v-if='callOptions.isVideoEnabled')
        .md-layout
          .md-layout-item.md-size-49
            #localVideoContainer
          .md-layout-item.md-size-49
            #remoteVideoContainer
    .md-layout-item.md-size-100.bounceInDown.animated
      .contact-img-container
        img(:src='contact.photoUrl || noImg', alt='contact img')
    .md-layout-item.md-size-100.empty-row
    .md-layout-item.md-size-20.fadeInLeftBig.animated
      button.btn.fadeInLeftBig.animated(@click='shareScreen')
        i.fas.fa-desktop
    .md-layout-item.md-size-20.fadeInLeftBig.animated
      button.btn.fadeInLeftBig.animated(@click='muteCall')
        i.fas.fa-microphone-slash
    .md-layout-item.md-size-20.fadeInRightBig.animated
      button.btn.fadeInRightBig.animated(@click='cutSpeaker')
        i.fas.fa-volume-up
    .md-layout-item.md-size-20.fadeInRightBig.animated
      button.btn.fadeInRightBig.animated(@click='holdCall')
        i.fas.fa-pause
    .md-layout-item.md-size-20.fadeInRightBig.animated
      button.btn.fadeInRightBig.animated(@click='videoCall')
        i.fas.fa-video
    .md-layout-item.md-size-100.empty-row
    .md-layout-item.md-size-50.bounceInUp.animated.end-call-button
      button.btn#endButton(@click='endCall')
        i.fa.fa-phone
</template>

<script>
import NoImg from '../assets/img/noimage.jpg'
import ContactCard from './ContactCard'
import { mapGetters } from 'vuex'
export default {
  name: 'keypad',
  props: {
    contact: {
      type: Object,
      required: false
    }
  },
  data () {
    return {
      noImg: NoImg
    }
  },
  computed: {
    ...mapGetters(['contacts', 'dialValue', 'callOptions']),
    filtredContacts () {
      if (this.dialValue.length < 2) return
      let vm = this
      let result = []
      for (let i = 0; i < this.contacts.length; i++) {
        let name = this.contacts[i].firstName ? this.contacts[i].firstName : '' + this.contacts[i].lastName ? this.contacts[i].lastName : ''
        let phone = this.contacts[i].workPhone ? this.contacts[i].workPhone : this.contacts[i].workPhone || this.contacts[i].mobilePhone ? this.contacts[i].mobilePhone : ''
        if (name.toLowerCase().indexOf(vm.dialValue.toLowerCase()) > -1 || phone.indexOf(vm.dialValue) > -1) result.push(this.contacts[i])
      }
      return result
    }
  },
  components: {
    contactCard: ContactCard
  },
  mounted () {

  },
  methods: {
    contactClick (contact) {
      this.$emit('contactClick', contact)
    },
    shareScreen () {
      if (this.callingButtons.screenShare) {
        this.$kandyJS.stopScreenshare()
      } else {
        this.screenShareOptions.localVideoContainer = document.getElementById('localShareScreenContainer')
        this.screenShareOptions.remoteVideoContainer = document.getElementById('remoteShareScreenContainer')
        this.$kandyJS.startScreenshare(this.screenShareOptions)
      }
      this.callingButtons.screenShare = !this.callingButtons.screenShare
    },
    muteCall () {

    },
    cutSpeaker () {

    },
    holdCall () {

    },
    videoCall () {

    },
    endCall () {
      this.$emit('endCall')
    }
  }
}
</script>

<style scoped>
#localVideoContainer, #remoteVideoContainer{
  height: 200px;
}
.contact-img-container img {
  width: 80px;
  border-radius: 40px;
}
.calling-component-container{
  background:#30414D;
  transition: width .4s ease-in-out 0s;
  overflow-y: scroll;
}
.calling-component-container > .md-layout{
  height: 100vh;
}
.md-layout-item{
  text-align: center;
}
.md-layout-item button{
  border-radius: 25px;
  height: 50px;
  width: 50px;
}
.empty-row{
  height: 50px;
}
.end-call-button button{
  background-color: red;
  color: white;
  font-size: 25px;
}
</style>
