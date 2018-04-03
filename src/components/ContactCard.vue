<template lang="pug">
md-card(md-with-hover='' :class='{ "short-card": lastMessage }')
  md-card-header
    md-card-header-text
      .md-title {{contact.firstName}} {{contact.lastName}}
      .md-subhead {{contact.nickname}} {{' '}}
        template(v-if='contact.presence && !lastMessage')
          img(:src='presenceConnected', v-if='contact.presence.status === "open"')
          img(:src='presenceClosed', v-if='contact.presence.status === "closed"')
      p.last-message(v-if='lastMessage')
      | {{lastMessage}}
    md-card-media
      img(:src='contact.photoUrl || noImage', alt='contact photo')
  md-card-content()
    p(v-if='!lastMessage')
      | {{contact.emailAddress}}
    p(v-if='!lastMessage')
      | {{contact.primaryContact}}
    p(v-if='!lastMessage')
      | {{contact.workPhone}}
    p(v-if='!lastMessage')
      | {{contact.mobilePhone}}

</template>

<script>
import NoImage from '../assets/img/noimage.jpg'
import PresenceConnected from '../assets/icon/presence_connected.png'
import PresenceClosed from '../assets/icon/presence_not.png'
import PresenceClosedMessage from '../assets/icon/presence_away.png'
export default {
  name: 'contactCard',
  props: {
    contact: {
      type: Object,
      required: true
    },
    lastMessage: {
      type: String,
      required: false
    }
  },
  data () {
    return {
      noImage: NoImage,
      presenceConnected: PresenceConnected,
      presenceClosed: PresenceClosed,
      presenceClosedMessage: PresenceClosedMessage
    }
  },
  methods: {
  }
}
</script>

<style scoped>
.last-message {
  color: darkgray;
}

.short-card {
  max-height: 130px;
}

.short-card .md-card-header {
  padding: 10px;
}
</style>
