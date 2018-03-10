<template lang='pug'>
  #app
    toolbar(v-if='credentials.isLogged')
    new-call-modal(v-if='newCallModal')
    incoming-call-modal(v-if='incomingCallModal')
    router-view
</template>

<script>
import Toolbar from './components/Toolbar'
import NewCallModal from './components/ModalNewCall'
import IncomingCallModal from './components/ModalIncomingCall'
import { mapGetters } from 'vuex'
export default {
  name: 'App',
  components: {
    toolbar: Toolbar,
    newCallModal: NewCallModal,
    incomingCallModal: IncomingCallModal
  },
  computed: {
    ...mapGetters(['credentials', 'newCallModal', 'incomingCallModal'])
  }
}
</script>

<style>

</style>
