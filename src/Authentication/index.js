import vue from 'vue'
import VueCookie from 'vue-cookie'
import store from '../store'
import kandyJS from '../kandy'
vue.use(VueCookie)

const authentication = {
  checkToken: () => {
    if (kandyJS.isConnected() && store.getters.credentials.isLogged && vue.cookie.get('rastek-user-data')) {
      return true
    }
    return false
  },
  closeSession: () => {
    vue.cookie.delete('rastek-user-data')
    // store.commit('SET_LOGIN_DATA', {})
  },
  setToken: (tkn) => {
    vue.cookie.set('rastek-user-data', tkn, { expires: '1M' })
  }
}
export default authentication
