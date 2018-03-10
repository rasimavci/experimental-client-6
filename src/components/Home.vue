<template lang='pug'>
md-card(md-with-hover='' :class='{ "short-card": lastMessage }')
  md-card-header
    md-card-header-text
      .md-title {{contact.firstName}} {{contact.lastName}}
      .md-subhead {{contact.nickname}} {{' '}}
        template(v-if='contact.presence && !lastMessage')
          img(:src='presenceConnected', v-if='contact.presence.status === "open"')
          img(:src='presenceClosed', v-if='contact.presence.status === "closed"')
      p.last-message(v-if='lastMessage')
      | Rasim Avcı
    md-card-media
      img(:src='contact.photoUrl || noImage', alt='contact photo')
  md-card-content()
    p(v-if='!lastMessage')
      | ravci@netas.com.tr
    p(v-if='!lastMessage')
      | {{contact.primaryContact}}
    p(v-if='!lastMessage')
      | {{contact.workPhone}}
    p(v-if='!lastMessage')
      | {{contact.mobilePhone}}

</template>

<script>
import PresenceConnected from '../assets/icon/presence_connected.png'
import PresenceClosed from '../assets/icon/presence_not.png'
import PresenceClosedMessage from '../assets/icon/presence_away.png'

export default {
  name: 'Home',
  props: {
    lastMessage: {
      type: String,
      required: false
    }
  },
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      presenceConnected: PresenceConnected,
      presenceClosed: PresenceClosed,
      presenceClosedMessage: PresenceClosedMessage,
      contact: {
        type: Object,
        required: true,
        presence: {
          status: 'open'
        },
        photoUrl: 'https://pa-ucc.genband.com:443/pa/direct/pictureServlet?user=ravci@genband.com',
        firstName: 'Rasim',
        lastName: 'Avci',
        nickName: 'Rasim'
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
