<template lang='pug'>
#loginScreen
  div
    md-field
      label Username
      md-input(v-model='user.username')
    md-field
      label Password
      md-input(v-model='user.password')
    md-button.md-raised( @click='login()') LOGIN
</template>

<script>
import { mapActions } from 'vuex'
import Authentication from '../Authentication'
export default {
  data () {
    return {
      show: 'all',
      user: {
        username: 'ravci@genband.com',
        password: 'yjke9884'
      }
    }
  },
  methods: {
    ...mapActions(['setUserCredentials']),
    login () {
      let userCredentials = {
        username: this.user.username,
        password: this.user.password,
        domainApiKey: ''
      }
      this.$kandyJS.connect(userCredentials)
        .then(res => {
          this.setUserCredentials({
            username: userCredentials.username,
            password: userCredentials.password,
            token: 'YOUR_JWT_TOKEN',
            isLogged: true
          })
          Authentication.setToken('YOUR_JWT_TOKEN')
          this.$router.push('/')
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
}
</script>

<style scoped>
#loginScreen{
  width: 300px;
  height: 100vh;
  background-color: #30414D;
  color: #767676;
  padding: 35px 25px 0px 25px;
}
input{
  color: #9e9e9e;
}

#loginScreen label {
  color: #9e9e9e;
}
#loginScreen input {
  color: #555;
  -webkit-text-fill-color: unset;
}
</style>
