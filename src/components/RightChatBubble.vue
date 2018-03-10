<template lang='pug'>
.container.darker
  //- img(:src='contact.photoUrl', alt='Avatar')
  p {{message.parts[0].text}}
  span.time-right {{moment(message.timestamp).calendar()}}
</template>

<script>
import Moment from 'moment'
import NoImg from '../assets/img/noimage.jpg'
export default {
  name: 'rightChatBubble',
  props: {
    message: {
      type: Object,
      required: true
    },
    contact: {
      type: Object,
      required: false
    }
  },
  data () {
    return {
      noImg: NoImg,
      moment: Moment
    }
  }
}
</script>

<style scoped>

</style>
