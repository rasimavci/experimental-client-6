/*eslint-env jquery*/
<template lang='pug'>
  #modalNewCall.modal-mask
    .close-container(@click='closeModal')
      i.fas.fa-times
    .md-layout.call-modal-container
      .md-layout-item.md-size-45.md-xsmall-hide.v-align.calling-hide-desktop(style='margin-right: 0;')
        keypadContacts(@contactClick='selectContact', mobileHeight='600px')
      .md-layout-item.md-size-100.v-align.show-mobile.calling-hide-mobile
        keypadContacts(mobileHeight='140px' @contactClick='selectContact')
      .md-layout-item.md-size-45.md-xsmall-size-100.v-align.keypad-mobile.calling-hide(style='margin-left: 0;')
        keypad(:onCallClick='call')
      .md-layout-item.md-size-90.md-xsmall-size-100.v-align.calling-show
        calling-component(@endCall='endCall', :contact='callingContact')
</template>

<script>
import Keypad from './Keypad'
import KeypadContacts from './KeypadContacts'
import CallingComponent from './CallingComponent'
import { mapActions, mapGetters, mapMutations } from 'vuex'
export default {
  name: 'newCallModal',
  data () {
    return {
      audio: {
        ringing: new Audio('./static/sounds/ringing.mp3')
      },
      dialValue1: '',
      noImg: 'http://voice4thought.org/wp-content/uploads/2016/08/default1.jpg',
      callingContact: {
        img: '',
        name: '',
        number: '',
        primaryContact: ''
      },
      screenShareOptions: {
        isAudioEnabled: false,
        isVideoEnabled: false,
        sendInitialVideo: false,
        sendScreenShare: false,
        videoResolution: { height: 200, width: 200 },
        localVideoContainer: null,
        remoteVideoContainer: null
      },
      callingButtons: {
        screenShare: false,
        mute: false,
        speaker: false,
        hold: false,
        video: false
      }
    }
  },
  components: {
    keypad: Keypad,
    keypadContacts: KeypadContacts,
    callingComponent: CallingComponent
  },
  computed: {
    ...mapGetters(['contacts', 'callOptions'])
  },
  methods: {
    ...mapActions(['toggleNewCallModal']),
    ...mapMutations(['RINGING_SOUND', 'SET_CALL_OPTIONS', 'CHANGE_DIAL_VALUE']),
    closeModal () {
      this.toggleNewCallModal()
    },
    selectContact (contact) {
      this.callingContact = this.$_.cloneDeep(contact)
      let tmpValue = contact.mobilePhone || contact.workPhone || contact.homePhone
      this.CHANGE_DIAL_VALUE(tmpValue)
      $('.show-mobile').css('display') === 'block' ? $('.calling-hide-mobile').fadeOut() : $('.calling-hide-desktop').fadeOut()
      $('.calling-hide').fadeOut()
      $('.calling-show').fadeIn()
      this.call(false)
    },
    call (isVideoCall) {
      if (isVideoCall) {
        this.SET_CALL_OPTIONS([{key: 'isVideoEnabled', value: true}])
        this.$nextTick(() => {
          let options = [{key: 'localVideoContainer', value: document.getElementById('localVideoContainer')},
            {key: 'remoteVideoContainer', value: document.getElementById('remoteVideoContainer')}
          ]
          this.SET_CALL_OPTIONS(options)
        })
      }
      this.$kandyJS.makeCall(this.callingContact.primaryContact)
    },
    endCall () {
      $('.show-mobile').css('display') === 'block' ? $('.calling-hide-mobile').fadeIn() : $('.calling-hide-desktop').fadeIn()
      $('.calling-hide').fadeIn()
      $('.calling-show').fadeOut()
    }
  }
}
</script>

<style scoped>
.call-modal-container{
  height: 100vh;
}
.v-align{
  margin: auto;
}
.show-mobile{
  display: block;
  height: 140px;
  margin-bottom: 0;
}
.keypad-mobile{
  margin-top: 0;
}
.calling-show{
  display: none;
}
.close-container{
  position: absolute;
  z-index: 9998;
  color: white;
  font-size: 30px;
  right: 5px;
  top: 5px;
}
.close-container:hover{
  cursor: pointer;
}
@media (min-width: 600px) {
  .show-mobile{
    display: none;
  }
  .keypad-mobile{
    margin-top: auto;
  }
}
</style>
