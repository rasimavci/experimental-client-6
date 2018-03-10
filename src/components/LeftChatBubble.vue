<template lang='pug'>
.container
  img(:src='contact.photoUrl', alt='Avatar')
  p {{message.parts[0].text}}
  span.time-right {{moment(message.timestamp).calendar()}}
</template>

<script>
import Moment from 'moment'
export default {
  name: 'leftChatBubble',
  props: {
    message: {
      type: Object,
      required: true
    },
    contact: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      moment: Moment
    }
  },
  mounted () {
  }
}
</script>

<style>

</style>
