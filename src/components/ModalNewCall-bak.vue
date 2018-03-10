/*eslint-env jquery*/
<template lang='pug'>
  #modalNewCall.modal-mask(@click='closeModal')
    .modal-container
      .video-container(:class='{ active: callOptions.isVideoEnabled}')
        #localVideoContainer(v-if='callOptions.isVideoEnabled')
        #remoteVideoContainer(v-if='callOptions.isVideoEnabled')
      .dial-pad-wrap
        .left-pan
          .contacts
            .title Contacts
            div(v-for='contact in filtredContacts', :key='contact.entryId')
              md-menu(md-direction='bottom-start')
                md-button#peopleButton(md-menu-trigger='')
                  .people.clearfix
                    .photo.pull-left
                      img(:src='contact.photoUrl || noImg')
                    .info.pull-left
                      .name
                        span.full-name {{contact.firstName}} {{contact.lastName}} ({{contact.nickname}})
                      .phone
                        span.number {{contact.mobilePhone || contact.workPhone}}
                md-menu-content
                  md-menu-item(@click='call(contact, false)') Audio Call
                  md-menu-item(@click='call(contact, true)') Video Call
          .calling
            .photo.bounceInDown.animated
              img(:src='callingContact.img', alt='contact img')
            .name.rubberBand.animated {{callingContact.name}}
            .number {{callingContact.number}}
            .action
              .call-share-screen
                button.btn.fadeInLeftBig.animated(:class='{ active: callingButtons.shareScreen}', @click='shareScreen')
                  i.fas.fa-desktop
              .call-mute
                button.btn.fadeInLeftBig.animated(@click='muteCall')
                  i.fas.fa-microphone-slash
              .call-volume
                button.btn.fadeInLeftBig.animated(@click='cutSpeaker')
                  i.fas.fa-volume-up
              .call-hold
                button.btn.fadeInRightBig.animated(@click='holdCall')
                  i.fas.fa-pause
              .call-video
                button.btn.fadeInRightBig.animated(@click='videoCall')
                  i.fas.fa-video
            .call-end.bounceInUp.animated(@click='endCall')
              button.btn#endButton
                i.fa.fa-phone
        .dial-pad
          md-field
            label Enter name or number...
            md-input(v-model='dialValue', @keyup='filter')
          .dial-table()
            .dial-table-row
              .dial-table-col
                .dial-key-wrap(data-key='1', @click='keypad')
                  .dial-key 1
                  .dial-sub-key
              .dial-table-col
                .dial-key-wrap(data-key='2', @click='keypad')
                  .dial-key 2
                  .dial-sub-key abc
              .dial-table-col
                .dial-key-wrap(data-key='3', @click='keypad')
                  .dial-key 3
                  .dial-sub-key def
            .dial-table-row
              .dial-table-col
                .dial-key-wrap(data-key='4', @click='keypad')
                  .dial-key 4
                  .dial-sub-key ghi
              .dial-table-col
                .dial-key-wrap(data-key='5', @click='keypad')
                  .dial-key 5
                  .dial-sub-key jkl
              .dial-table-col
                .dial-key-wrap(data-key='6', @click='keypad')
                  .dial-key 6
                  .dial-sub-key mno
            .dial-table-row
              .dial-table-col
                .dial-key-wrap(data-key='7', @click='keypad')
                  .dial-key 7
                  .dial-sub-key pqrs
              .dial-table-col
                .dial-key-wrap(data-key='8', @click='keypad')
                  .dial-key 8
                  .dial-sub-key tuv
              .dial-table-col
                .dial-key-wrap(data-key='9', @click='keypad')
                  .dial-key 9
                  .dial-sub-key wxyz
            .dial-table-row
              .dial-table-col
                .dial-key-wrap(data-key='*', @click='keypad')
                  .dial-key *
                  .dial-sub-key
              .dial-table-col
                .dial-key-wrap(data-key='0', @click='keypad')
                  .dial-key 0
                  .dial-sub-key +
              .dial-table-col
                .dial-key-wrap(data-key='#', @click='keypad')
                  .dial-key #
                  .dial-sub-key
            .dial-table-row.no-sub-key
              .dial-table-col
              .dial-table-col
                .dial-key-wrap.no-hover()
                  md-speed-dial(md-direction='bottom')
                    md-speed-dial-target.md-primary
                      md-icon.fa.fa-phone
                    md-speed-dial-content
                      md-button.md-icon-button(data-key='call', @click='keypad')
                        md-icon.fa.fa-phone
                      md-button.md-icon-button(data-key='call', @click='keypad(true)')
                        md-icon.fas.fa-video
              .dial-table-col
                .dial-key-wrap(data-key='back', @click='keypad')
                  .dial-key
                    i.fas.fa-long-arrow-alt-left
                  .dial-sub-key Back

</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex'
export default {
  name: 'newCallModal',
  data () {
    return {
      audio: {
        ringing: new Audio('./static/sounds/ringing.mp3')
      },
      dialValue: '',
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
  computed: {
    ...mapGetters(['contacts', 'callOptions']),
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
  methods: {
    ...mapActions(['toggleNewCallModal']),
    ...mapMutations(['RINGING_SOUND', 'SET_CALL_OPTIONS']),
    closeModal () {
      if (event.target.id === 'modalNewCall') {
        this.toggleNewCallModal()
      }
    },
    shareScreen () {
      if (this.callingButtons.screenShare) {
        this.$kandyJS.stopScreenshare()
      } else {
        this.screenShareOptions.localVideoContainer = document.getElementById('localShareScreenContainer')
        this.screenShareOptions.remoteVideoContainer = document.getElementById('remoteShareScreenContainer')
        debugger
        this.$kandyJS.startScreenshare(this.screenShareOptions)
      }
      this.callingButtons.screenShare = !this.callingButtons.screenShare
    },
    muteCall () {
      if (this.callingButtons.mute) this.$kandyJS.unmuteCall()
      else this.$kandyJS.muteCall()
      this.callingButtons.mute = !this.callingButtons.mute
    },
    holdCall () {
      if (this.callingButtons.hold) this.$kandyJS.unholdCall()
      else this.$kandyJS.holdCall()
      this.callingButtons.hold = !this.callingButtons.hold
    },
    cutSpeaker () {

    },
    videoCall () {

    },
    call (contact, isVideoCall) {
      if (isVideoCall) {
        this.SET_CALL_OPTIONS([{key: 'isVideoEnabled', value: true}])
      }
      if (this.dialValue.length > 1) {
        // this.RINGING_SOUND({play: true})
        $('.left-pan').addClass('active')
        $('.contacts').fadeOut(100)
        $('.dial-pad').fadeOut(100)
        $('.calling').fadeIn(800)
        if (contact) {
          this.callingContact.img = contact.photoUrl || this.noImg
          this.callingContact.name = (contact.firstName + ' ' + contact.lastName) || 'Unknown'
          this.callingContact.number = contact.workPhone || contact.mobilePhone
          this.callingContact.primaryContact = contact.primaryContact
        } else {
          this.callingContact.number = this.dialValue
        }
        if (this.callOptions.isVideoEnabled) {
          this.$nextTick(() => {
            let options = [{key: 'localVideoContainer', value: document.getElementById('localVideoContainer')},
              {key: 'remoteVideoContainer', value: document.getElementById('remoteVideoContainer')}
            ]
            // options.localVideoContainer = document.getElementById('localVideoContainer')
            // options.remoteVideoContainer = document.getElementById('remoteVideoContainer')
            this.SET_CALL_OPTIONS(options)
          })
        }
        this.$kandyJS.makeCall(this.callingContact.primaryContact)
      }
    },
    endCall () {
      this.$kandyJS.endCall()
      // this.RINGING_SOUND({play: false})
      // this.audio.ringing.pause()
      // this.audio.ringing.load()
      $('.left-pan').removeClass('active')
      $('.contacts').fadeIn(100)
      $('.dial-pad').fadeIn(200)
      $('.calling').fadeOut(100)
    },
    press (obj) {
      obj.classList.add('active')
      setTimeout(function () {
        obj.classList.remove('active')
      }, 300)
    },
    keypad (isVideoVall) {
      let key = event.currentTarget.dataset.key
      let el = event.currentTarget
      switch (key) {
        case 'back':
          this.dialValue = this.dialValue.substring(0, this.dialValue.length - 1)
          this.longClick()
          break
        case 'call':
          this.call({}, isVideoVall)
          break
        case '0':
          this.dialValue = this.dialValue + '0'
          break
        case '1':
          this.dialValue = this.dialValue + '1'
          break
        case '2':
          this.dialValue = this.dialValue + '2'
          break
        case '3':
          this.dialValue = this.dialValue + '3'
          break
        case '4':
          this.dialValue = this.dialValue + '4'
          break
        case '5':
          this.dialValue = this.dialValue + '5'
          break
        case '6':
          this.dialValue = this.dialValue + '6'
          break
        case '7':
          this.dialValue = this.dialValue + '7'
          break
        case '8':
          this.dialValue = this.dialValue + '8'
          break
        case '9':
          this.dialValue = this.dialValue + '9'
          break
        case '*':
          this.dialValue = this.dialValue + '*'
          break
        case '#':
          this.dialValue = this.dialValue + '#'
          break
      }
      this.press(el)
      this.filter()
    },
    filter () {
      this.$forceUpdate()
    },
    longClick () {

    },
    highlight () {
      // let matchStart = $(this).text().toLowerCase().indexOf('' + string.toLowerCase() + '')
      // let matchEnd = matchStart + string.length - 1
      // let beforeMatch = $(this).text().slice(0, matchStart)
      // let matchText = $(this).text().slice(matchStart, matchEnd + 1)
      // let afterMatch = $(this).text().slice(matchEnd + 1)
      // $(this).html(beforeMatch + '<span class="highlight">' + matchText + '</span>' + afterMatch)

      // if(vm.isNumber()) {
      //   $('.people .number.match').each(function(){
      //     let matchStart = $(this).text().toLowerCase().indexOf('' + string.toLowerCase() + '');
      //     let matchEnd = matchStart + string.length - 1;
      //     let beforeMatch = $(this).text().slice(0, matchStart);
      //     let matchText = $(this).text().slice(matchStart, matchEnd + 1);
      //     let afterMatch = $(this).text().slice(matchEnd + 1);
      //     $(this).html(beforeMatch + '<span class="highlight">' + matchText + '</span>' + afterMatch);
      //   })
      // } else {
      //   $('.people .full-name.match').each(function(){
      //     let matchStart = $(this).text().toLowerCase().indexOf('' + string.toLowerCase() + '');
      //     let matchEnd = matchStart + string.length - 1;
      //     let beforeMatch = $(this).text().slice(0, matchStart);
      //     let matchText = $(this).text().slice(matchStart, matchEnd + 1);
      //     let afterMatch = $(this).text().slice(matchEnd + 1);
      //     $(this).html(beforeMatch + '<span class="highlight">' + matchText + '</span>' + afterMatch);
      //   })
      // }
    }
  }
}
</script>

<style scoped>

.dial-pad-wrap .left-pan .people .phone .highlight{
  color:#75c4b5;
}
.dial-pad-wrap .left-pan .people .full-name .highlight{
  color:#75c4b5;
}
.dial-pad-wrap{
  width:590px;
  height:580px;
  overflow:hidden;
  position:relative;
  margin:50px auto 0;
  background:#ecf0f1;
  box-shadow:0 12px 15px 0 rgba(0,0,0,.24),0 17px 50px 0 rgba(0,0,0,.19);
}

.dial-pad-wrap .left-pan{
  overflow-y: scroll;
}
.dial-pad-wrap .left-pan,
.dial-pad-wrap .dial-pad{
  padding:15px;
}
.dial-pad-wrap .left-pan{
  top:0;
  left:0;
  bottom:0;
  z-index:1;
  width:255px;
  position:absolute;
  background:#30414D;
  transition:width .4s ease-in-out 0s;
}
.dial-pad-wrap .left-pan.active{
  width:100%;
}
.dial-pad-wrap .left-pan .people .photo,
.dial-pad-wrap .left-pan .calling .photo{
  background:url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiA/PjwhRE9DVFlQRSBzdmcgIFBVQkxJQyAnLS8vVzNDLy9EVEQgU1ZHIDEuMS8vRU4nICAnaHR0cDovL3d3dy53My5vcmcvR3JhcGhpY3MvU1ZHLzEuMS9EVEQvc3ZnMTEuZHRkJz48c3ZnIGVuYWJsZS1iYWNrZ3JvdW5kPSJuZXcgMCAwIDUwIDUwIiBoZWlnaHQ9IjUwcHgiIGlkPSJMYXllcl8xIiB2ZXJzaW9uPSIxLjEiIHZpZXdCb3g9IjAgMCA1MCA1MCIgd2lkdGg9IjUwcHgiIHhtbDpzcGFjZT0icHJlc2VydmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiPjxyZWN0IGZpbGw9Im5vbmUiIGhlaWdodD0iNTAiIHdpZHRoPSI1MCIvPjxwYXRoIGQ9Ik0zMC45MzMsMzIuNTI4Yy0wLjE0Ni0xLjYxMi0wLjA5LTIuNzM3LTAuMDktNC4yMWMwLjczLTAuMzgzLDIuMDM4LTIuODI1LDIuMjU5LTQuODg4YzAuNTc0LTAuMDQ3LDEuNDc5LTAuNjA3LDEuNzQ0LTIuODE4ICBjMC4xNDMtMS4xODctMC40MjUtMS44NTUtMC43NzEtMi4wNjVjMC45MzQtMi44MDksMi44NzQtMTEuNDk5LTMuNTg4LTEyLjM5N2MtMC42NjUtMS4xNjgtMi4zNjgtMS43NTktNC41ODEtMS43NTkgIGMtOC44NTQsMC4xNjMtOS45MjIsNi42ODYtNy45ODEsMTQuMTU2Yy0wLjM0NSwwLjIxLTAuOTEzLDAuODc4LTAuNzcxLDIuMDY1YzAuMjY2LDIuMjExLDEuMTcsMi43NzEsMS43NDQsMi44MTggIGMwLjIyLDIuMDYyLDEuNTgsNC41MDUsMi4zMTIsNC44ODhjMCwxLjQ3MywwLjA1NSwyLjU5OC0wLjA5MSw0LjIxQzE5LjM2NywzNy4yMzgsNy41NDYsMzUuOTE2LDcsNDVoMzggIEM0NC40NTUsMzUuOTE2LDMyLjY4NSwzNy4yMzgsMzAuOTMzLDMyLjUyOHoiLz48L3N2Zz4=) no-repeat center;
}
.dial-pad-wrap .left-pan .contacts .title{
  color:#eee;
  font-size:24px;
  font-weight:400;
  margin-top:15px;
  text-align:center;
  margin-bottom:15px;
  padding-bottom:10px;
  text-transform:uppercase;
  border-bottom:2px solid #eee;
}

.dial-pad-wrap .left-pan .people .photo{
  width:50px;
  height:50px;
  overflow:hidden;
  border-radius:50%;
  margin-right:10px;
  border:2px solid #16a085;
}
.dial-pad-wrap .left-pan .people .photo img{
  width:100%;
  display:block;
}
.dial-pad-wrap .left-pan .people .info .name{
  margin-bottom:10px;
}
.dial-pad-wrap .left-pan .people .info .phone{
  font-size:14px;
  font-weight:500;
}

.dial-pad-wrap .left-pan .calling{
  color:#eee;
  margin:auto;
  display:none;
  max-width:300px;
  text-align:center;
}
.dial-pad-wrap .left-pan .calling .title{
  font-size:28px;
  margin:20px 0;
}
.dial-pad-wrap .left-pan .calling .name,
.dial-pad-wrap .left-pan .calling .photo,
.dial-pad-wrap .left-pan .calling .action,
.dial-pad-wrap .left-pan .calling .number{
  margin:auto;
  margin-top:20px;
  margin-bottom:15px;
}
.dial-pad-wrap .left-pan .calling .photo{
  width:100px;
  height:100px;
  overflow:hidden;
  border:2px solid;
  border-radius:50%;
  box-shadow:0 8px 10px 0 rgba(0,0,0,.24),0 10px 50px 0 rgba(0,0,0,.19);
}
.dial-pad-wrap .left-pan .calling .photo img{
  width:100%;
  display:block;
}
.dial-pad-wrap .left-pan .calling .name{
  margin:30px 0;
  font-size:24px;
  font-weight:400;
}
.dial-pad-wrap .left-pan .calling .action{
  width:100%;
  display:table;
}
.dial-pad-wrap .left-pan .calling .action .lnk{
  width:25%;
  display:table-cell;
}
#endButton{
  width:200px;
  color:#eee !important;
  font-size:24px;
  border-radius:25px;
  background:#c0392b !important;
}

#modalNewCall .dial-pad-wrap .left-pan .calling .btn{
  width:40px;
  height:40px;
  border:none;
  font-size:16px;
  border-radius:50%;
  animation-duration:1s;
  min-width: 0px;
  color: #448aff;
  background:white;
}
.dial-pad-wrap .left-pan .calling .action .btn.active{
  color:#eee !important;
  background:#27ae60 !important;
}
.dial-pad-wrap .left-pan .calling .call-end{
  margin-top:30px;
}

.dial-pad-wrap .left-pan .calling .action .btn .fa-mic:before{
  content:'\f131';
}
.dial-pad-wrap .left-pan .calling .action .btn.active .fa-mic:before{
  content:'\f130';
}
.dial-pad-wrap .left-pan .calling .action .btn .fa-vol:before{
  content:'\f027';
}
.dial-pad-wrap .left-pan .calling .action .btn.active .fa-vol:before{
  content:'\f028';
}

.dial-pad-wrap .dial-pad{
  height:100%;
  padding:40px;
  margin-left:255px;
}
.dial-pad-wrap .dial-screen{
  height:50px;
  padding:0 15px;
  font-size:28px;
  font-weight:400;
  line-height:50px;
  text-align:right;
  margin-bottom:20px;
  background:#eef1f2;
  border:1px solid #e9eeef;
}
.dial-pad-wrap .dial-table{
  width:100%;
  display:table;
}
.dial-pad-wrap .dial-table .dial-table-row{
  display:table-row;
}
.dial-pad-wrap .dial-table .dial-table-col{
  cursor:default;
  width:33.333333%;
  text-align:center;
  display:table-cell;
  vertical-align:top;
}
.dial-pad-wrap .dial-table .dial-key-wrap{
  margin-bottom:20px;
  /* transition: background .3s ease-in-out 0s;
  -webkit-transition: background .3s ease-in-out 0s; */
}
.dial-pad-wrap .dial-table .dial-table-col .dial-key{
  font-size:28px;
  font-weight:400;
  min-height:30px;
  line-height:30px;
}
.dial-pad-wrap .dial-table .no-sub-key .dial-key{
  min-height:48px;
  line-height:48px;
}
.dial-pad-wrap .dial-table .dial-sub-key{
  color:#aaa;
  font-size:14px;
  text-transform:uppercase;
}
.dial-pad-wrap .no-sub-key .dial-sub-key{
  color:#aaa;
  font-size:14px;
  text-transform:uppercase;
}

.dial-pad-wrap .dial-table .dial-key-wrap.active,
.dial-pad-wrap .dial-table .dial-key-wrap:hover{
  color:#eee;
  background:#16a085;
}

.dial-pad-wrap .dial-table .dial-key-wrap.active .dial-sub-key,
.dial-pad-wrap .dial-table .dial-key-wrap:hover .dial-sub-key{
  color:#eee;
  background:#16a085;
}

.no-hover:hover{
  color:#eee;
  background:none !important;
}

.action div{
  display: inline-block;
  padding: 5px;
}

.action div button, .call-end button{
  padding: 0;
  color: red;
}

.video-container{
  height: 0px;
}
.video-container.active{
  height: 400px;
  transition: height 0.25s ease-in;
}
#localVideoContainer, #remoteVideoContainer, #localShareScreenContainer, #remoteShareScreenContainer{
  width: 200px;
  height: 200px;
  position: absolute;
  top: 0;
}
#localVideoContainer, #localShareScreenContainer{
  left: 50px;
}
#remoteVideoContainer, #remoteShareScreenContainer{
  right: 50px;
}

#localShareScreenContainer{
  top: 200px;
}
#remoteShareScreenContainer{
  top: 200px;
}
#peopleButton{
  height: 100px;
  width: 230px;
  display:inline-block;
  cursor:default;
  background:#eee;
  box-shadow:0 4px 8px 0 rgba(0,0,0,.2),0 5px 8px 0 rgba(0,0,0,.19);
}
.md-menu{
  padding-bottom: 10px;
}
.info.pull-left{
  max-width: 150px;
}

.md-menu-content{
  z-index: 9998;
}
</style>
