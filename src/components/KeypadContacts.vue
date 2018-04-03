<template lang='pug'>
.keypad-container-contacts(:style='{"min-height": mobileHeight, "max-height": mobileHeight}')
  .md-layout.md-alignment-center
    .md-layout-item.md-size-80
      .contacts-title
        .title Contacts
    .md-layout-item.md-size-100
      .md-layout.md-alignment-center
        contact-card(v-for='contact in filtredContacts', :key='contact.entryId', :contact='contact', @click.native='contactClick(contact)')
</template>

<script>
import ContactCard from './ContactCard'
import { mapGetters } from 'vuex'
export default {
  name: 'keypad',
  props: {
    mobileHeight: {
      type: String,
      required: false
    }
  },
  data () {
    return {
    }
  },
  computed: {
    ...mapGetters(['contacts', 'dialValue']),
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
    }
  }
}
</script>

<style scoped>
.contacts-title{
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
.keypad-container-contacts{
  background:#30414D;
  transition:width .4s ease-in-out 0s;
  min-height: 500px;
  overflow-y: scroll;
  max-height: 600px;
}
.key-container{
  text-align: center;
  height: 150px;
}
.key-container:hover{
  background: teal;
  cursor: pointer;
}

.md-card{
  min-width: 80%;
  max-width: 80%;
  margin-bottom: 10px;
}
</style>
